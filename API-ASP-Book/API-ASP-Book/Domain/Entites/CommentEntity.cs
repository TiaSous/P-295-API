using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("t_comment")]
public class CommentEntity
{
    [Key]
    public int IdComment { get; set; }

    [Required]
    public string Content { get; set; } = string.Empty;

    [Required]
    [Range(1, 5)]
    public int Rating { get; set; }

    public int FkBook { get; set; }
    public int FkUser { get; set; }

    [ForeignKey(nameof(FkBook))]
    public BookEntity? Book { get; set; }
    [ForeignKey(nameof(FkUser))]
    public UserEntity? User { get; set; }
}