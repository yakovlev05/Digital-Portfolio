namespace Server.DataBase.Entities;

public class UserEntity
{
    public int Id { get; init; }
    public string Login { get; set; } = null!; // Не меньше 5 символов
    public string HashedPassword { get; set; } = null!; // Пароль не меньше 8 символов
    public string Email { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string SecondName { get; set; } = null!;
    public string? Patronymic { get; set; }
    public DateTime DateRegistration { get; init; } = DateTime.Now.ToUniversalTime();
    public string? Description { get; set; }
    public string? ProfilePhoto { get; set; }
    public UserStatus Status { get; set; } = UserStatus.Suspended;
    public UserRole Role { get; set; } = UserRole.User;
    public ICollection<ImageEntity> Files { get; set; } = new List<ImageEntity>();
    public ICollection<RecipeEntity> Recipes { get; set; } = new List<RecipeEntity>();
    public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();
    public ICollection<BookmarkEntity> Bookmarks { get; set; } = new List<BookmarkEntity>();
}