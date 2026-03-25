using Microsoft.EntityFrameworkCore;

public class BookRepository : IBookRepository
{
    private readonly AppDbContext _context;

    public BookRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<BookEntity>> GetBooksAsync()
    {
        return await _context.Books.Include(b => b.Author)
                                   .Include(b => b.Publisher)
                                   .Include(b => b.Category)
                                   .ToListAsync();
    }
}