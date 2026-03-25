public static class BookMapping
{
    public static BookDto ToDto(this BookEntity book)
    {
        return new BookDto
        {
            Id = book.IdBook,
            Title = book.Title,
            AuthorId = book.FkAuthor,
            AuthorName = book.Author.FirstName + " " + book.Author.LastName,
            PublisherId = book.FkPublisher,
            PublisherName = book.Publisher.Name,
            CategoryId = book.FkCategory,
            CategoryName = book.Category.Name,
            EditionYear = (DateTime)book.EditionYear,
            Resume = book.Resume,
            NbPage = book.NbPage,
            Cover = book.Cover
        };
    }
}