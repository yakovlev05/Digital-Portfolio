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
        var userIdRequest = User.FindFirstValue("id");
        if (userIdRequest is null) return BadRequest("Empty id in the JWT token");

        var user = await _dbContext.Users.FindAsync(int.Parse(userIdRequest));
        if (user is null) return BadRequest("User not found");

        var comment = await _dbContext.Comments.FirstOrDefaultAsync(x => x.Guid == commentGuid);
        if (comment is null) return BadRequest("CommentGuid not found");

        comment.Status = CommentStatus.Deleted;
        await _dbContext.SaveChangesAsync();

        return Ok("Comment has been deleted");
    }
}