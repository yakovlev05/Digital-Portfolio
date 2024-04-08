using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Server.Program;
using Server.Services.Interfaces;

namespace Server.Services;

public class TokenService : ITokenService
{
    public string CreateToken(string login, string id)
    {
        var claims = new List<Claim>
        {
            new Claim("Login", login),
            new Claim("id", id)
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
}