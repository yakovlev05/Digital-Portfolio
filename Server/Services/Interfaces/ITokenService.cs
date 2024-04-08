namespace Server.Services.Interfaces;

public interface ITokenService
{
    public string CreateToken(string login, string id);
}