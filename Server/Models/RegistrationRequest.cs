namespace Server.Models;

public record RegistrationRequest(
    string Login,
    string Email,
    string SecondName,
    string Name,
    string Password,
    string ConfirmPassword
);