namespace Server.Models.Comment;

public record AddCommentRequest(
    int RecipeId,
    int Rating,
    string Description
);