namespace Server.Models.Auth;

public record RegistrationRequest(
    string Login,
    string Email,
    string Name,
    string SecondName,
    string Password,
    string ConfirmPassword
);