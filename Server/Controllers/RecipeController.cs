using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public async Task<ActionResult<AddRecipeRequest>> AddRecipe([FromBody] AddRecipeRequest request)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);

        var user = await _dbContext.Users.FindAsync(userId);
        if (user is null) return BadRequest("User not found");

        var recipe = new RecipeEntity()
        {
            UserEntityId = user.Id,
            NameUrl = _urlService.GetUrlFromString(request.Name),
            Name = request.Name,
            MainImageName = request.MainImageName,
            Category = request.Category,
            CookingTime = TimeSpan.FromMinutes(request.CookingTimeMinutes),
            Description = request.Description
        };
        await _dbContext.Recipes.AddAsync(recipe);
        await _dbContext.SaveChangesAsync();


        var recipeIngredients = new List<RecipeIngredientEntity>();
        foreach (var ingredient in request.Ingredients)
        {
            recipeIngredients.Add(new RecipeIngredientEntity()
            {
                Name = ingredient.Name,
                Quantity = ingredient.Quantity,
                Unit = ingredient.Unit,
                RecipeEntityId = recipe.Id
            });
        }

        _dbContext.RecipeIngredients.AddRange(recipeIngredients);

        var recipeSteps = new List<RecipeStepEntity>();
        foreach (var step in request.Steps)
        {
            recipeSteps.Add(new RecipeStepEntity()
            {
                StepNumber = step.StepNumber,
                Description = step.Description,
                ImageName = step.ImageName,
                RecipeEntityId = recipe.Id
            });
        }

        _dbContext.RecipeSteps.AddRange(recipeSteps);

        var recipeEnergy = new RecipeEnergyEntity()
        {
            CaloriesFrom = request.Energy.CaloriesFrom,
            CaloriesTo = request.Energy.CaloriesTo,
            FatsFrom = request.Energy.FatsFrom,
            FatsTo = request.Energy.FatsTo,
            CarbohydratesFrom = request.Energy.CarbohydratesFrom,
            CarbohydratesTo = request.Energy.CarbohydratesTo,
            ProteinsFrom = request.Energy.ProteinsFrom,
            ProteinsTo = request.Energy.ProteinsTo,
            RecipeEntity = recipe,
            RecipeEntityId = recipe.Id
        };
        await _dbContext.RecipeEnergies.AddAsync(recipeEnergy);

        await _dbContext.SaveChangesAsync();

        return Ok("Recipe added");
    }
}