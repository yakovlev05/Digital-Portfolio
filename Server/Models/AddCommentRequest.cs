namespace Server.Models;

public record AddCommentRequest(
    int RecipeId,
    int Rating,
    string Description
);