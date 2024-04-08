using System.Collections;

namespace Server.Program;

public static class Program
{
    public static readonly IDictionary Config = Environment.GetEnvironmentVariables();

    private static void Main()
    {
        var builder = WebApplication.CreateBuilder();

        builder.AddAuthenticationAndAuthorization();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

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