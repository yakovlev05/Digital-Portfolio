using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.DataBase.Migrations
{
    /// <inheritdoc />
    public partial class changeinRecipeEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeEnergies_Recipes_RecipeEntityId",
                table: "RecipeEnergies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeEnergies",
                table: "RecipeEnergies");

            migrationBuilder.RenameTable(
                name: "RecipeEnergies",
                newName: "RecipeEnergy");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeEnergies_RecipeEntityId",
                table: "RecipeEnergy",
                newName: "IX_RecipeEnergy_RecipeEntityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecipeEnergy",
                table: "RecipeEnergy",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeEnergy_Recipes_RecipeEntityId",
                table: "RecipeEnergy",
                column: "RecipeEntityId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeEnergy_Recipes_RecipeEntityId",
                table: "RecipeEnergy");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeEnergy",
                table: "RecipeEnergy");

            migrationBuilder.RenameTable(
                name: "RecipeEnergy",
                newName: "RecipeEnergies");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeEnergy_RecipeEntityId",
                table: "RecipeEnergies",
                newName: "IX_RecipeEnergies_RecipeEntityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecipeEnergies",
                table: "RecipeEnergies",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeEnergies_Recipes_RecipeEntityId",
                table: "RecipeEnergies",
                column: "RecipeEntityId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
