namespace Server.DataBase.Entities;

public class UserEntity
{
    public int Id { get; init; }
    public string Login { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string SecondName { get; set; } = null!;
    public DateTime DateRegistration { get; init; } = DateTime.Now.ToUniversalTime();
    public DateTime BirthDate { get; set; } = DateTime.MinValue;
    public string? Description { get; set; }
    public string? TelegramLink { get; set; }
    public string? VkLink { get; set; }
    public string? ProfilePhoto { get; set; }
    public UserStatus Status { get; set; } = UserStatus.Suspended;
    public UserRole Role { get; set; } = UserRole.User;
}