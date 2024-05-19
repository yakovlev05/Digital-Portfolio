namespace Server.Models.User;

public record GetUserInfoResponse(
    string Login,
    string Email,
    string Name,
    string SecondName,
    string? Patronymic,
    string DateRegistration,
    string? Description,
    string? ProfilePhoto,
    int RecipesCount
);