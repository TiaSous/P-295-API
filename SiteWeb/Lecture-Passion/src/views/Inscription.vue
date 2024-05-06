<script setup>
import { ref } from 'vue'
const nom = ref()
const mdp = ref()
const pseudo = ref()

function OnSubmit(){
    // TODO
    
} 
</script>

<template>
        <h1>Inscription</h1>
        <form @submit.prevent="OnSubmit" class="review-form">
            <label for="pseudo">Pseudo: </label>
            <input class="pseudo" type="text" v-model="pseudo">

            <label for="nom">Nom: </label>
            <input class="nom" type="text" v-model="nom">
            <label for="motdepasse">Mot de passe: </label>
            <input class="motdepasse" type="password" v-model="mdp">

            <input class="button" type="submit" value="Submit">
        </form>
        <RouterLink to="/connection">   
          Connectez-vous
        </RouterLink>   
</template>

<style scoped>
.review-form{
    display: flex;
    flex-direction: column;
}
.nom, .motdepasse, .pseudo, .button{
    width: 10%;
}
</style>