namespace Server.Models.Comment;

public record AddCommentResponse(
    string CommentGuid,
    string DatePublished);