namespace Server.Models.Comment;

public record AddCommentRequest(
    string RecipeUrl,
    int Rating,
    string Description
);