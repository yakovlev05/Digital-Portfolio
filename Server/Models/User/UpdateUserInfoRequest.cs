namespace Server.Models;

public record UpdateUserInfoRequest(
    string? ProfilePhoto,
    string Name,
    string SecondName,
    string? Patronymic,
    string Login,
    string Email,
    string? Description
);