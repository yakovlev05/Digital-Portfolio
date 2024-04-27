namespace Server.Models;

public record RecipeModel(
    string Name,
    string MainImageName,
    string Category,
    int CookingTimeMinutes,
    string Description,
    ICollection<RecipeIngredientModel> Ingredients,
    RecipeEnergyModel EnergyModel,
    ICollection<RecipeStepModel> Steps
);