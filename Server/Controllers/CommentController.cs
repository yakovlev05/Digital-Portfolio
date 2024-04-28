using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DataBase;
using Server.DataBase.Entities;
using Server.Models;

namespace Server.Controllers;

[ApiController]
[Route("api/v1/comment")]
public class CommentController : Controller
{
    private readonly DataContext _dbContext;

    public CommentController(DataContext dataContext)
    {
        _dbContext = dataContext;
    }

    [Authorize(Policy = "auth")]
    [HttpPost("add")]
    public async Task<ActionResult<AddCommentResponse>> AddComment(AddCommentRequest request)
    {
        var userIdRequest = User.FindFirstValue("id");
        if (userIdRequest is null) return BadRequest("Empty id in the JWT token");

        var user = await _dbContext.Users.FindAsync(int.Parse(userIdRequest));
        if (user is null) return BadRequest("User not found");

        if (await _dbContext.Recipes.FindAsync(request.RecipeId) is null) return BadRequest("Recipe not found");
        if (request.Rating < 1 || request.Rating > 5) return BadRequest("Rating must be from 1 to 5");
        if (request.Description.Contains('<') || request.Description.Contains('>'))
            return BadRequest("Characters '<' and '>' are prohibited");

        var newCommentEntity = new CommentEntity()
        {
            UserEntityId = user.Id,
            RecipeEntityId = request.RecipeId,
            Description = request.Description,
            Rating = request.Rating
        };
        await _dbContext.Comments.AddAsync(newCommentEntity);
        await _dbContext.SaveChangesAsync();

        return new AddCommentResponse(newCommentEntity.Guid);
    }

    [Authorize(Policy = "auth")]
    [HttpDelete("{commentGuid}")]
    public async Task<ActionResult> DeleteComment(string commentGuid)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users
            .Include(x => x.Comments)
            .FirstOrDefaultAsync(x => x.Id == userId);
        if (user is null) return BadRequest("User not found");


        var comment = user.Comments.FirstOrDefault(x => x.Guid == commentGuid);
        if (comment is null) return BadRequest("Comment not found");

        _dbContext.Remove(comment);
        await _dbContext.SaveChangesAsync();

        return Ok("Comment has been deleted");
    }

    [Authorize(Policy = "auth")]
    [HttpPut("{commentGuid}")]
    public async Task<ActionResult> UpdateComment(string commentGuid, UpdateCommentRequest request)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users
            .Include(x => x.Comments)
            .FirstOrDefaultAsync(x => x.Id == userId);
        if (user is null) return BadRequest("User not found");

        var comment = user.Comments.FirstOrDefault(x => x.Guid == commentGuid);
        if (comment is null) return BadRequest("Comment not found");

        if (request.NewRating < 1 || request.NewRating > 5) return BadRequest("Rating must be from 1 to 5");
        if (request.NewDescription.Contains('<') || request.NewDescription.Contains('>'))
            return BadRequest("Characters '<' and '>' are prohibited");

        comment.Rating = request.NewRating;
        comment.Description = request.NewDescription;
        await _dbContext.SaveChangesAsync();

        return Ok("Comment has been updated");
    }

    [AllowAnonymous]
    [HttpGet("{commentGuid}")]
    public async Task<ActionResult<GetCommentResponse>> GetComment(string commentGuid)
    {
        var comment = await _dbContext.Comments.FirstOrDefaultAsync(x => x.Guid == commentGuid);
        if (comment is null) return BadRequest("Comment not found");

        var user = await _dbContext.Users.FindAsync(comment.UserEntityId);
        if (user is null) return BadRequest("User not found");

        var response = new GetCommentResponse(
            comment.Guid,
            comment.Rating,
            comment.Description,
            comment.Published.ToString("dd.MM.yyyy HH:mm:ss"),
            user.Name,
            user.SecondName,
            user.ProfilePhoto,
            user.Login
        );

        return response;
    }
}