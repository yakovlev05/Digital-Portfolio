using Microsoft.EntityFrameworkCore;
using Server.DataBase.Entities;

namespace Server.DataBase;

public class DataContext : DbContext
{
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<FileEntity> Files { get; set; }

    public DataContext()
    {
        Database.Migrate();
    }

    public new async Task<int> SaveChanges()
    {
        return await base.SaveChangesAsync();
    }

    public DbSet<T> DbSet<T>() where T : class
    {
        return Set<T>();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(DatabaseSettings.CreateConnectionString());
    }
}