import { Author } from './author';
import { User } from './user';

export class Book {
  id_ouvrage: number;
  ouvTitre: string;
  ouvNbPage: number;
  ouvResume: string;
  ouvAnneeEdition: Date;
  ouvCouverture: string;
  ouvExtrait: string;
  ouvMoyenneAppreciation: number;
  user: User;
  categorie: string;
  ecrivain: Author;
  editeur: string;
}
