using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("t_publisher")]
public class PublisherEntity
{
    [Key]
    public int IdPublisher { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public ICollection<BookEntity> Books { get; set; } = new List<BookEntity>();
}