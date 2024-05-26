namespace Server.Models.Recipe;

public record CommentModel(
    string Guid,
    string DatePublished,
    int Rating,
    string Description,
    string UserLogin);