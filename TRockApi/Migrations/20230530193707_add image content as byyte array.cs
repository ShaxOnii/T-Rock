using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TRockApi.Migrations
{
    /// <inheritdoc />
    public partial class addimagecontentasbyytearray : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Content",
                table: "Images",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "Images");
        }
    }
}
