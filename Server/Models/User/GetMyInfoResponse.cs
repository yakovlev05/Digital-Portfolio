namespace Server.Models;

public record GetMyInfoResponse(
    string Login,
    string Email,
    string Name,
    string SecondName,
    string DateRegistration,
    string? BirthDate,
    string? Description,
    string? TelegramLink,
    string? VkLink,
    string? ProfilePhoto
);