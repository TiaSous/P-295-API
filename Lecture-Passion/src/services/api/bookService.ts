import type { Book } from '@/model/bo/book';
import { mapToBook } from '../mapping/bookMapping';
import clientHttp from '@/services/clientHttp';

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await clientHttp.get('/Book');
  const books: Book[] = response.data.map(mapToBook);
  return books;
};

export const getBookById = async (id: number): Promise<Book> => {
  const response = await clientHttp.get(`/api/livres/${id}`);
  const book: Book = mapToBook(response.data.data);
  return book;
};
