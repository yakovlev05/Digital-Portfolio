namespace Server.Models.Recipe;


public record RecipeIngredientModel(
    string Name,
    int Quantity,
    string Unit
);