using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.DataBase.Migrations
{
    /// <inheritdoc />
    public partial class addBookmarkEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookmarkEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserEntityId = table.Column<int>(type: "integer", nullable: false),
                    RecipeEntityId = table.Column<int>(type: "integer", nullable: false),
                    NameUrl = table.Column<string>(type: "text", nullable: false),
                    DateCreate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookmarkEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookmarkEntity_Recipes_RecipeEntityId",
                        column: x => x.RecipeEntityId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookmarkEntity_Users_UserEntityId",
                        column: x => x.UserEntityId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookmarkEntity_RecipeEntityId",
                table: "BookmarkEntity",
                column: "RecipeEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_BookmarkEntity_UserEntityId",
                table: "BookmarkEntity",
                column: "UserEntityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookmarkEntity");
        }
    }
}
