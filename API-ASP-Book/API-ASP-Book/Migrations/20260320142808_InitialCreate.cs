using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_ASP_Book.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "t_author",
                columns: table => new
                {
                    IdAuthor = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    LastName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FirstName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_author", x => x.IdAuthor);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "t_category",
                columns: table => new
                {
                    IdCategory = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_category", x => x.IdCategory);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "t_publisher",
                columns: table => new
                {
                    IdPublisher = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_publisher", x => x.IdPublisher);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "t_utilisateur",
                columns: table => new
                {
                    IdUser = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Role = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_utilisateur", x => x.IdUser);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "t_book",
                columns: table => new
                {
                    IdBook = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NbPage = table.Column<int>(type: "int", nullable: true),
                    Resume = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EditionYear = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Cover = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Passage = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Rating = table.Column<int>(type: "int", nullable: true),
                    FkUser = table.Column<int>(type: "int", nullable: false),
                    FkCategory = table.Column<int>(type: "int", nullable: false),
                    FkAuthor = table.Column<int>(type: "int", nullable: false),
                    FkPublisher = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_book", x => x.IdBook);
                    table.ForeignKey(
                        name: "FK_t_book_t_author_FkAuthor",
                        column: x => x.FkAuthor,
                        principalTable: "t_author",
                        principalColumn: "IdAuthor",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_t_book_t_category_FkCategory",
                        column: x => x.FkCategory,
                        principalTable: "t_category",
                        principalColumn: "IdCategory",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_t_book_t_publisher_FkPublisher",
                        column: x => x.FkPublisher,
                        principalTable: "t_publisher",
                        principalColumn: "IdPublisher",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_t_book_t_utilisateur_FkUser",
                        column: x => x.FkUser,
                        principalTable: "t_utilisateur",
                        principalColumn: "IdUser",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "t_comment",
                columns: table => new
                {
                    IdComment = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    FkBook = table.Column<int>(type: "int", nullable: false),
                    FkUser = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_comment", x => x.IdComment);
                    table.ForeignKey(
                        name: "FK_t_comment_t_book_FkBook",
                        column: x => x.FkBook,
                        principalTable: "t_book",
                        principalColumn: "IdBook",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_t_comment_t_utilisateur_FkUser",
                        column: x => x.FkUser,
                        principalTable: "t_utilisateur",
                        principalColumn: "IdUser",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_t_book_FkAuthor",
                table: "t_book",
                column: "FkAuthor");

            migrationBuilder.CreateIndex(
                name: "IX_t_book_FkCategory",
                table: "t_book",
                column: "FkCategory");

            migrationBuilder.CreateIndex(
                name: "IX_t_book_FkPublisher",
                table: "t_book",
                column: "FkPublisher");

            migrationBuilder.CreateIndex(
                name: "IX_t_book_FkUser",
                table: "t_book",
                column: "FkUser");

            migrationBuilder.CreateIndex(
                name: "IX_t_comment_FkBook",
                table: "t_comment",
                column: "FkBook");

            migrationBuilder.CreateIndex(
                name: "IX_t_comment_FkUser",
                table: "t_comment",
                column: "FkUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "t_comment");

            migrationBuilder.DropTable(
                name: "t_book");

            migrationBuilder.DropTable(
                name: "t_author");

            migrationBuilder.DropTable(
                name: "t_category");

            migrationBuilder.DropTable(
                name: "t_publisher");

            migrationBuilder.DropTable(
                name: "t_utilisateur");
        }
    }
}
