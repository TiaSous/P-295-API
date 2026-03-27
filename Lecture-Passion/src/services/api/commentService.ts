import clientHttp from '@/services/clientHttp';
import type { Comment } from '@/model/bo/comment';

export const getComment = async (id) => {
  const result = await clientHttp.get('/api/commentaires/' + id);
  const comments: Comment[] = result.data.data.map((comment) => {
    return {
      id_commentaire: comment.id_commentaire,
      comAppreciation: comment.comAppreciation,
      comCommentaire: comment.comCommentaire,
      user: comment.Utilisateur,
      bookId: comment.fk_ouvrage,
    };
  });
  return comments;
};

export const addComment = async (idBook: number, text: string, note: number) => {
  await clientHttp.post('/api/commentaires', {
    comAppreciation: note,
    comCommentaire: text,
    fk_ouvrage: idBook,
  });
};
