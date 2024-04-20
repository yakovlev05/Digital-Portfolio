namespace Server.DataBase.Entities;

public class RecipeEntity
{
    public int Id { get; init; }
    public int UserEntityId { get; init; }
    public string Name { get; set; } = null!;
    public TimeSpan CookingTime { get; set; }
    public DateTime DateCreate { get; init; } = DateTime.Now.ToUniversalTime();
    public string Description { get; set; } = null!;
    public ICollection<RecipeIngredientEntity> Ingredients = new List<RecipeIngredientEntity>();
    public ICollection<RecipeEnergyEntity> Energies = new List<RecipeEnergyEntity>();
    public ICollection<RecipeStepEntity> Steps = new List<RecipeStepEntity>();
}