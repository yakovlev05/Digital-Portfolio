using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.DataBase.Migrations
{
    /// <inheritdoc />
    public partial class fixkeyRecipeXXX : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RecipeId",
                table: "RecipeSteps",
                newName: "RecipeEntityId");

            migrationBuilder.RenameColumn(
                name: "RecipeId",
                table: "RecipeEnergies",
                newName: "RecipeEntityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RecipeEntityId",
                table: "RecipeSteps",
                newName: "RecipeId");

            migrationBuilder.RenameColumn(
                name: "RecipeEntityId",
                table: "RecipeEnergies",
                newName: "RecipeId");
        }
    }
}
