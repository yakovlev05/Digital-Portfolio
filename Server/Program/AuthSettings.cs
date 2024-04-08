using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Server.Program;

public class AuthSettings
{
    public static void AddAuthentication(WebApplicationBuilder builder)
    {
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = AuthenticationOptions.Issuer,
                    ValidateAudience = true,
                    ValidAudience = AuthenticationOptions.Audience,
                    ValidateLifetime = true,
                    IssuerSigningKey = AuthenticationOptions.GetSymmetricSecurityKey(),
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero // Истечение токена строго по времени
                };
            });
    }
}

public static class AuthenticationOptions
{
    public static readonly string? Issuer = Program.Config["Jwt:Issuer"]?.ToString();
    public static readonly string? Audience = Program.Config["Jwt:Audience"]?.ToString();
    private static readonly string? Key = Program.Config["Jwt:Key"]?.ToString();

    public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
        new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(Key ?? throw new InvalidOperationException("Jwt:Key is not set in configuration.")));
}

public static class AuthenticationExtensions
{
    public static void AddAuthenticationAndAuthorization(this WebApplicationBuilder builder)
    {
        AuthSettings.AddAuthentication(builder);
        builder.Services.AddAuthorization();
    }

    public static void UseAuthenticationAndAuthorization(this WebApplication app)
    {
        app.UseAuthentication();
        app.UseAuthorization();
    }
}