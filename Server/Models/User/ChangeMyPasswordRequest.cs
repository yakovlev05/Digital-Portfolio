namespace Server.Models.User;

public record ChangeMyPasswordRequest(
    string Password,
    string NewPassword
);