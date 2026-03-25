public class BookDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int AuthorId { get; set; }
    public string? AuthorName { get; set; } = string.Empty;
    public int PublisherId { get; set; }
    public string? PublisherName { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public string? CategoryName { get; set; } = string.Empty;
    public DateTime? EditionYear { get; set; }
    public string? Resume { get; set; } = string.Empty;
    public int? NbPage { get; set; }
    public string? Cover { get; set; } = string.Empty;

}