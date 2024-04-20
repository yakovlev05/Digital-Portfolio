using Microsoft.EntityFrameworkCore;
using Server.DataBase.Entities;

namespace Server.DataBase;

public class DataContext : DbContext
{
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<ImageEntity> Images { get; set; }
    public DbSet<RecipeEntity> Recipes { get; set; }
    public DbSet<RecipeStepEntity> RecipeSteps { get; set; }
    public DbSet<RecipeIngredientEntity> RecipeIngredients { get; set; }
    public DbSet<RecipeEnergyEntity> RecipeEnergies { get; set; }
    public DbSet<CommentEntity> Comments { get; set; }

    public DataContext(DbContextOptions<DataContext> options) : base(options)
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
}