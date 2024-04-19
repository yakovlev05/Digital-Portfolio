namespace Server.Services.Interfaces;

public interface IImageService
{
    public Task ResizeImage(string inputPath, string outputPath, int width, int height, int quality = 100);
}