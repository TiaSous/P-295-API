using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("t_utilisateur")]
public class UserEntity
{
    [Key]
    public int IdUser { get; set; }

    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Password { get; set; } = string.Empty;

    [Required]
    public string Role { get; set; } = "user";

    public ICollection<BookEntity> Books { get; set; } = new List<BookEntity>();
    public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();
}