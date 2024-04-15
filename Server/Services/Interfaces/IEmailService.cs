namespace Server.Services.Interfaces;

public interface IEmailService
{
    public Task SendConfirmationUrl(string email, string token);
    public Task SendNewPassword(string email, string password);
    public Task SendPasswordResetUrl(string email, string token);
}