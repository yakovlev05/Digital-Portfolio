using System.Collections;
using Server.Services;
using Server.Services.Interfaces;

namespace Server.Program;

public static class Program
{
    public static readonly IDictionary Config = Environment.GetEnvironmentVariables();

    private static void Main()
    {
        var builder = WebApplication.CreateBuilder();

        builder.AddAuthenticationAndAuthorization();
        builder.Services.AddControllers();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddScoped<ITokenService, TokenService>();

        var app = builder.Build();

        app.MapControllers();
        app.UseRouting();
        app.UseAuthenticationAndAuthorization();
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.Run();
    }
}