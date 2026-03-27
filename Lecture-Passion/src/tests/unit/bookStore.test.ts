import { vi, describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { getAllBooks } from '../mocks/bookService';
import { useBookStore } from '@/stores/bookStore';

vi.mock('@/services/api/bookService', () => import('../mocks/bookService'));

describe('bookStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetchBooks load books', async () => {
    const fakeBooks = [{ id: 1, title: 'Clean Code' }];
    vi.mocked(getAllBooks).mockResolvedValue(fakeBooks as any);

    const store = useBookStore();
    await store.fetchBooks();

    expect(store.books).toEqual(fakeBooks);
    expect(store.isLoading).toBe(true);
  });
});
