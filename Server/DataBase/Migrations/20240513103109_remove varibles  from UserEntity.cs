using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class removevariblesfromUserEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RecipeEnergy_RecipeEntityId",
                table: "RecipeEnergy");

            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TelegramLink",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "VkLink",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeEnergy_RecipeEntityId",
                table: "RecipeEnergy",
                column: "RecipeEntityId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RecipeEnergy_RecipeEntityId",
                table: "RecipeEnergy");

            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "Users",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "TelegramLink",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VkLink",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RecipeEnergy_RecipeEntityId",
                table: "RecipeEnergy",
                column: "RecipeEntityId");
        }
    }
}
