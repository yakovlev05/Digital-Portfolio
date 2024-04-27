using System.Text.Json.Serialization;

namespace Server.Models;


public record RecipeIngredientRequest(
    string Name,
    int Quantity,
    string Unit
);