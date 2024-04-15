namespace Server.Models;

public record ChangePasswordRequest(
    string Password,
    string ConfirmPassword
);