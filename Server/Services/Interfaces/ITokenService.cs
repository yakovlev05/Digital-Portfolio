namespace Server.Services.Interfaces;

public interface ITokenService
{
    public string CreateToken(string login, string id);

    public string GetId(HttpContext httpContext);
}