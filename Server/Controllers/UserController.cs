using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DataBase;
using Server.Models;

namespace Server.Controllers;

[ApiController]
[Route("api/v1/user")]
public class UserController : Controller
{
    private readonly DataContext _dbContext;

    public UserController(DataContext dataContext)
    {
        _dbContext = dataContext;
    }

    [Authorize(Policy = "auth")]
    [HttpGet("get-my-info")]
    public async Task<ActionResult<GetMyInfoResponse>> GetMyInfo()
    {
        var userIdRequest = User.FindFirstValue("id");
        if (userIdRequest is null) return BadRequest("Empty id in the JWT token");

        var user = await _dbContext.Users.FindAsync(int.Parse(userIdRequest));
        if (user is null) return BadRequest("User not found");

        var response = new GetMyInfoResponse(
            user.Login,
            user.Email,
            user.Name,
            user.SecondName,
            user.DateRegistration.ToString("dd.MM.yyyy"),
            user.BirthDate == DateTime.MinValue ? null : user.BirthDate.ToString("dd.MM.yyyy"),
            user.Description,
            user.TelegramLink,
            user.VkLink,
            user.ProfilePhoto
        );
        return response;
    }
}