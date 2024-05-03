namespace Server.Models.Comment;

public record GetCommentResponse(
    string CommentGuid,
    int Rating,
    string Description,
    string PublishedTime,
    string UserName,
    string UserSecondName,
    string? UserImageName,
    string UserLogin
);