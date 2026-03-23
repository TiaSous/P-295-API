import { Book } from '@/model/bo/book';
import { getAllBooks } from '@/services/api/bookService';
import { defineStore } from 'pinia';

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [] as Book[],
    isLoading: false,
  }),
  actions: {
    async fetchBooks() {
      this.isLoading = true;
      const books = await getAllBooks();
      this.books = books;
      this.isLoading = false;
    },
  },
});
