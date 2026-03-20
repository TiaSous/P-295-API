import { Book } from '@/model/bo/book';
import { getBookParams } from '@/model/dto/bookDto';
import { getAllBooks } from '@/services/api/bookService';
import { defineStore } from 'pinia';

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [] as Book[],
    isLoading: false,
  }),
  actions: {
    async fetchBooks(params?: getBookParams) {
      this.isLoading = true;
      const books = await getAllBooks(params);
      this.books = books;
      this.isLoading = false;
    },
  },
});
