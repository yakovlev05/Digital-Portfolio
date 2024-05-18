namespace Server.Models.User;

public record MyRecipe(
    string Name,
    string ImageName,
    int Rating,
    TimeSpan CookingTimeInMinutes,
    int IngredientsCount,
    string Category
);