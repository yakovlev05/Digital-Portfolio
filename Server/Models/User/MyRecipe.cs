namespace Server.Models.User;

public record MyRecipe(
    string Name,
    string ImageName,
    int Rating,
    int CookingTimeInMinutes,
    int IngredientsCount,
    string Category,
    string NameUrl
);