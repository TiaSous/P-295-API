using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("t_category")]
public class CategoryEntity
{
    [Key]
    public int IdCategory { get; set; }

    [Required]
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;

    public ICollection<BookEntity> Books { get; set; } = new List<BookEntity>();
}