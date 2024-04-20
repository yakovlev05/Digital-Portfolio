using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.DataBase.Migrations
{
    /// <inheritdoc />
    public partial class renameEnergyValues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EnergyValues",
                table: "EnergyValues");

            migrationBuilder.RenameTable(
                name: "EnergyValues",
                newName: "RecipeEnergies");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecipeEnergies",
                table: "RecipeEnergies",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeEnergies",
                table: "RecipeEnergies");

            migrationBuilder.RenameTable(
                name: "RecipeEnergies",
                newName: "EnergyValues");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EnergyValues",
                table: "EnergyValues",
                column: "Id");
        }
    }
}
