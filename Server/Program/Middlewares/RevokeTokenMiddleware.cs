using Microsoft.Net.Http.Headers;
using Server.DataBase;
using Server.DataBase.Entities;

namespace Server.Program.Middlewares;

public class RevokeTokenMiddleware
{
    private readonly RequestDelegate _next;

    public RevokeTokenMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    // в InvokeAsync внедерние зависимостей работает
    public async Task InvokeAsync(HttpContext context, DataContext dataContext)
    {
        var token = context.Request.Headers[HeaderNames.Authorization];
        var tokensToRemove = new List<RevokedTokenEntity>();
        var unauthorized = false;
        foreach (var tokenEntity in dataContext.RevokedTokens)
        {
            if (tokenEntity.ExpirationDate > DateTime.Now) tokensToRemove.Add(tokenEntity);
            if (tokenEntity.Token == token) unauthorized = true;
        }

        dataContext.RevokedTokens.RemoveRange(tokensToRemove);
        await dataContext.SaveChangesAsync();

        if (unauthorized)
        {
            context.Response.StatusCode = 401;
            return;
        }

        await _next.Invoke(context);
    }
}