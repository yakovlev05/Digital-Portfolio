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
        builder.Services.AddScoped<IPasswordService, PasswordService>();

        var app = builder.Build();

        app.MapControllers();
        app.UseRouting();
        app.UseAuthenticationAndAuthorization();
        
        app.UseSwagger();
        app.UseSwaggerUI(); //на время разработки
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.MapGet("/", () => "В разработке \n Документация: https://pp.yakovlev05.ru/swagger/index.html");
        
        app.Run();
    }
}