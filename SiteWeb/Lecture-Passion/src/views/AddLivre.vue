<script setup>
import { getLivreId } from '@/services/BookService.mjs';
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

const exist = ref(false)

onMounted(() => {
    getLivreId(1)
        .then((response) => {
            livre.value = response.data.data
            IsError401.value = false
        })
        .catch((error) => {
            if (error.message == "Request failed with status code 401") {
                IsError401.value = true
            }
        });
})


async function Submit() {

}
</script>
<template>
    <form v-if="!IsError401" @submit.prevent="Submit" class="review-form">
        <!-- <label for="note">Note: </label>
            <input type="number" class="note" min="1" max="5" v-model="" />
            <label for="text">Commentaire: </label>
            <input class="text" type="text" v-model=""> -->
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
        <select name="" id="">
            <option disabled selected>Choisissez un catégorie</option>
            <option value=""></option>
            <option value=""></option>
        </select>
        <label for="ecrivain">Ecrivain: </label>
        <select name="" id="">
            <option disabled selected>Choisissez un écrivain</option>
            <option value=""></option>
            <option value=""></option>
        </select>
        <label for="editeur">Editeur: </label>
        <select name="" id="">
            <option disabled selected>Choisissez un éditeur</option>
            <option value=""></option>
            <option value=""></option>
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