import { Book } from '@/model/bo/book';

export const mapToBook = (apiData: any): Book => {
  return {
    id_ouvrage: apiData.id_ouvrage,
    ouvTitre: apiData.ouvTitre,
    ouvNbPage: apiData.ouvNbPage,
    ouvResume: apiData.ouvResume,
    ouvAnneeEdition: new Date(apiData.ouvAnneeEdition),
    ouvCouverture: apiData.ouvCouverture,
    ouvExtrait: apiData.ouvExtrait,
    ouvMoyenneAppreciation: apiData.ouvMoyenneAppreciation,
    user: apiData.Utilisateur
      ? {
          id_user: apiData.Utilisateur.id_utilisateur,
          utiPseudo: apiData.Utilisateur.utiPseudo,
        }
      : null,
    categorie: apiData.Categorie?.catNom || '',
    ecrivain: apiData.Ecrivain
      ? {
          id_ecrivain: apiData.Ecrivain.id_ecrivain,
          ecrNom: apiData.Ecrivain.ecrNom,
          ecrPrenom: apiData.Ecrivain.ecrPrenom,
        }
      : null,
    editeur: apiData.Editeur?.ediNom || '',
  };
};
