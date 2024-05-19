using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Server.DataBase;
using Server.DataBase.Entities;
using Server.Models;
using Server.Models.User;
using Server.Services.Interfaces;

namespace Server.Controllers;

[ApiController]
[Route("api/v1/user")]
public class UserController : Controller
{
    private readonly DataContext _dbContext;
    private readonly IEmailService _emailService;
    private readonly IPasswordService _passwordService;
    private readonly ITokenService _tokenService;

    public UserController(DataContext dataContext, IEmailService emailService, IPasswordService passwordService,
        ITokenService tokenService)
    {
        _dbContext = dataContext;
        _emailService = emailService;
        _passwordService = passwordService;
        _tokenService = tokenService;
    }

    [Authorize(Policy = "auth")]
    [HttpGet("me")]
    public async Task<ActionResult<GetUserInfoResponse>> GetMyInfo()
    {
        var userIdRequest = User.FindFirstValue("id");
        if (userIdRequest is null) return BadRequest(new MessageModel("Empty id in the JWT token"));

        var user = await _dbContext.Users
            .Include(x => x.Recipes)
            .FirstOrDefaultAsync(x => x.Id == int.Parse(userIdRequest));
        if (user is null) return BadRequest(new MessageModel("User not found"));

        var response = new GetUserInfoResponse(
            user.Login,
            user.Email,
            user.Name,
            user.SecondName,
            user.Patronymic,
            user.DateRegistration.ToString("dd.MM.yyyy"),
            user.Description,
            user.ProfilePhoto,
            user.Recipes.Count
        );
        return response;
    }

    [AllowAnonymous]
    [HttpGet("{nickName}")]
    public async Task<ActionResult<GetUserInfoResponse>> GetUserInfo(string nickName)
    {
        var user = await _dbContext.Users
            .Include(x => x.Recipes)
            .FirstOrDefaultAsync(x => x.Login == nickName);
        if (user is null) return BadRequest(new MessageModel("User not found"));

        var response = new GetUserInfoResponse(
            user.Login,
            user.Email,
            user.Name,
            user.SecondName,
            user.Patronymic,
            user.DateRegistration.ToString("dd.MM.yyyy"),
            user.Description,
            user.ProfilePhoto,
            user.Recipes.Count
        );
        return response;
    }

    [Authorize(Policy = "auth")]
    [HttpPut("me")]
    public async Task<ActionResult> UpdateUserInfo([FromBody] UpdateUserInfoRequest request)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users.FindAsync(userId);
        if (user is null) return BadRequest(new MessageModel("User not found"));

        if (request.Login.Length < 5)
            return BadRequest(new MessageModel($"Login is too short, need at least 5 characters"));
        if (!_emailService.ValidateEmail(request.Email)) return BadRequest(new MessageModel("Invalid email"));
        if (await _dbContext.Users.AnyAsync(x => x.Login == request.Login && x.Id != userId))
            return BadRequest(new MessageModel("Login already exists"));
        if (await _dbContext.Users.AnyAsync(x => x.Email == request.Email && x.Id != userId))
            return BadRequest(new MessageModel("Email already exists"));

        user.Name = request.Name;
        user.SecondName = request.SecondName;
        user.Patronymic = request.Patronymic;
        user.Login = request.Login;
        user.Email = request.Email;
        user.Description = request.Description;

