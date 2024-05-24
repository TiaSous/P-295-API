<script setup>
import { addLivre } from '@/services/BookService.mjs';
import { getCategories, getEditeurs, getEcrivains } from '@/services/BookService.mjs';
import { decodeToken } from '@/tools/decodeToken.mjs';
import { onMounted, ref } from 'vue';

const IsError401 = ref()

const titre = ref()
const nbPage = ref()
const resume = ref()
const date = ref()
const extrait = ref()
const categorie = ref()
const ecrivain = ref()
const editeur = ref()

const utilisateurId = ref()

const token = ref()

const allCategories = ref()
const allEditeurs = ref()
const allEcrivains = ref()

const exist = ref(false)

onMounted(() => {

    getCategories().then((response) => {
        IsError401.value = false
        allCategories.value = response.data.data
        const test = localStorage.getItem('token')
        token.value = decodeToken(test)
        utilisateurId.value = token.value.userId
    }).catch((error) => {
        if (error.message == "Request failed with status code 401") {
            IsError401.value = true
        }
        console.log(error)
    })

    getEditeurs().then((response) => {
        allEditeurs.value = response.data.data
    }).catch((error) => {
        console.log(error)
    })

    getEcrivains().then((response) => {
        allEcrivains.value = response.data.data
    }).catch((error) => {
        console.log(error)
    })
})


async function Submit() {
    const body = {
        ouvTitre: titre.value,
        ouvNbPage: nbPage.value,
        ouvResume: resume.value,
        ouvAnneeEdition: date.value,
        ouvCouverture: 'default.jpg',
        ouvExtrait: extrait.value,
        fk_utilisateur: utilisateurId.value,
        fk_categorie: categorie.value,
        fk_ecrivain: ecrivain.value,
        fk_editeur: editeur.value
    }
    addLivre(body);
}

</script>
<template>
    <form v-if="!IsError401" @submit.prevent="Submit" class="review-form">
        <label for="titre">Titre: </label>
        <input type="text" v-model="titre">
        <label for="nbPage">Nombre de page: </label>
        <input type="number" min="1" v-model="nbPage" />
        <label for="resume">Resume: </label>
        <input type="text" v-model="resume">
        <label for="date">Date: </label>
        <input type="date" v-model="date">
        <label for="extrait">Extrait: </label>
        <input type="text" v-model="extrait">
        <label for="categorie">Categorie: </label>
        <select name="" id="" v-model="categorie">
            <option disabled selected>Choisissez un catégorie</option>
            <option v-for="categorie in allCategories" :value="categorie.id_categorie">{{ categorie.catNom }}</option>
        </select>
        <label for="ecrivain">Ecrivain: </label>
        <select name="" id="" v-model="ecrivain">
            <option disabled selected>Choisissez un écrivain</option>
            <option v-for="ecrivain in allEcrivains" :value="ecrivain.id_ecrivain">{{ ecrivain.ecrPrenom }} {{ ecrivain.ecrNom }}</option>
        </select>
        <label for="editeur">Editeur: </label>
        <select name="" id="" v-model="editeur">
            <option disabled selected>Choisissez un éditeur</option>
            <option v-for="editeur in allEditeurs" :value="editeur.id_editeur">{{ editeur.ediNom }}</option>
        </select>
        <input class="button" type="submit" value="Submit">
    </form>
    <div v-else>
        Vous n'êtes pas connecté !
    </div>
</template>

<style scoped>
.review-form {
    display: flex;
    flex-direction: column;
}
</style>