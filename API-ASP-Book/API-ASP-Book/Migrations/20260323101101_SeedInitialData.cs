using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API_ASP_Book.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_t_book_t_author_FkAuthor",
                table: "t_book");

            migrationBuilder.DropForeignKey(
                name: "FK_t_book_t_category_FkCategory",
                table: "t_book");

            migrationBuilder.DropForeignKey(
                name: "FK_t_book_t_publisher_FkPublisher",
                table: "t_book");

            migrationBuilder.DropForeignKey(
                name: "FK_t_book_t_utilisateur_FkUser",
                table: "t_book");

            migrationBuilder.DropForeignKey(
                name: "FK_t_comment_t_utilisateur_FkUser",
                table: "t_comment");

            migrationBuilder.InsertData(
                table: "t_author",
                columns: new[] { "IdAuthor", "FirstName", "LastName" },
                values: new object[,]
                {
                    { 1, "J.K.", "Rowling" },
                    { 2, "J.R.R.", "Tolkien" },
                    { 3, "George R.R.", "Martin" },
                    { 4, "Isaac", "Asimov" },
                    { 5, "Arthur C.", "Clarke" },
                    { 6, "Jane", "Austen" },
                    { 7, "George", "Orwell" },
                    { 8, "Ernest", "Hemingway" },
                    { 9, "F. Scott", "Fitzgerald" },
                    { 10, "Agatha", "Christie" }
                });

            migrationBuilder.InsertData(
                table: "t_category",
                columns: new[] { "IdCategory", "Name" },
                values: new object[,]
                {
                    { 1, "Science-Fiction" },
                    { 2, "Fantasy" },
                    { 3, "Mystère" },
                    { 4, "Romance" },
                    { 5, "Thriller" },
                    { 6, "Aventure" },
                    { 7, "Historique" },
                    { 8, "Biographie" },
                    { 9, "Poésie" },
                    { 10, "Jeunesse" }
                });

            migrationBuilder.InsertData(
                table: "t_publisher",
                columns: new[] { "IdPublisher", "Name" },
                values: new object[,]
                {
                    { 1, "Bloomsbury Publishing" },
                    { 2, "Allen & Unwin" },
                    { 3, "Bantam Books" },
                    { 4, "Doubleday" },
                    { 5, "Penguin Books" },
                    { 6, "Simon & Schuster" },
                    { 7, "Hachette Book Group" },
                    { 8, "Macmillan Publishers" },
                    { 9, "Random House" },
                    { 10, "Éditions Gallimard" }
                });

            migrationBuilder.InsertData(
                table: "t_utilisateur",
                columns: new[] { "IdUser", "Password", "Role", "Username" },
                values: new object[,]
                {
                    { 1, "hashed_password_123", "user", "alice_smith" },
                    { 2, "hashed_password_456", "user", "bob_johnson" },
                    { 3, "hashed_password_789", "admin", "carol_white" },
                    { 4, "hashed_password_101", "user", "david_brown" },
                    { 5, "hashed_password_202", "user", "emma_davis" }
                });

            migrationBuilder.InsertData(
                table: "t_book",
                columns: new[] { "IdBook", "Cover", "EditionYear", "FkAuthor", "FkCategory", "FkPublisher", "FkUser", "NbPage", "Passage", "Rating", "Resume", "Title" },
                values: new object[,]
                {
                    { 1, "cover_hp1.jpg", new DateTime(1997, 6, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 2, 1, 1, 223, "Chapter 1: The Boy Who Lived", 5, "Un jeune magicien découvre qu'il est un sorcier et commence ses études à Poudlard.", "Harry Potter and the Philosopher's Stone" },
                    { 2, "cover_lotr1.jpg", new DateTime(1954, 7, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 2, 2, 2, 487, "Chapter 1: A Long-expected Party", 5, "Un groupe d'aventuriers entreprend un long voyage pour détruire un anneau magique.", "The Lord of the Rings: The Fellowship of the Ring" },
                    { 3, "cover_got1.jpg", new DateTime(1996, 8, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, 2, 3, 3, 694, "Prologue", 4, "Les nobles familles de Westeros se battent pour le trône du Fer dans un monde de magie et de politique.", "A Game of Thrones" },
                    { 4, "cover_foundation.jpg", new DateTime(1951, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 1, 4, 4, 255, "Chapter 1", 4, "Un psychohistorien tente de sauver la civilisation galactique de l'effondrement imminent.", "Foundation" },
                    { 5, "cover_2001.jpg", new DateTime(1968, 4, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, 1, 5, 1, 297, "Part One: TMA-1", 5, "Une mission spatiale révèle un mystère cosmique ancien et l'évolution de l'humanité.", "2001: A Space Odyssey" },
                    { 6, "cover_pp.jpg", new DateTime(1813, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, 4, 6, 2, 279, "Chapter 1", 5, "L'histoire d'amour entre Elizabeth Bennet et Mr Darcy dans l'Angleterre du XIXe siècle.", "Pride and Prejudice" },
                    { 7, "cover_1984.jpg", new DateTime(1949, 6, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, 5, 7, 3, 328, "Part One, Chapter 1", 5, "Un roman dystopique où un gouvernement totalitaire contrôle chaque aspect de la vie.", "1984" },
                    { 8, "cover_omts.jpg", new DateTime(1952, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, 6, 8, 4, 127, "Chapter 1", 4, "Un vieux pêcheur cubain lutte contre un grand marlin dans l'océan.", "The Old Man and the Sea" },
                    { 9, "cover_gg.jpg", new DateTime(1925, 4, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, 4, 9, 5, 180, "Chapter 1: In My Younger and More Vulnerable Years", 4, "L'histoire de Jay Gatsby et de son obsession pour une femme dans les années 1920.", "The Great Gatsby" },
                    { 10, "cover_mooe.jpg", new DateTime(1934, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 10, 3, 10, 1, 256, "Chapter 1", 4, "Hercule Poirot enquête sur un meurtre dans un train luxueux bloqué par la neige.", "Murder on the Orient Express" }
                });

            migrationBuilder.InsertData(
                table: "t_comment",
                columns: new[] { "IdComment", "Content", "FkBook", "FkUser", "Rating" },
                values: new object[,]
                {
                    { 1, "Excellent livre, très captivant!", 1, 2, 5 },
                    { 2, "Les personnages sont bien développés et l'histoire est magique.", 1, 3, 5 },
                    { 3, "Une œuvre maîtresse de la science-fiction.", 2, 4, 5 },
                    { 4, "Difficile à lire par endroits mais extraordinaire.", 2, 5, 4 },
                    { 5, "Un grand classique, vivement recommandé.", 3, 1, 5 },
                    { 6, "Incroyable, j'ai adoré chaque page.", 4, 2, 5 },
                    { 7, "Un classique de la science-fiction, à lire absolument.", 5, 3, 5 },
                    { 8, "Poétique et philosophique, simplement magnifique.", 6, 4, 5 },
                    { 9, "Un vrai chef-d'œuvre de la littérature.", 7, 5, 5 },
                    { 10, "Court mais intense, très beau.", 8, 1, 4 },
                    { 11, "Fascinant portrait de l'amour et du rêve américain.", 9, 2, 4 },
                    { 12, "Une intrigue palpitante du début à la fin.", 10, 3, 4 }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_t_book_t_author_FkAuthor",
                table: "t_book",
                column: "FkAuthor",
                principalTable: "t_author",
                principalColumn: "IdAuthor",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_t_book_t_category_FkCategory",
                table: "t_book",
                column: "FkCategory",
                principalTable: "t_category",
                principalColumn: "IdCategory",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_t_book_t_publisher_FkPublisher",
                table: "t_book",
                column: "FkPublisher",
                principalTable: "t_publisher",
                principalColumn: "IdPublisher",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_t_book_t_utilisateur_FkUser",
                table: "t_book",
                column: "FkUser",
                principalTable: "t_utilisateur",
                principalColumn: "IdUser",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_t_comment_t_utilisateur_FkUser",
                table: "t_comment",
                column: "FkUser",
                principalTable: "t_utilisateur",
                principalColumn: "IdUser",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_t_book_t_author_FkAuthor",
                table: "t_book");

            migrationBuilder.DropForeignKey(
                name: "FK_t_book_t_category_FkCategory",
                table: "t_book");

            migrationBuilder.DropForeignKey(
                name: "FK_t_book_t_publisher_FkPublisher",
                table: "t_book");

            migrationBuilder.DropForeignKey(
                name: "FK_t_book_t_utilisateur_FkUser",
                table: "t_book");

            migrationBuilder.DropForeignKey(
                name: "FK_t_comment_t_utilisateur_FkUser",
                table: "t_comment");

            migrationBuilder.DeleteData(
                table: "t_category",
                keyColumn: "IdCategory",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "t_category",
                keyColumn: "IdCategory",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "t_category",
                keyColumn: "IdCategory",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "t_category",
                keyColumn: "IdCategory",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "t_comment",
                keyColumn: "IdComment",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "t_comment",
                keyColumn: "IdComment",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "t_comment",
                keyColumn: "IdComment",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "t_comment",
                keyColumn: "IdComment",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "t_comment",
                keyColumn: "IdComment",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "t_comment",
                keyColumn: "IdComment",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "t_comment",
                keyColumn: "IdComment",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "t_comment",
                keyColumn: "IdComment",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "t_comment",
                keyColumn: "IdComment",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "t_comment",
                keyColumn: "IdComment",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "t_comment",
                keyColumn: "IdComment",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "t_comment",
                keyColumn: "IdComment",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "t_book",
                keyColumn: "IdBook",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "t_book",
                keyColumn: "IdBook",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "t_book",
                keyColumn: "IdBook",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "t_book",
                keyColumn: "IdBook",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "t_book",
                keyColumn: "IdBook",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "t_book",
                keyColumn: "IdBook",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "t_book",
                keyColumn: "IdBook",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "t_book",
                keyColumn: "IdBook",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "t_book",
                keyColumn: "IdBook",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "t_book",
                keyColumn: "IdBook",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "t_author",
                keyColumn: "IdAuthor",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "t_author",
                keyColumn: "IdAuthor",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "t_author",
                keyColumn: "IdAuthor",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "t_author",
                keyColumn: "IdAuthor",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "t_author",
                keyColumn: "IdAuthor",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "t_author",
                keyColumn: "IdAuthor",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "t_author",
                keyColumn: "IdAuthor",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "t_author",
                keyColumn: "IdAuthor",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "t_author",
                keyColumn: "IdAuthor",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "t_author",
                keyColumn: "IdAuthor",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "t_category",
                keyColumn: "IdCategory",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "t_category",
                keyColumn: "IdCategory",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "t_category",
                keyColumn: "IdCategory",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "t_category",
                keyColumn: "IdCategory",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "t_category",
                keyColumn: "IdCategory",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "t_category",
                keyColumn: "IdCategory",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "t_publisher",
                keyColumn: "IdPublisher",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "t_publisher",
                keyColumn: "IdPublisher",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "t_publisher",
                keyColumn: "IdPublisher",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "t_publisher",
                keyColumn: "IdPublisher",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "t_publisher",
                keyColumn: "IdPublisher",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "t_publisher",
                keyColumn: "IdPublisher",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "t_publisher",
                keyColumn: "IdPublisher",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "t_publisher",
                keyColumn: "IdPublisher",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "t_publisher",
                keyColumn: "IdPublisher",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "t_publisher",
                keyColumn: "IdPublisher",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "t_utilisateur",
                keyColumn: "IdUser",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "t_utilisateur",
                keyColumn: "IdUser",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "t_utilisateur",
                keyColumn: "IdUser",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "t_utilisateur",
                keyColumn: "IdUser",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "t_utilisateur",
                keyColumn: "IdUser",
                keyValue: 5);

            migrationBuilder.AddForeignKey(
                name: "FK_t_book_t_author_FkAuthor",
                table: "t_book",
                column: "FkAuthor",
                principalTable: "t_author",
                principalColumn: "IdAuthor",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_t_book_t_category_FkCategory",
                table: "t_book",
                column: "FkCategory",
                principalTable: "t_category",
                principalColumn: "IdCategory",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_t_book_t_publisher_FkPublisher",
                table: "t_book",
                column: "FkPublisher",
                principalTable: "t_publisher",
                principalColumn: "IdPublisher",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_t_book_t_utilisateur_FkUser",
                table: "t_book",
                column: "FkUser",
                principalTable: "t_utilisateur",
                principalColumn: "IdUser",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_t_comment_t_utilisateur_FkUser",
                table: "t_comment",
                column: "FkUser",
                principalTable: "t_utilisateur",
                principalColumn: "IdUser",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
