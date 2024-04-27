namespace Server.DataBase.Entities;

public class RecipeEntity
{
    public int Id { get; init; }
    public int UserEntityId { get; init; }
    public string NameUrl { get; set; }
    public string Name { get; set; } = null!;
    public string MainImageName { get; set; } = null!;
    public string Category { get; set; } = null!;
    public TimeSpan CookingTime { get; set; }
    public DateTime DateCreate { get; init; } = DateTime.Now.ToUniversalTime();
    public string Description { get; set; } = null!;
    public ICollection<RecipeIngredientEntity> Ingredients { get; set; } = new List<RecipeIngredientEntity>();
    public RecipeEnergyEntity Energy { get; set; } = new RecipeEnergyEntity();
    public ICollection<RecipeStepEntity> Steps { get; set; } = new List<RecipeStepEntity>();
    public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();
}