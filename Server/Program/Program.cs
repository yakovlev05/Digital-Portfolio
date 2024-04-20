using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Server.DataBase;
using Server.Services;
using Server.Services.Interfaces;

namespace Server.Program;

public static class Program
{
    // public static readonly IDictionary Config = Environment.GetEnvironmentVariables();

    private static void Main()
    {
        var builder = WebApplication.CreateBuilder();

        builder.Services.AddControllers();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Portfolio API", Version = "v1" });

            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Enter JWT token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "bearer"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement()
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] { }
                }
            });
        });

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = builder.Configuration.GetValue<string>("Jwt:Issuer"),
                    ValidateAudience = true,
                    ValidAudience = builder.Configuration.GetValue<string>("Jwt:Audience"),
                    ValidateLifetime = true,
                    IssuerSigningKey =
                        new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("Jwt:Key") ??
                                                   throw new InvalidOperationException(
                                                       "Jwt:Key is not set in configuration."))),
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero // Истечение токена строго по времени
                };
            });

        builder.Services.AddAuthorizationBuilder()
            .AddPolicy("password_reset", policy => policy.RequireClaim("token_type", "password_reset"))
            .AddPolicy("confirm_email", policy => policy.RequireClaim("token_type", "email_confirmation"))
            .AddPolicy("auth", policy => policy.RequireClaim("token_type", "auth"));

        builder.Services.AddDbContext<DataContext>(o =>
            o.UseNpgsql("Host=localhost;Port=8082;Username=root;Password=fds#Ds25d#cV5s;Database=digitalPortfolioDB"));
        builder.Services.AddScoped<ITokenService, TokenService>();
        builder.Services.AddScoped<IPasswordService, PasswordService>();
        builder.Services.AddScoped<IEmailService, EmailService>();
        builder.Services.AddScoped<IImageService, ImageService>();
        var app = builder.Build();

        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.MapControllers();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();

        app.UseSwagger();
        app.UseSwaggerUI(); //на время разработки
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.Run();
    }
}