public interface IBookRepository
{
    Task<IEnumerable<BookEntity>> GetBooksAsync();
}