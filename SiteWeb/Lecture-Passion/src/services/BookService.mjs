import axios from 'axios'

const urlApi = "http://localhost:3000/api"


export function getLivres(limit = 3) {
    return axios.get(urlApi + '/livres', {
        params: {
            limit: limit,
            order: true
        }
    })
}

export function getAllLivre() {
    return axios.get('http://localhost:3000/api/livres', {
        params:{order: true}
    })
}

export function getLivreUser(id){
    const endpoint = `${urlApi}/user/${id}/livres`;
    return axios.get(endpoint, {headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
}   

export function getLivreId(id) {
    const endpoint = `${urlApi}/livres/${id}`;
    return axios.get(endpoint, {headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
}

export function login(name, mdp) {
    const endpoint = `${urlApi}/login`;
    return axios.post(endpoint, {
        params:{
            username: name,
            password: mdp
        }
    })
}

export function getCommentaire(id) {
    const endpoint = `${urlApi}/livres/${id}/commentaire`;
    return axios.get(endpoint)
}

export function addCommentaire (idBook, idUser, text, note)
{
    const endpoint = `${urlApi}/commentaires`;
    return axios.post(endpoint, {
        comAppreciation: note,
        comCommentaire: text,
        fk_ouvrage: idBook,
        fk_utilisateur: idUser
    })
}


export function addLivre (idBook, idUser, text, note)
{
    const endpoint = `${urlApi}/commentaires`;
    return axios.post(endpoint, {
        comAppreciation: note,
        comCommentaire: text,
        fk_ouvrage: idBook,
        fk_utilisateur: idUser
    })
}