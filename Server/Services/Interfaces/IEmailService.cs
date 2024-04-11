namespace Server.Services.Interfaces;

public interface IEmailService
{
    public Task SendConfirmationUrl(string email, string url);
    public Task SendNewPassword(string email, string password);
}