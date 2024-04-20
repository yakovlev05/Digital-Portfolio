namespace Server.DataBase.Entities;

public class CommentEntity
{
    public int Id { get; init; }
    public int UserEntityId { get; init; }
    public int RecipeEntityId { get; init; }
    public string Guid { get; init; } = new Guid().ToString();
    public DateTime Published { get; init; } = DateTime.Now.ToUniversalTime();
    public int Rating { get; set; }
    public string Description { get; set; }
    public CommentStatus Status { get; set; } = CommentStatus.RequireModeration;
    public RecipeEntity RecipeEntity { get; set; }
}