using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Digests;
using Server.DataBase;
using Server.DataBase.Entities;
using Server.Models;
using Server.Services;
using Server.Services.Interfaces;
using SixLabors.ImageSharp;

namespace Server.Controllers;

[ApiController]
[Route("api/v1/content")]
public class ContentController : Controller
{
    private readonly DataContext _dbContext;
    public readonly IImageService _ImageService;

    public ContentController(DataContext dataContext, IImageService imageService)
    {
        _dbContext = dataContext;
        _ImageService = imageService;
    }

    [Authorize(Policy = "auth")]
    [HttpPost("upload-images")]
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
            var inputPath = Path.Combine(path, Guid.NewGuid() + Path.GetExtension(file.FileName));
            await file.CopyToAsync(new FileStream(inputPath, FileMode.Create));

            var outputPath = Path.Combine(path, Guid.NewGuid() + ".jpg");
            await _ImageService.ResizeImage(inputPath, outputPath, width, height, quality);

            var imageEntity = new ImageEntity()
            {
                UserEntityId = user.Id,
                Path = outputPath,
                Name = Path.GetFileName(outputPath),
                Url = "",
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
}