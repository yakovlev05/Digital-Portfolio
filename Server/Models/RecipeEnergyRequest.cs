namespace Server.Models;

public record RecipeEnergyRequest(
    int CaloriesFrom,
    int CaloriesTo,
    int FatsFrom,
    int FatsTo,
    int CarbohydratesFrom,
    int CarbohydratesTo,
    int ProteinsFrom,
    int ProteinsTo
);