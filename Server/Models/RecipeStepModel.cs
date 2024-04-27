namespace Server.Models;

public record RecipeStepModel(
    int StepNumber,
    string Description,
    string ImageName
);