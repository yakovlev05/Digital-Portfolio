namespace Server.DataBase.Entities;

public class FileEntity
{
    public int Id { get; init; }
    public int UserEntityId { get; init; }
    public string Path { get; init; } = null!;
    public string Name { get; init; } = null!;
    public FileType Type { get; init; }
    public DateTime DateUpload { get; init; } = DateTime.Now.ToUniversalTime();
    public int Size { get; init; }
    public string Extension { get; init; } = null!;
}