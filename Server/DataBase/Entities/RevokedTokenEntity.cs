namespace Server.DataBase.Entities;

public class RevokedTokenEntity
{
    public int Id { get; init; }
    public string Token { get; init; } = null!;
    public DateTime RevokedAt { get; init; } = DateTime.UtcNow;
    public int UserId { get; init; }
    public DateTime ExpirationDate { get; init; }
}