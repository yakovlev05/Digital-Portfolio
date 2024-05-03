namespace Server.Models.Recipe;

public record RecipeStepModel(
    int StepNumber,
    string Description,
    string ImageName
);