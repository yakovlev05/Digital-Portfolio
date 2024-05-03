namespace Server.Models;

public record UpdateUserInfoRequest(
    string ProfilePhoto,
    string Name,
    string SecondName,
    string Login,
    string Email,
    string NewPassword
);