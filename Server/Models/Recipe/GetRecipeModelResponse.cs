namespace Server.Models.Recipe;

public record GetRecipeModelResponse(
    string RecipeUrl,
    string Name,
    string ImageName,
    string AuthorLogin,
    string? AuthorImage,
    int CountAuthorRecipes,
    string Category,
    int CookingTimeInMinutes,
    string Description,
    List<RecipeIngredientModel> Ingredients,
    RecipeEnergyModel Energy,
    List<RecipeStepModel> Steps
);