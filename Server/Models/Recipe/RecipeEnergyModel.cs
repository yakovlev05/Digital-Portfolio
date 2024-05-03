namespace Server.Models.Recipe;

public record RecipeEnergyModel(
    int CaloriesFrom,
    int CaloriesTo,
    int FatsFrom,
    int FatsTo,
    int CarbohydratesFrom,
    int CarbohydratesTo,
    int ProteinsFrom,
    int ProteinsTo
);