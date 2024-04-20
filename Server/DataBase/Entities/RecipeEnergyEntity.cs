namespace Server.DataBase.Entities;

public class RecipeEnergyEntity
{
    public int Id { get; init; }
    public int RecipeEntityId { get; init; }
    public int CaloriesFrom { get; set; }
    public int CaloriesTo { get; set; }
    public int FatsFrom { get; set; }
    public int FatsTo { get; set; }
    public int CarbohydratesFrom { get; set; }
    public int CarbohydratesTo { get; set; }
    public int ProteinsFrom { get; set; }
    public int ProteinsTo { get; set; }
    public RecipeEntity RecipeEntity { get; set; }
}