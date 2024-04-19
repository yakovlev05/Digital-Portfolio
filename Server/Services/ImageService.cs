using Server.Services.Interfaces;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Processing.Processors.Transforms;

namespace Server.Services;

public class ImageService : IImageService
{
    public async Task<MemoryStream> ResizeImage(Stream image, int width, int height)
    {
        using var resizedImage = await Image.LoadAsync(image);
        resizedImage.Mutate(x => x.Resize(new ResizeOptions
        {
            Size = new Size(width, height),
            Mode = ResizeMode.Max
        }));
        var memoryStream = new MemoryStream();
        await resizedImage.SaveAsJpegAsync(memoryStream);
        memoryStream.Position = 0;
        return memoryStream;
    }

    public Task<FileStream> CompressImage(FileStream image)
    {
        throw new NotImplementedException();
    }
}