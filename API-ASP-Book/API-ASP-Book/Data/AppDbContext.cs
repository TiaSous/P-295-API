using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<CategoryEntity> Categories => Set<CategoryEntity>();
    public DbSet<AuthorEntity> Authors => Set<AuthorEntity>();
    public DbSet<PublisherEntity> Publishers => Set<PublisherEntity>();
    public DbSet<UserEntity> Users => Set<UserEntity>();
    public DbSet<BookEntity> Books => Set<BookEntity>();
    public DbSet<CommentEntity> Comments => Set<CommentEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Appliquer les configurations Fluent API existantes
        modelBuilder.ApplyConfiguration(new BookConfiguration());
        modelBuilder.ApplyConfiguration(new CommentaireConfiguration());

        // ============================================================
        // SEED — Utilisateurs
        // ============================================================
        modelBuilder.Entity<UserEntity>().HasData(
            new UserEntity { IdUser = 1, Username = "alice_smith",  Password = "hashed_password_123", Role = "user"  },
            new UserEntity { IdUser = 2, Username = "bob_johnson",  Password = "hashed_password_456", Role = "user"  },
            new UserEntity { IdUser = 3, Username = "carol_white",  Password = "hashed_password_789", Role = "admin" },
            new UserEntity { IdUser = 4, Username = "david_brown",  Password = "hashed_password_101", Role = "user"  },
            new UserEntity { IdUser = 5, Username = "emma_davis",   Password = "hashed_password_202", Role = "user"  }
        );

        // ============================================================
        // SEED — Auteurs
        // ============================================================
        modelBuilder.Entity<AuthorEntity>().HasData(
            new AuthorEntity { IdAuthor = 1,  LastName = "Rowling",    FirstName = "J.K."           },
            new AuthorEntity { IdAuthor = 2,  LastName = "Tolkien",    FirstName = "J.R.R."         },
            new AuthorEntity { IdAuthor = 3,  LastName = "Martin",     FirstName = "George R.R."    },
            new AuthorEntity { IdAuthor = 4,  LastName = "Asimov",     FirstName = "Isaac"          },
            new AuthorEntity { IdAuthor = 5,  LastName = "Clarke",     FirstName = "Arthur C."      },
            new AuthorEntity { IdAuthor = 6,  LastName = "Austen",     FirstName = "Jane"           },
            new AuthorEntity { IdAuthor = 7,  LastName = "Orwell",     FirstName = "George"         },
            new AuthorEntity { IdAuthor = 8,  LastName = "Hemingway",  FirstName = "Ernest"         },
            new AuthorEntity { IdAuthor = 9,  LastName = "Fitzgerald", FirstName = "F. Scott"       },
            new AuthorEntity { IdAuthor = 10, LastName = "Christie",   FirstName = "Agatha"         }
        );

        // ============================================================
        // SEED — Catégories
        // ============================================================
        modelBuilder.Entity<CategoryEntity>().HasData(
            new CategoryEntity { IdCategory = 1,  Name = "Science-Fiction" },
            new CategoryEntity { IdCategory = 2,  Name = "Fantasy"         },
            new CategoryEntity { IdCategory = 3,  Name = "Mystère"         },
            new CategoryEntity { IdCategory = 4,  Name = "Romance"         },
            new CategoryEntity { IdCategory = 5,  Name = "Thriller"        },
            new CategoryEntity { IdCategory = 6,  Name = "Aventure"        },
            new CategoryEntity { IdCategory = 7,  Name = "Historique"      },
            new CategoryEntity { IdCategory = 8,  Name = "Biographie"      },
            new CategoryEntity { IdCategory = 9,  Name = "Poésie"          },
            new CategoryEntity { IdCategory = 10, Name = "Jeunesse"        }
        );

        // ============================================================
        // SEED — Éditeurs
        // ============================================================
        modelBuilder.Entity<PublisherEntity>().HasData(
            new PublisherEntity { IdPublisher = 1,  Name = "Bloomsbury Publishing"  },
            new PublisherEntity { IdPublisher = 2,  Name = "Allen & Unwin"          },
            new PublisherEntity { IdPublisher = 3,  Name = "Bantam Books"           },
            new PublisherEntity { IdPublisher = 4,  Name = "Doubleday"              },
            new PublisherEntity { IdPublisher = 5,  Name = "Penguin Books"          },
            new PublisherEntity { IdPublisher = 6,  Name = "Simon & Schuster"       },
            new PublisherEntity { IdPublisher = 7,  Name = "Hachette Book Group"    },
            new PublisherEntity { IdPublisher = 8,  Name = "Macmillan Publishers"   },
            new PublisherEntity { IdPublisher = 9,  Name = "Random House"           },
            new PublisherEntity { IdPublisher = 10, Name = "Éditions Gallimard"     }
        );

        // ============================================================
        // SEED — Livres
        // Note : les propriétés de navigation (User, Author, etc.)
        // ne sont pas renseignées — uniquement les FKs (contrainte HasData)
        // ============================================================
        modelBuilder.Entity<BookEntity>().HasData(
            new BookEntity
            {
                IdBook = 1, Title = "Harry Potter and the Philosopher's Stone",
                NbPage = 223, Resume = "Un jeune magicien découvre qu'il est un sorcier et commence ses études à Poudlard.",
                EditionYear = new DateTime(1997, 6, 26), Cover = "cover_hp1.jpg",
                Passage = "Chapter 1: The Boy Who Lived", Rating = 5,
                FkUser = 1, FkCategory = 2, FkAuthor = 1, FkPublisher = 1
            },
            new BookEntity
            {
                IdBook = 2, Title = "The Lord of the Rings: The Fellowship of the Ring",
                NbPage = 487, Resume = "Un groupe d'aventuriers entreprend un long voyage pour détruire un anneau magique.",
                EditionYear = new DateTime(1954, 7, 29), Cover = "cover_lotr1.jpg",
                Passage = "Chapter 1: A Long-expected Party", Rating = 5,
                FkUser = 2, FkCategory = 2, FkAuthor = 2, FkPublisher = 2
            },
            new BookEntity
            {
                IdBook = 3, Title = "A Game of Thrones",
                NbPage = 694, Resume = "Les nobles familles de Westeros se battent pour le trône du Fer dans un monde de magie et de politique.",
                EditionYear = new DateTime(1996, 8, 6), Cover = "cover_got1.jpg",
                Passage = "Prologue", Rating = 4,
                FkUser = 3, FkCategory = 2, FkAuthor = 3, FkPublisher = 3
            },
            new BookEntity
            {
                IdBook = 4, Title = "Foundation",
                NbPage = 255, Resume = "Un psychohistorien tente de sauver la civilisation galactique de l'effondrement imminent.",
                EditionYear = new DateTime(1951, 6, 1), Cover = "cover_foundation.jpg",
                Passage = "Chapter 1", Rating = 4,
                FkUser = 4, FkCategory = 1, FkAuthor = 4, FkPublisher = 4
            },
            new BookEntity
            {
                IdBook = 5, Title = "2001: A Space Odyssey",
                NbPage = 297, Resume = "Une mission spatiale révèle un mystère cosmique ancien et l'évolution de l'humanité.",
                EditionYear = new DateTime(1968, 4, 2), Cover = "cover_2001.jpg",
                Passage = "Part One: TMA-1", Rating = 5,
                FkUser = 1, FkCategory = 1, FkAuthor = 5, FkPublisher = 5
            },
            new BookEntity
            {
                IdBook = 6, Title = "Pride and Prejudice",
                NbPage = 279, Resume = "L'histoire d'amour entre Elizabeth Bennet et Mr Darcy dans l'Angleterre du XIXe siècle.",
                EditionYear = new DateTime(1813, 1, 28), Cover = "cover_pp.jpg",
                Passage = "Chapter 1", Rating = 5,
                FkUser = 2, FkCategory = 4, FkAuthor = 6, FkPublisher = 6
            },
            new BookEntity
            {
                IdBook = 7, Title = "1984",
                NbPage = 328, Resume = "Un roman dystopique où un gouvernement totalitaire contrôle chaque aspect de la vie.",
                EditionYear = new DateTime(1949, 6, 8), Cover = "cover_1984.jpg",
                Passage = "Part One, Chapter 1", Rating = 5,
                FkUser = 3, FkCategory = 5, FkAuthor = 7, FkPublisher = 7
            },
            new BookEntity
            {
                IdBook = 8, Title = "The Old Man and the Sea",
                NbPage = 127, Resume = "Un vieux pêcheur cubain lutte contre un grand marlin dans l'océan.",
                EditionYear = new DateTime(1952, 9, 1), Cover = "cover_omts.jpg",
                Passage = "Chapter 1", Rating = 4,
                FkUser = 4, FkCategory = 6, FkAuthor = 8, FkPublisher = 8
            },
            new BookEntity
            {
                IdBook = 9, Title = "The Great Gatsby",
                NbPage = 180, Resume = "L'histoire de Jay Gatsby et de son obsession pour une femme dans les années 1920.",
                EditionYear = new DateTime(1925, 4, 10), Cover = "cover_gg.jpg",
                Passage = "Chapter 1: In My Younger and More Vulnerable Years", Rating = 4,
                FkUser = 5, FkCategory = 4, FkAuthor = 9, FkPublisher = 9
            },
            new BookEntity
            {
                IdBook = 10, Title = "Murder on the Orient Express",
                NbPage = 256, Resume = "Hercule Poirot enquête sur un meurtre dans un train luxueux bloqué par la neige.",
                EditionYear = new DateTime(1934, 1, 1), Cover = "cover_mooe.jpg",
                Passage = "Chapter 1", Rating = 4,
                FkUser = 1, FkCategory = 3, FkAuthor = 10, FkPublisher = 10
            }
        );

        // ============================================================
        // SEED — Commentaires
        // ============================================================
        modelBuilder.Entity<CommentEntity>().HasData(
            new CommentEntity { IdComment = 1,  Content = "Excellent livre, très captivant!",                                    Rating = 5, FkBook = 1,  FkUser = 2 },
            new CommentEntity { IdComment = 2,  Content = "Les personnages sont bien développés et l'histoire est magique.",      Rating = 5, FkBook = 1,  FkUser = 3 },
            new CommentEntity { IdComment = 3,  Content = "Une œuvre maîtresse de la science-fiction.",                          Rating = 5, FkBook = 2,  FkUser = 4 },
            new CommentEntity { IdComment = 4,  Content = "Difficile à lire par endroits mais extraordinaire.",                  Rating = 4, FkBook = 2,  FkUser = 5 },
            new CommentEntity { IdComment = 5,  Content = "Un grand classique, vivement recommandé.",                            Rating = 5, FkBook = 3,  FkUser = 1 },
            new CommentEntity { IdComment = 6,  Content = "Incroyable, j'ai adoré chaque page.",                                 Rating = 5, FkBook = 4,  FkUser = 2 },
            new CommentEntity { IdComment = 7,  Content = "Un classique de la science-fiction, à lire absolument.",              Rating = 5, FkBook = 5,  FkUser = 3 },
            new CommentEntity { IdComment = 8,  Content = "Poétique et philosophique, simplement magnifique.",                   Rating = 5, FkBook = 6,  FkUser = 4 },
            new CommentEntity { IdComment = 9,  Content = "Un vrai chef-d'œuvre de la littérature.",                            Rating = 5, FkBook = 7,  FkUser = 5 },
            new CommentEntity { IdComment = 10, Content = "Court mais intense, très beau.",                                      Rating = 4, FkBook = 8,  FkUser = 1 },
            new CommentEntity { IdComment = 11, Content = "Fascinant portrait de l'amour et du rêve américain.",                 Rating = 4, FkBook = 9,  FkUser = 2 },
            new CommentEntity { IdComment = 12, Content = "Une intrigue palpitante du début à la fin.",                         Rating = 4, FkBook = 10, FkUser = 3 }
        );
    }
}