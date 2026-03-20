using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("t_author")]
public class AuthorEntity
{
    [Key]
    public int IdAuthor { get; set; }

    [Required]
    [MaxLength(100)]
    public string? LastName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? FirstName { get; set; } = string.Empty;

    public ICollection<BookEntity> Books { get; set; } = new List<BookEntity>();
}