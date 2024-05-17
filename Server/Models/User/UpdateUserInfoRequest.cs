namespace Server.Models.User;

public record UpdateUserInfoRequest(
    string Name,
    string SecondName,
    string? Patronymic,
    string Login,
    string Email,
    string? Description
);