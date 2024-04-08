using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DataBase;
using Server.DataBase.Entities;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : Controller
{
    private readonly DataContext _dbContext = new();
    private readonly ITokenService _tokenService;
    private readonly IPasswordService _passwordService;

    public AuthController(ITokenService tokenService, IPasswordService passwordService)
    {
        // _dbContext = dataContext;
        _tokenService = tokenService;
        _passwordService = passwordService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        var user = await _dbContext
            .Users
            .FirstOrDefaultAsync(x => x.Login == request.Login || x.Email == request.Login);

        if (user is null) return BadRequest("User not found");

        var verifyPassword = _passwordService.VerifyPassword(request.Password, request.Login, user.HashedPassword);
        if (!verifyPassword) return BadRequest("Invalid password");

        var token = _tokenService.CreateToken(user.Login, user.Id.ToString());

        return new LoginResponse(token);
    }

    [HttpPost("registration")]
    public async Task<ActionResult<RegistrationResponse>> Registration([FromBody] RegistrationRequest request)
    {
        if (request.Password != request.ConfirmPassword) return BadRequest("Passwords do not match");

        if (request.Password.Length < 8)
            return BadRequest("Password is too short, need at least 8 characters");

        if (request.Login.Length < 5)
            return BadRequest($"Login is too short, need at least 5 characters");

        if (await _dbContext.Users.AnyAsync(x => x.Login == request.Login))
            return BadRequest("Login already exists");

        if (await _dbContext.Users.AnyAsync(x => x.Email == request.Email))
            return BadRequest("Email already exists");

        var user = new UserEntity()
        {
            Login = request.Login,
            HashedPassword = _passwordService.HashPassword(request.Password, request.Login),
            Email = request.Email,
            Name = request.Name,
            SecondName = request.SecondName
        };

        await _dbContext.Users.AddAsync(user);
        await _dbContext.SaveChangesAsync();

        var id = _dbContext.Users.First(x => x.Login == user.Login).Id;
        return new RegistrationResponse(_tokenService.CreateToken(user.Login, id.ToString()));
    }
}