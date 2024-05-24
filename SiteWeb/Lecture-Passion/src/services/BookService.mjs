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


export function addLivre (body)
{
    const endpoint = `${urlApi}/livres`;
    return axios.post(endpoint, body, {headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}

export function getCategories() {
    const endpoint = `${urlApi}/categories`;
    return axios.get(endpoint)
}

export function getAllLivresCategorie(id) {
    const endpoint = `${urlApi}/categories/${id}/livres`;
    return axios.get(endpoint)
}

export function getCommentairesUser(id) {
    const endpoint = `${urlApi}/user/${id}/commentaires`;
    return axios.get(endpoint, {headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }})
}

export function getEditeurs() {
    const endpoint = `${urlApi}/editeurs`;
    return axios.get(endpoint)
}

export function getEcrivains(){
    const endpoint = `${urlApi}/ecrivains`;
    return axios.get(endpoint)
}