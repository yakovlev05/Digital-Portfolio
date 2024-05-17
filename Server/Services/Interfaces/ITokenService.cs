namespace Server.Services.Interfaces;

public interface ITokenService
{
    public string CreateAuthToken(string login, string id);
    public string CreatePasswordResetToken(string login, string id);
    public string CreateEmailConfirmationToken(string login, string id);
    public DateTime GetExpirationDate(string token);
}