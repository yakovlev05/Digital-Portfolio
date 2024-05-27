namespace Server.Models.Recipe;

public record RecipeModel(
    string Name,
    string MainImageName,
    string Category,
    int CookingTimeInMinutes,
    string Description,
    ICollection<RecipeIngredientModel> Ingredients,
    RecipeEnergyModel EnergyModel,
    ICollection<RecipeStepModel> Steps
);