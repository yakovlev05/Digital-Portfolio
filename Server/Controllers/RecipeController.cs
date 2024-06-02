using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.DataBase;
using Server.DataBase.Entities;
using Server.Models;
using Server.Models.Recipe;
using Server.Models.User;
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
    public async Task<ActionResult<AddRecipeResponse>> AddRecipe([FromBody] RecipeModel request)
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
            CookingTimeInMinutes = TimeSpan.FromMinutes(request.CookingTimeInMinutes),
            Description = request.Description,
            Ingredients = request.Ingredients
                .Select(x => new RecipeIngredientEntity()
                {
                    Name = x.Name,
                    Quantity = x.Quantity,
                    Unit = x.Unit
                })
                .ToList(),
            Energy = new RecipeEnergyEntity()
            {
                CaloriesFrom = request.Energy.CaloriesFrom,
                CaloriesTo = request.Energy.CaloriesTo,
                FatsFrom = request.Energy.FatsFrom,
                FatsTo = request.Energy.FatsTo,
                CarbohydratesFrom = request.Energy.CarbohydratesFrom,
                CarbohydratesTo = request.Energy.CarbohydratesTo,
                ProteinsFrom = request.Energy.ProteinsFrom,
                ProteinsTo = request.Energy.ProteinsTo
            },
            Steps = request.Steps
                .Select(x => new RecipeStepEntity()
                {
                    StepNumber = x.StepNumber,
                    Description = x.Description,
                    ImageName = x.ImageName
                })
                .ToList(),
        };

        await _dbContext.Recipes.AddAsync(recipe);
        await _dbContext.SaveChangesAsync();

        return new AddRecipeResponse(recipe.NameUrl);
    }

    [AllowAnonymous]
    [HttpGet("{recipeUrl}")]
    public async Task<ActionResult<GetRecipeModelResponse>> GetRecipe(string recipeUrl)
    {
        var recipe = await _dbContext.Recipes
            .Include(x => x.Ingredients)
            .Include(x => x.Energy)
            .Include(x => x.Steps)
            .Include(x => x.User)
            .ThenInclude(userEntity => userEntity.Recipes)
            .FirstOrDefaultAsync(x => x.NameUrl == recipeUrl);

        if (recipe is null) return BadRequest("Recipe not found");
        var response = new GetRecipeModelResponse(
            recipe.NameUrl,
            recipe.Name,
            recipe.MainImageName,
            recipe.User.Login,
            recipe.User.ProfilePhoto,
            recipe.User.Recipes.Count,
            recipe.Category,
            (int)recipe.CookingTimeInMinutes.TotalMinutes,
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
            recipe.Steps.Select(x => new RecipeStepModel(x.StepNumber, x.Description, x.ImageName))
                .OrderBy(x => x.StepNumber).ToList()
        );

        return response;
    }

    [Authorize(Policy = "auth")]
    [HttpPut("{recipeUrl}")]
    public async Task<ActionResult<UpdateRecipeResponse>> UpdateRecipe(RecipeModel request, string recipeUrl)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users
            .Include(x => x.Recipes)
            .ThenInclude(x => x.Ingredients)
            .Include(x => x.Recipes)
            .ThenInclude(x => x.Energy)
            .Include(x => x.Recipes)
            .ThenInclude(x => x.Steps)
            .FirstOrDefaultAsync(x => x.Id == userId);

        if (user is null) return BadRequest("User not found");

        var recipe = user.Recipes.FirstOrDefault(x => x.NameUrl == recipeUrl);
        if (recipe is null) return BadRequest("Recipe not found");

        recipe.NameUrl = recipe.Name == request.Name ? recipe.NameUrl : _urlService.GetUrlFromString(request.Name);
        recipe.Name = request.Name;
        recipe.MainImageName = request.MainImageName;
        recipe.Category = request.Category;
        recipe.CookingTimeInMinutes = TimeSpan.FromMinutes(request.CookingTimeInMinutes);
        recipe.Description = request.Description;

        // Можно не создавать новые объекты, а искать в бд: объект нашёлся - обновить, не нашёлся - создать
        var recipeIngredients = request.Ingredients
            .Select(x => new RecipeIngredientEntity()
                { Name = x.Name, Quantity = x.Quantity, Unit = x.Unit })
            .ToList();

        // При удалении некоторых шагов, изображение тоже должно удаляться в бд и в файловой системе
        // Ну это дополнительный цикл нужен, который сопоставляет имеющиеся шаги с новыми (ключ поиска - имя изоражения)
        var recipeSteps = request.Steps
            .Select(x => new RecipeStepEntity()
                { StepNumber = x.StepNumber, Description = x.Description, ImageName = x.ImageName })
            .ToList();

        var recipeEnergy = new RecipeEnergyEntity()
        {
            CaloriesFrom = request.Energy.CaloriesFrom,
            CaloriesTo = request.Energy.CaloriesTo,
            CarbohydratesFrom = request.Energy.CarbohydratesFrom,
            CarbohydratesTo = request.Energy.CarbohydratesTo,
            FatsFrom = request.Energy.FatsFrom,
            FatsTo = request.Energy.FatsTo,
            ProteinsFrom = request.Energy.ProteinsFrom,
            ProteinsTo = request.Energy.ProteinsTo
        };


        recipe.Ingredients = recipeIngredients;
        recipe.Energy = recipeEnergy;
        recipe.Steps = recipeSteps;

        await _dbContext.SaveChangesAsync();

        return new UpdateRecipeResponse(recipe.NameUrl, recipe.Id);
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
            if (System.IO.File.Exists($"/files/images/{step.ImageName}"))
                System.IO.File.Delete($"/files/images/{step.ImageName}");
            var image = await _dbContext.Images.FirstOrDefaultAsync(x => x.Name == step.ImageName);
            if (image != null) _dbContext.Remove(image);
        }

        await _dbContext.SaveChangesAsync();

        return Ok("Recipe deleted");
    }

    [Authorize(Policy = "auth")]
    [HttpGet("{recipeUrl}/info")]
    public async Task<ActionResult<GetMyInfoAboutRecipeResponse>> GetMyInfoAboutRecipe(string recipeUrl)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users
            .Include(x => x.Recipes)
            .Include(x => x.Bookmarks)
            .FirstOrDefaultAsync(x => x.Id == userId);
        if (user is null) return BadRequest(new MessageModel("User not found"));

        var isMyRecipe = user.Recipes.Any(x => x.NameUrl == recipeUrl);
        var isMyBookmark = user.Bookmarks.Any(x => x.NameUrl == recipeUrl);

        return new GetMyInfoAboutRecipeResponse(isMyBookmark, isMyRecipe);
    }

    [AllowAnonymous]
    [HttpGet("{recipeUrl}/comments")]
    public async Task<ActionResult<GetCommentsResponse>> GetComments(string recipeUrl, int page = 1, int count = 5)
    {
        var recipe = await _dbContext.Recipes
            .Include(x => x.Comments)
            .ThenInclude(x => x.User)
            .FirstOrDefaultAsync(x => x.NameUrl == recipeUrl);
        if (recipe is null) return BadRequest(new MessageModel("Recipe not found"));

        var comments = recipe.Comments
            .OrderByDescending(x => x.Published)
            .Skip((page - 1) * count)
            .Take(count)
            .Select(x => new CommentModel(
                x.Guid,
                x.Published.ToString("dd.MM.yyyy"),
                x.Rating,
                x.Description,
                x.User.Login))
            .ToList();

        return new GetCommentsResponse(recipe.Comments.Count, comments);
    }

    [AllowAnonymous]
    [HttpGet("search")]
    public async Task<ActionResult<GetUserRecipesResponse>> SearchRecipes(string? name, string? category,
        int? minRating,
        int? maxRating, int? minCookingTimeInMinutes, int? maxCookingTimeInMinutes,
        SortOptions sort = SortOptions.ByDateCreate, bool orderByDescending = false, int page = 1, int count = 10)
    {
        var recipes =
            _dbContext.Recipes.AsQueryable(); // Следующие запорсы LINQ будут выполняться в базе данных, а не в памяти

        if (!string.IsNullOrEmpty(name)) recipes = recipes.Where(x => x.Name.Contains(name));
        if (!string.IsNullOrEmpty(category)) recipes = recipes.Where(x => x.Category == category);
        if (minRating is not null) recipes = recipes.Where(x => x.Rating >= minRating);
        if (maxRating is not null) recipes = recipes.Where(x => x.Rating <= maxRating);
        if (minCookingTimeInMinutes is not null)
            recipes = recipes.Where(x => x.CookingTimeInMinutes.TotalMinutes >= minCookingTimeInMinutes);
        if (maxCookingTimeInMinutes is not null)
            recipes = recipes.Where(x => x.CookingTimeInMinutes.TotalMinutes < maxCookingTimeInMinutes);

        switch (sort)
        {
            case SortOptions.ByRating:
                recipes = orderByDescending
                    ? recipes.OrderByDescending(x => x.Rating)
                    : recipes.OrderBy(x => x.Rating);
                break;
            case SortOptions.ByCookingTime:
                recipes = orderByDescending
                    ? recipes.OrderByDescending(x => x.CookingTimeInMinutes.TotalMinutes)
                    : recipes.OrderBy(x => x.CookingTimeInMinutes.TotalMinutes);
                break;
            case SortOptions.ByDateCreate:
                recipes = orderByDescending
                    ? recipes.OrderByDescending(x => x.DateCreate)
                    : recipes.OrderBy(x => x.DateCreate);
                break;
            case SortOptions.ByIngredientsCount:
                recipes = orderByDescending
                    ? recipes.OrderByDescending(x => x.Ingredients.Count)
                    : recipes.OrderBy(x => x.Ingredients.Count);
                break;
        }

        recipes = recipes.Skip((page - 1) * count).Take(count);

        var result = recipes.Select(x => new MyRecipe(x.Name, x.MainImageName, x.Rating,
            (int)x.CookingTimeInMinutes.TotalMinutes, x.Ingredients.Count, x.Category, x.NameUrl));
        
        return new GetUserRecipesResponse(await result.ToListAsync());
    }
}

public enum SortOptions
{
    ByRating,
    ByCookingTime,
    ByDateCreate,
    ByIngredientsCount,
}