using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.DataBase.Migrations
{
    /// <inheritdoc />
    public partial class updateImageEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Images");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Images",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
