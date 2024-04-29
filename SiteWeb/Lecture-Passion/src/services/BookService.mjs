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
    return axios.get(urlApi + '/livres', {
        params: {
            order: true
        }
    })
}