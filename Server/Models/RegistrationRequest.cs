namespace Server.Models;

public record RegistrationRequest(
    string Login,
    string Email,
    string Name,
    string SecondName,
    string Password,
    string ConfirmPassword
);