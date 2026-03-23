import { Book } from '@/model/bo/book';

export const mapToBook = (apiData: any): Book => {
  return {
    id: apiData.id,
    title: apiData.title,
    nbPage: apiData.nbPage,
    resume: apiData.resume,
    editionYear: new Date(apiData.editionYear),
    cover: apiData.cover,
    category: apiData.categoryName,
    author: {
      id: apiData.authorId,
      name: apiData.authorName,
    },
    publisher: apiData.publisherName,
  };
};
