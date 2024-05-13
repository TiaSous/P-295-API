<script setup>
import { ref } from 'vue';

const titre = ref()
const nbPage = ref()
const resume = ref()
const date = ref()
const couverture = ref()
const extrait = ref()
const categorie = ref()
const ecrivain = ref()
const editeur = ref()

function couvChange()
{
}

function Submit()
{
    
}
</script>
<template>
    <form @submit.prevent="Submit" class="review-form">
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
            <label for="couverture">Couverture: </label>
            <input type="file" accept="image/png, image/jpeg" @change="couvChange">
            <label for="extrait">Extrait: </label>
            <input type="text" v-model="extrait">
            <label for="categorie">Categorie: </label>
            <input type="text" v-model="categorie">
            <label for="ecrivain">Ecrivain: </label>
            <input type="text" v-model="ecrivain">
            <label for="editeur">Editeur: </label>
            <input type="text" v-model="editeur">
            <input class="button" type="submit" value="Submit">
    </form>
</template>

<style scoped>
.review-form{
    display: flex;
    flex-direction: column;
}
</style>