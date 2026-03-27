import { describe, expect, it, vi } from 'vitest';
import clientHttpMock from '../mocks/clientHttp';
import { getAllBooks } from '@/services/api/bookService';

vi.mock('@/services/clientHttp', () => ({ default: clientHttpMock }));

describe('bookService', () => {
  it('call /Book', () => async () => {
    clientHttpMock.get.mockResolvedValue({ data: [] });

    await getAllBooks();

    expect(clientHttpMock.get).toHaveBeenCalledWith('/Book');
  });
});
