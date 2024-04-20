namespace Server.DataBase.Entities;

public class RecipeStepEntity
{
    public int Id { get; init; }
    public int RecipeEntityId { get; init; }
    public int StepNumber { get; set; }
    public string Description { get; set; } = null!;
    public string ImageName { get; set; } = null!;
    public RecipeEntity RecipeEntity { get; set; }
}