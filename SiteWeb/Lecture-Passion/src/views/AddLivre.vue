<script setup>
import { addLivre } from '@/services/BookService.mjs';
import { getCategories, getEditeurs, getEcrivains } from '@/services/BookService.mjs';
import { decodeToken } from '@/tools/decodeToken.mjs';
import { onMounted, ref } from 'vue';

const IsError401 = ref()

// tous les champs du livres
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

const today = ref(new Date())

// va récupérer la liste des catégories, des éditeurs et écrivains
onMounted(() => {
    getEditeurs().then((response) => {
        IsError401.value = false
        allEditeurs.value = response.data.data
        const test = localStorage.getItem('token')
        token.value = decodeToken(test)
        utilisateurId.value = token.value.userId
    }).catch((error) => {
        if (error.message == "Request failed with status code 401") {
            IsError401.value = true
        }
        console.log(error)
    })

    getCategories().then((response) => {
        allCategories.value = response.data.data
    }).catch((error) => {
        console.log(error)
    })

    getEcrivains().then((response) => {
        allEcrivains.value = response.data.data
    }).catch((error) => {
        console.log(error)
    })

    let dd = today.value.getDate()
    let mm = today.value.getMonth() + 1
    let yyyy = today.value.getFullYear()

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today.value = yyyy + '-' + mm + '-' + dd
    document.getElementById("datefield").setAttribute("max", today.value)
})

// lorsqu'il ajoute un livre
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
    await addLivre(body).then(() => {
        alert("Le livre a été ajouté")
    }).catch(() => {
        alert("Le livre n'a pas pu être ajouté")
    });
    window.location.reload()
}

</script>
<template>
    <form v-if="!IsError401" @submit.prevent="Submit" class="review-form">
        <label for="titre">Titre: </label>
        <input type="text" required v-model="titre" maxlength="50">
        <label for="nbPage">Nombre de page: </label>
        <input type="number" min="1" v-model="nbPage" />
        <label for="resume">Resume: </label>
        <input type="text" v-model="resume" maxlength="255">
        <label for="date">Date: </label>
        <input required id="datefield" type="date" v-model="date">
        <label for="extrait">Extrait: </label>
        <input type="text" v-model="extrait" maxlength="255">
        <label for="categorie">Categorie: </label>
        <select required name="" id="" v-model="categorie">
            <option disabled selected>Choisissez un catégorie</option>
            <option v-for="categorie in allCategories" :value="categorie.id_categorie">{{ categorie.catNom }}</option>
        </select>
        <label for="ecrivain">Ecrivain: </label>
        <select required name="" id="" v-model="ecrivain">
            <option disabled selected>Choisissez un écrivain</option>
            <option v-for="ecrivain in allEcrivains" :value="ecrivain.id_ecrivain">{{ ecrivain.ecrPrenom }} {{
        ecrivain.ecrNom }}</option>
        </select>
        <label for="editeur">Editeur: </label>
        <select required name="" id="" v-model="editeur">
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