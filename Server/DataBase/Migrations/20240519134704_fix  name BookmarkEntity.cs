using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.DataBase.Migrations
{
    /// <inheritdoc />
    public partial class fixnameBookmarkEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookmarkEntity_Recipes_RecipeEntityId",
                table: "BookmarkEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_BookmarkEntity_Users_UserEntityId",
                table: "BookmarkEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookmarkEntity",
                table: "BookmarkEntity");

            migrationBuilder.RenameTable(
                name: "BookmarkEntity",
                newName: "Bookmarks");

            migrationBuilder.RenameIndex(
                name: "IX_BookmarkEntity_UserEntityId",
                table: "Bookmarks",
                newName: "IX_Bookmarks_UserEntityId");

            migrationBuilder.RenameIndex(
                name: "IX_BookmarkEntity_RecipeEntityId",
                table: "Bookmarks",
                newName: "IX_Bookmarks_RecipeEntityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bookmarks",
                table: "Bookmarks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookmarks_Recipes_RecipeEntityId",
                table: "Bookmarks",
                column: "RecipeEntityId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Bookmarks_Users_UserEntityId",
                table: "Bookmarks",
                column: "UserEntityId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookmarks_Recipes_RecipeEntityId",
                table: "Bookmarks");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookmarks_Users_UserEntityId",
                table: "Bookmarks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Bookmarks",
                table: "Bookmarks");

            migrationBuilder.RenameTable(
                name: "Bookmarks",
                newName: "BookmarkEntity");

            migrationBuilder.RenameIndex(
                name: "IX_Bookmarks_UserEntityId",
                table: "BookmarkEntity",
                newName: "IX_BookmarkEntity_UserEntityId");

            migrationBuilder.RenameIndex(
                name: "IX_Bookmarks_RecipeEntityId",
                table: "BookmarkEntity",
                newName: "IX_BookmarkEntity_RecipeEntityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookmarkEntity",
                table: "BookmarkEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BookmarkEntity_Recipes_RecipeEntityId",
                table: "BookmarkEntity",
                column: "RecipeEntityId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookmarkEntity_Users_UserEntityId",
                table: "BookmarkEntity",
                column: "UserEntityId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
