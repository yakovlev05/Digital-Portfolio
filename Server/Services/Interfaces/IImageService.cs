namespace Server.Services.Interfaces;

public interface IImageService
{
    public Task<MemoryStream> ResizeImage(Stream image, int width, int height);
    public Task<FileStream> CompressImage(FileStream image);
}