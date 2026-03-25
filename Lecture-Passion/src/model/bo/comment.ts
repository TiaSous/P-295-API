import { User } from './user';

export class Comment {
  id_commentaire: number;
  comAppreciation: number;
  comCommentaire: string;
  user: User;
  bookId: number;
}
