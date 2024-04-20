namespace Server.DataBase.Entities;

public class RecipeIngredientEntity
{
    public int Id { get; init; }
    public int RecipeEntityId { get; init; }
    public string Name { get; set; } = null!;
    public int Quantity { get; set; }
    public string Unit { get; set; } = null!;
    public RecipeEntity RecipeEntity { get; set; }
}