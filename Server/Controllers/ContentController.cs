using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DataBase;
using Server.DataBase.Entities;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Controllers;

[ApiController]
[Route("api/v1/content")]
public class ContentController : Controller
{
    private readonly DataContext _dbContext;
    private readonly IImageService _imageService;

    public ContentController(DataContext dataContext, IImageService imageService)
    {
        _dbContext = dataContext;
        _imageService = imageService;
    }

    [Authorize(Policy = "auth")]
    [HttpPost("images/add")]
    public async Task<ActionResult<UploadImagesResponse>> UploadImages([FromForm] IFormFileCollection fileRequest,
        [FromQuery] int width = 1920, [FromQuery] int height = 1080, [FromQuery] int quality = 50)
    {
        var userIdRequest = User.FindFirstValue("id");
        if (userIdRequest is null) return BadRequest("Empty id in the JWT token");

        var user = await _dbContext.Users.FindAsync(int.Parse(userIdRequest));
        if (user is null) return BadRequest("User not found");

        var response = new UploadImagesResponse(new List<string>());
        var path = "/files/images";
        if (!Directory.Exists(path)) Directory.CreateDirectory(path);
        foreach (var file in fileRequest)
        {
            if (file.ContentType.Split('/')[0] != "image") return BadRequest("Only images are allowed");
            var inputPath = Path.Combine(path, Guid.NewGuid() + Path.GetExtension(file.FileName));
            await file.CopyToAsync(new FileStream(inputPath, FileMode.Create));

            var outputPath = Path.Combine(path, Guid.NewGuid() + ".jpg");
            await _imageService.ResizeImage(inputPath, outputPath, width, height, quality);

            var imageEntity = new ImageEntity()
            {
                UserEntityId = user.Id,
                Path = outputPath,
                Name = Path.GetFileName(outputPath),
                Extension = Path.GetExtension(outputPath)
            };
            await _dbContext.Images.AddAsync(imageEntity);
            response.ImagesNames.Add(imageEntity.Name);
        }

        await _dbContext.SaveChangesAsync();
        return response;
    }

    [AllowAnonymous]
    [HttpGet("image/{imageName}")]
    public async Task<ActionResult> GetImage(string imageName)
    {
        var image = await _dbContext.Images.FirstOrDefaultAsync(x => x.Name == imageName);
        if (image is null) return BadRequest("Image not found");

        return File(new FileStream(image.Path, FileMode.Open), "image/jpeg");
    }

    [Authorize(Policy = "auth")]
    [HttpDelete("image/{imageName}")]
    public async Task<ActionResult> DeleteImage(string imageName)
    {
        var userId = int.Parse(User.Claims.First(x => x.Type == "id").Value);
        var user = await _dbContext.Users.Include(x => x.Files).FirstOrDefaultAsync(x => x.Id == userId);
        if (user is null) return BadRequest("User not found");

        var image = user.Files.FirstOrDefault(x => x.Name == imageName);
        if (image is null) return BadRequest("File not found");

        _dbContext.Images.Remove(image);
        await _dbContext.SaveChangesAsync();

        if (System.IO.File.Exists(image.Path)) System.IO.File.Delete(image.Path);

        return Ok("File deleted successfully");
    }
}