using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.DataBase.Migrations
{
    /// <inheritdoc />
    public partial class addRatingtiRecipeEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CookingTime",
                table: "Recipes",
                newName: "CookingTimeInMinutes");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Recipes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Recipes");

            migrationBuilder.RenameColumn(
                name: "CookingTimeInMinutes",
                table: "Recipes",
                newName: "CookingTime");
        }
    }
}
