namespace Server.Models.Auth;

public record ChangePasswordRequest(
    string Password,
    string ConfirmPassword
);