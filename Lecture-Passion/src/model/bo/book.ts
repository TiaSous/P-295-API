import { Author } from './author';

export class Book {
  id: number;
  title: string;
  nbPage: number;
  resume: string;
  editionYear: Date;
  cover: string;
  category: string;
  author: Author;
  publisher: string;
}
