namespace Server.Models;

public record AddRecipeRequest(
    string Name,
    string MainImageName,
    string Category,
    int CookingTimeMinutes,
    string Description,
    ICollection<RecipeIngredientRequest> Ingredients,
    RecipeEnergyRequest Energy,
    ICollection<RecipeStepRequest> Steps
);