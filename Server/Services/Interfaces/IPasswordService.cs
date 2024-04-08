namespace Server.Services.Interfaces;

public interface IPasswordService
{
    public string HashPassword(string password, string login);
    public bool VerifyPassword(string password, string login, string hash);
    public string GeneratePassword();
}