        //TODO: Сделать смену почты через подтверждение
        await _dbContext.SaveChangesAsync();
        return Ok(new MessageModel("User info updated"));
    }

    [Authorize(Policy = "auth")]
    [HttpPut("me/password")]
    public async Task<ActionResult> ChangeMyPassword(ChangeMyPasswordRequest request)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users.FindAsync(userId);
        if (user is null) return BadRequest(new MessageModel("User not found"));

        if (!_passwordService.VerifyPassword(request.Password, user.Login, user.HashedPassword))
            return BadRequest(new MessageModel("Invalid password"));
        if (request.NewPassword.Length < 8)
            return BadRequest(new MessageModel("Password is too short, need at least 8 characters"));

        user.HashedPassword = _passwordService.HashPassword(request.NewPassword, user.Login);

        await _dbContext.SaveChangesAsync();
        return Ok(new MessageModel("Password changed"));
    }

    [Authorize(Policy = "auth")]
    [HttpDelete("me")]
    public async Task<ActionResult> DeleteUser()
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users
            .Include(x => x.Files)
            .FirstOrDefaultAsync(x => x.Id == userId);

        if (user is null) return BadRequest(new MessageModel("User not found"));

        var files = user.Files;
        foreach (var file in files)
        {
            if (!System.IO.File.Exists(file.Path)) continue;
            System.IO.File.Delete(file.Path);
        }

        if (System.IO.File.Exists(user.ProfilePhoto)) System.IO.File.Delete(user.ProfilePhoto);

        var token = HttpContext.Request.Headers[HeaderNames.Authorization].ToString().Split().Last();
        var revokedToken = new RevokedTokenEntity()
        {
            Token = token,
            UserId = userId,
            ExpirationDate = _tokenService.GetExpirationDate(token)
        };

        await _dbContext.RevokedTokens.AddAsync(revokedToken);
        _dbContext.Remove(user);
        await _dbContext.SaveChangesAsync();

        return Ok(new MessageModel("User deleted"));
    }

    [Authorize(Policy = "auth")]
    [HttpPut("me/photo")]
    public async Task<ActionResult> UpdateProfilePhoto(UpdateProfilePhotoRequest request)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users
            .Include(x => x.Files)
            .FirstOrDefaultAsync(x => x.Id == userId);
        if (user is null) return BadRequest(new MessageModel("User not found"));

        if (user.Files.All(x => x.Name != request.ImageName))
            return BadRequest(new MessageModel("File not found"));

        if (user.ProfilePhoto != null && System.IO.File.Exists($"/files/images/{user.ProfilePhoto}"))
            System.IO.File.Delete($"/files/images/{user.ProfilePhoto}");

        user.ProfilePhoto = request.ImageName;

        await _dbContext.SaveChangesAsync();

        return Ok(new UpdateProfilePhotoResponse(request.ImageName));
    }

    [Authorize(Policy = "auth")]
    [HttpGet("me/recipes")]
    public async Task<ActionResult<GetUserRecipesResponse>> GetMyRecipes(int page = 1, int count = 3)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users
            .Include(x => x.Recipes)
            .ThenInclude(x => x.Ingredients)
            .FirstOrDefaultAsync(x => x.Id == userId);
        if (user is null) return BadRequest(new MessageModel("User not found"));

        var recipes = user.Recipes
            .OrderByDescending(x => x.Rating)
            .ThenByDescending(x => x.DateCreate)
            .Skip((page - 1) * count)
            .Take(count)
            .Select(x => new MyRecipe(
                x.Name,
                x.MainImageName,
                x.Rating,
                x.CookingTimeInMinutes.Minutes,
                x.Ingredients.Count,
                x.Category,
                x.NameUrl))
            .ToList();

        return new GetUserRecipesResponse(recipes);
    }

    [AllowAnonymous]
    [HttpGet("{username}/recipes")]
    public async Task<ActionResult<GetUserRecipesResponse>> GetUserRecipes(string username, int page = 1, int count = 1)
    {
        var user = await _dbContext.Users
            .Include(x => x.Recipes)
            .ThenInclude(x => x.Ingredients)
            .FirstOrDefaultAsync(x => x.Login == username);
        if (user is null) return BadRequest(new MessageModel("User not found"));

        var recipes = user.Recipes
            .OrderByDescending(x => x.Rating)
            .ThenByDescending(x => x.DateCreate)
            .Skip((page - 1) * count)
            .Take(count)
            .Select(x => new MyRecipe(
                x.Name,
                x.MainImageName,
                x.Rating,
                x.CookingTimeInMinutes.Minutes,
                x.Ingredients.Count,
                x.Category,
                x.NameUrl))
            .ToList();

        return new GetUserRecipesResponse(recipes);
    }

    [Authorize(Policy = "auth")]
    [HttpGet("me/bookmarks")]
    public async Task<ActionResult<GetUserRecipesResponse>> GetMyBookmarks(int page = 1, int count = 3)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users
            .Include(x => x.Bookmarks)
            .ThenInclude(x => x.Recipe)
            .ThenInclude(x => x.Ingredients)
            .FirstOrDefaultAsync(x => x.Id == userId);

        if (user is null) return BadRequest(new MessageModel("User not found"));

        var recipes = user.Bookmarks
            .OrderByDescending(x => x.DateCreate)
            .Skip((page - 1) * count)
            .Take(count)
            .Select(x => new MyRecipe(
                x.Recipe.Name,
                x.Recipe.MainImageName,
                x.Recipe.Rating,
                x.Recipe.CookingTimeInMinutes.Minutes,
                x.Recipe.Ingredients.Count,
                x.Recipe.Category,
                x.NameUrl))
            .ToList();

        return new GetUserRecipesResponse(recipes);
    }
}