using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DataBase;
using Server.DataBase.Entities;
using Server.Models;

namespace Server.Controllers;

[ApiController]
[Route("api/v1/bookmark")]
public class BookmarkController : Controller
{
    private readonly DataContext _dbContext;

    public BookmarkController(DataContext dataContext)
    {
        _dbContext = dataContext;
    }

    [Authorize(Policy = "auth")]
    [HttpPost("add/{recipeNameUrl}")]
    public async Task<ActionResult> AddBookmark(string recipeNameUrl)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users
            .Include(x => x.Recipes)
            .Include(x => x.Bookmarks)
            .FirstOrDefaultAsync(x => x.Id == userId);
        if (user is null) return BadRequest(new MessageModel("User not found"));

        if (user.Bookmarks.Any(x => x.NameUrl == recipeNameUrl))
            return BadRequest(new MessageModel("Bookmark already exists"));

        var recipe = _dbContext.Recipes.FirstOrDefault(x => x.NameUrl == recipeNameUrl);
        if (recipe is null) return BadRequest(new MessageModel("Recipe not found"));

        // if (user.Recipes.Any(x => x.NameUrl == recipeNameUrl))
        //     return BadRequest(new MessageModel("You can't bookmark your own recipe"));

        var bookmark = new BookmarkEntity()
        {
            NameUrl = recipe.NameUrl,
            RecipeEntityId = recipe.Id,
            UserEntityId = user.Id
        };

        await _dbContext.Bookmarks.AddAsync(bookmark);
        await _dbContext.SaveChangesAsync();

        return Ok(new MessageModel("Bookmark added"));
    }

    [Authorize(Policy = "auth")]
    [HttpDelete("delete/{recipeNameUrl}")]
    public async Task<ActionResult> DeleteBookmark(string recipeNameUrl)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users
            .Include(x => x.Bookmarks)
            .FirstOrDefaultAsync(x => x.Id == userId);
        if (user is null) return BadRequest(new MessageModel("User not found"));

        var bookmark = user.Bookmarks.FirstOrDefault(x => x.NameUrl == recipeNameUrl);
        if (bookmark is null) return BadRequest(new MessageModel("Bookmark not found"));

        user.Bookmarks.Remove(bookmark);
        await _dbContext.SaveChangesAsync();

        return Ok(new MessageModel("Bookmark deleted"));
    }
}