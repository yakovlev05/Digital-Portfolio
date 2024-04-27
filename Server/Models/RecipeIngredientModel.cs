using System.Text.Json.Serialization;

namespace Server.Models;


public record RecipeIngredientModel(
    string Name,
    int Quantity,
    string Unit
);