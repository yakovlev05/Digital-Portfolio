using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DataBase;
using Server.DataBase.Entities;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Controllers;

[ApiController]
[Route("api/v1/recipe")]
public class RecipeController : Controller
{
    private readonly DataContext _dbContext;
    private readonly IUrlService _urlService;

    public RecipeController(DataContext dataContext, IUrlService urlService)
    {
        _dbContext = dataContext;
        _urlService = urlService;
    }

    [Authorize(Policy = "auth")]
    [HttpPost("add")]
    public async Task<ActionResult<AddRecipeResponse>> AddRecipe(
        [FromBody] RecipeModel model)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);

        var user = await _dbContext.Users.FindAsync(userId);
        if (user is null) return BadRequest("User not found");

        var recipe = new RecipeEntity()
        {
            UserEntityId = user.Id,
            NameUrl = _urlService.GetUrlFromString(model.Name),
            Name = model.Name,
            MainImageName = model.MainImageName,
            Category = model.Category,
            CookingTime = TimeSpan.FromMinutes(model.CookingTimeMinutes),
            Description = model.Description
        };

        var recipeIngredients = new List<RecipeIngredientEntity>();
        foreach (var ingredient in model.Ingredients)
        {
            recipeIngredients.Add(new RecipeIngredientEntity()
            {
                Name = ingredient.Name,
                Quantity = ingredient.Quantity,
                Unit = ingredient.Unit,
            });
        }

        var recipeSteps = new List<RecipeStepEntity>();
        foreach (var step in model.Steps)
        {
            recipeSteps.Add(new RecipeStepEntity()
            {
                StepNumber = step.StepNumber,
                Description = step.Description,
                ImageName = step.ImageName,
            });
        }

        var recipeEnergy = new RecipeEnergyEntity()
        {
            CaloriesFrom = model.EnergyModel.CaloriesFrom,
            CaloriesTo = model.EnergyModel.CaloriesTo,
            FatsFrom = model.EnergyModel.FatsFrom,
            FatsTo = model.EnergyModel.FatsTo,
            CarbohydratesFrom = model.EnergyModel.CarbohydratesFrom,
            CarbohydratesTo = model.EnergyModel.CarbohydratesTo,
            ProteinsFrom = model.EnergyModel.ProteinsFrom,
            ProteinsTo = model.EnergyModel.ProteinsTo,
        };

        recipe.Energy = recipeEnergy;
        recipe.Ingredients = recipeIngredients;
        recipe.Steps = recipeSteps;

        await _dbContext.Recipes.AddAsync(recipe);
        await _dbContext.SaveChangesAsync();

        return new AddRecipeResponse(recipe.NameUrl);
    }

    [AllowAnonymous]
    [HttpGet("{recipeUrl}")]
    public async Task<ActionResult<RecipeModel>> GetRecipe(string recipeUrl)
    {
        var recipe = await _dbContext.Recipes
            .Include(x => x.Ingredients)
            .Include(x => x.Energy)
            .Include(x => x.Steps)
            .FirstOrDefaultAsync(x => x.NameUrl == recipeUrl);

        if (recipe is null) return BadRequest("Recipe not found");
        var response = new RecipeModel(
            recipe.Name,
            recipe.MainImageName,
            recipe.Category,
            recipe.CookingTime.Minutes,
            recipe.Description,
            recipe.Ingredients.Select(x => new RecipeIngredientModel(x.Name, x.Quantity, x.Unit)).ToList(),
            new RecipeEnergyModel(
                recipe.Energy.CaloriesFrom,
                recipe.Energy.CaloriesTo,
                recipe.Energy.FatsFrom,
                recipe.Energy.FatsTo,
                recipe.Energy.CarbohydratesFrom,
                recipe.Energy.CarbohydratesTo,
                recipe.Energy.ProteinsFrom,
                recipe.Energy.ProteinsTo),
            recipe.Steps.Select(x => new RecipeStepModel(x.StepNumber, x.Description, x.ImageName)).ToList()
        );

        return response;
    }

    [Authorize(Policy = "auth")]
    [HttpDelete("{recipeUrl}")]
    public async Task<ActionResult> DeleteRecipe(string recipeUrl)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users
            .Include(x => x.Recipes)
            .ThenInclude(recipeEntity => recipeEntity.Steps)
            .FirstOrDefaultAsync(x => x.Id == userId);

        if (user is null) return BadRequest("User not found");

        var recipe = user.Recipes.FirstOrDefault(x => x.NameUrl == recipeUrl);
        if (recipe is null) return BadRequest("Recipe not found");

        _dbContext.Recipes.Remove(recipe);
        if (System.IO.File.Exists($"/files/images/{recipe.MainImageName}"))
            System.IO.File.Delete($"/files/images/{recipe.MainImageName}");
        var mainImage = await _dbContext.Images.FirstOrDefaultAsync(x => x.Name == recipe.MainImageName);
        if (mainImage != null) _dbContext.Remove(mainImage);

        foreach (var step in recipe.Steps)
        {
            if (System.IO.File.Exists($"/files/images/{step.ImageName}")) System.IO.File.Delete($"/files/images/{step.ImageName}");
            var image = await _dbContext.Images.FirstOrDefaultAsync(x => x.Name == step.ImageName);
            if (image != null) _dbContext.Remove(image);
        }

        await _dbContext.SaveChangesAsync();

        return Ok("Recipe deleted");
    }
}