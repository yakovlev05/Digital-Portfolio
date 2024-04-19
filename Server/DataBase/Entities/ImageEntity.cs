namespace Server.DataBase.Entities;

public class ImageEntity
{
    public int Id { get; init; }
    public int UserEntityId { get; init; }
    public string Path { get; init; } = null!;
    public string Name { get; init; } = null!;
    public string Url { get; init; } = null!;
    public FileType Type { get; init; }
    public DateTime DateUpload { get; init; } = DateTime.Now.ToUniversalTime();
    public string Extension { get; init; } = null!;
}