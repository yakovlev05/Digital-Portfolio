using Server.Services.Interfaces;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;

namespace Server.Services;

public class ImageService : IImageService
{
    public async Task ResizeImage(string inputPath, string outputPath, int width, int height, int quality = 100)
    {
        using var inputImage = await Image.LoadAsync(inputPath);
        var cropWidth = width > inputImage.Width ? inputImage.Width : width;
        var cropHeight = height > inputImage.Height ? inputImage.Height : height;
        inputImage.Mutate(x => x.Resize(new ResizeOptions
        {
            Size = new Size(cropWidth > 1920 ? 1920 : cropWidth, cropHeight > 1080 ? 1080 : cropHeight),
            Mode = ResizeMode.Crop
        }));

        var encoder = new JpegEncoder() { Quality = quality > 100 ? 100 : quality };

        await using var fileStream = new FileStream(outputPath, FileMode.Create);
        await inputImage.SaveAsJpegAsync(fileStream, encoder);
        File.Delete(inputPath);
    }
}