namespace Server.DataBase.Entities;

public class BookmarkEntity
{
    public int Id { get; init; }
    public int UserEntityId { get; init; }
    public int RecipeEntityId { get; init; }
    public string NameUrl { get; set; } = null!;
    public DateTime DateCreate { get; init; } = DateTime.Now.ToUniversalTime();
    public RecipeEntity Recipe { get; set; }
}