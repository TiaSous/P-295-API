using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("t_book")]
public class BookEntity
{
    [Key]
    public int IdBook { get; set; }

    [Required]
    [MaxLength(255)]
    public string Title { get; set; } = string.Empty;
    public int? NbPage { get; set; }
    public string? Resume { get; set; }
    public DateTime? EditionYear { get; set; }
    public string? Cover { get; set; }
    public string? Passage { get; set; }
    public int? Rating { get; set; }

   
    public int FkUser { get; set; }
    public int FkCategory { get; set; }
    public int FkAuthor { get; set; }
    public int FkPublisher { get; set; }

    [ForeignKey(nameof(FkUser))]
    public UserEntity? User { get; set; }

    [ForeignKey(nameof(FkCategory))]
    public CategoryEntity? Category { get; set; }

    [ForeignKey(nameof(FkAuthor))]
    public AuthorEntity? Author { get; set; }

    [ForeignKey(nameof(FkPublisher))]
    public PublisherEntity? Publisher { get; set; }


    public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();
}