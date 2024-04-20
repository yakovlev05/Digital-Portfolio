using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.DataBase.Migrations
{
    /// <inheritdoc />
    public partial class fixexteralkeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_RecipeSteps_RecipeEntityId",
                table: "RecipeSteps",
                column: "RecipeEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredients_RecipeEntityId",
                table: "RecipeIngredients",
                column: "RecipeEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeEnergies_RecipeEntityId",
                table: "RecipeEnergies",
                column: "RecipeEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_RecipeEntityId",
                table: "Comments",
                column: "RecipeEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Recipes_RecipeEntityId",
                table: "Comments",
                column: "RecipeEntityId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeEnergies_Recipes_RecipeEntityId",
                table: "RecipeEnergies",
                column: "RecipeEntityId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredients_Recipes_RecipeEntityId",
                table: "RecipeIngredients",
                column: "RecipeEntityId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeSteps_Recipes_RecipeEntityId",
                table: "RecipeSteps",
                column: "RecipeEntityId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Recipes_RecipeEntityId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeEnergies_Recipes_RecipeEntityId",
                table: "RecipeEnergies");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredients_Recipes_RecipeEntityId",
                table: "RecipeIngredients");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeSteps_Recipes_RecipeEntityId",
                table: "RecipeSteps");

            migrationBuilder.DropIndex(
                name: "IX_RecipeSteps_RecipeEntityId",
                table: "RecipeSteps");

            migrationBuilder.DropIndex(
                name: "IX_RecipeIngredients_RecipeEntityId",
                table: "RecipeIngredients");

            migrationBuilder.DropIndex(
                name: "IX_RecipeEnergies_RecipeEntityId",
                table: "RecipeEnergies");

            migrationBuilder.DropIndex(
                name: "IX_Comments_RecipeEntityId",
                table: "Comments");
        }
    }
}
