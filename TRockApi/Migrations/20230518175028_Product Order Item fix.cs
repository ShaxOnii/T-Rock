using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TRockApi.Migrations
{
    /// <inheritdoc />
    public partial class ProductOrderItemfix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Qunatity",
                table: "ProductOrderItems",
                newName: "Quantity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "ProductOrderItems",
                newName: "Qunatity");
        }
    }
}
