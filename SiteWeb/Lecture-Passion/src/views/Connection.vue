<script setup>
import { ref } from 'vue'
import { login } from '@/services/BookService.mjs';
import router from '@/router';
const nom = ref()
const mdp = ref()

function OnSubmit() {
    login(nom, mdp).then((response) => {
        localStorage.setItem("token", response.data.token)
        alert("vous êtes connecté")
        window.location.reload()
    }).catch(() => {
        alert("vous n'êtes pas connecté")
        console.log("test")
    })


} 
</script>

<template>
    <h1>Connexion</h1>
    <form @submit.prevent="OnSubmit" class="review-form">
        <label for="nom">Nom: </label>
        <input class="nom" type="text" v-model="nom">
        <label for="motdepasse">Mot de passe: </label>
        <input class="motdepasse" type="password" v-model="mdp">

        <input class="button" type="submit" value="Submit">
    </form>
</template>

<style scoped>
.review-form {
    display: flex;
    flex-direction: column;
}

.nom,
.motdepasse,
.button {
    width: 10%;
}
</style>