using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Server.Program;
using Server.Services.Interfaces;

namespace Server.Services;

public class TokenService : ITokenService
{
    private string CreateToken(string login, string id, string tokenType)
    {
        var claims = new List<Claim>
        {
            new Claim("login", login),
            new Claim("id", id),
            new Claim("token_type", tokenType)
        };
        var jwt = new JwtSecurityToken(
            issuer: AuthenticationOptions.Issuer,
            audience: AuthenticationOptions.Audience,
            claims: claims,
            expires: DateTime.UtcNow.Add(TimeSpan.FromDays(7)),
            notBefore: DateTime.UtcNow,
            signingCredentials: new SigningCredentials(AuthenticationOptions.GetSymmetricSecurityKey(),
                SecurityAlgorithms.HmacSha256));
        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }

    public string CreateAuthToken(string login, string id) => CreateToken(login, id, "auth");

    public string CreatePasswordResetToken(string login, string id) => CreateToken(login, id, "password_reset");

    public string CreateEmailConfirmationToken(string login, string id) => CreateToken(login, id, "email_confirmation");
}