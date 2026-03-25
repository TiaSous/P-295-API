using MediatR;

public class GetBooksQuery : IRequest<IEnumerable<BookDto>>
{
}