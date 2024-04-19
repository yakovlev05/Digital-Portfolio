using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DataBase;
using Server.DataBase.Entities;

namespace Server.Controllers;

[ApiController]
[Route("api/v1/content")]
public class ContentController : Controller
{
    private readonly DataContext _dbContext;

    public ContentController(DataContext dataContext)
    {
        _dbContext = dataContext;
    }

    [Authorize(Policy = "auth")]
    [HttpPost("upload-images")]
    public async Task<ActionResult> UploadImages([FromForm] IFormFileCollection fileRequest)
    {
        var userIdRequest = User.FindFirstValue("id");
        if (userIdRequest is null) return BadRequest("Empty id in the JWT token");

        var user = await _dbContext.Users.FindAsync(int.Parse(userIdRequest));
        if (user is null) return BadRequest("User not found");

        var path = "/files/images";
        if (!Directory.Exists(path)) Directory.CreateDirectory(path);
        foreach (var file in fileRequest)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            var fileName = Guid.NewGuid().ToString() + fileExtension;
            var filePath = Path.Combine(path, fileName);
            await using var fileStream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(fileStream);

            var imageEntity = new ImageEntity()
            {
                UserEntityId = user.Id,
                Path = filePath,
                Name = fileName,
                Url = "",
                Type = FileType.Image,
                Extension = fileExtension
            };
            await _dbContext.Images.AddAsync(imageEntity);
        }

        await _dbContext.SaveChangesAsync();
        return Ok();
    }
}