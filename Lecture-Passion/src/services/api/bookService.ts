import { Book } from '@/model/bo/book';
import { getBookParams } from '@/model/dto/bookDto';
import { mapToBook } from '../mapping/bookMapping';
import clientHttp from '@/services/clientHttp';

export const getAllBooks = async (params?: getBookParams): Promise<Book[]> => {
  const response = await clientHttp.get('/api/livres', {
    params: {
      page: params?.page,
      limit: params?.limit,
      offset: params?.offset,
      titre: params?.titre,
    },
  });
  const books: Book[] = response.data.data.map(mapToBook);
  return books;
};

export const getBookById = async (id: number): Promise<Book> => {
  const response = await clientHttp.get(`/api/livres/${id}`);
  const book: Book = mapToBook(response.data.data);
  return book;
};
