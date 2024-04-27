namespace Server.Models;

public record RecipeStepRequest(
    int StepNumber,
    string Description,
    string ImageName
);