namespace Server.Models.Recipe;

public record GetCommentsResponse(int TotalCount, List<CommentModel> Comments);