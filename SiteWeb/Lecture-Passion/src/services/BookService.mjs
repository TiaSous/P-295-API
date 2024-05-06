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
    return axios.get(endpoint)
}

export function getLivreId(id) {
    const endpoint = `${urlApi}/livres/${id}`;
    return axios.get(endpoint)
}