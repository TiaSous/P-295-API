<script setup>
import { ref } from 'vue'
const nom = ref()
const mdp = ref()

function OnSubmit(){
    console.log(nom.value + mdp.value)
} 
</script>

<template>
    <main>
        <h1>Connexion</h1>
        <form @submit.prevent="OnSubmit" class="review-form">
            <label for="nom">Nom: </label>
            <input class="nom" type="text" v-model="nom">
            <label for="motdepasse">Mot de passe: </label>
            <input class="motdepasse" type="password" v-model="mdp">

            <input class="button" type="submit" value="Submit">
        </form>
        <RouterLink to="/inscription">   
          Créer un compte
        </RouterLink>   
    </main>
</template>

<style scoped>
.review-form{
    display: flex;
    flex-direction: column;
}
.nom, .motdepasse, .button{
    width: 10%;
}
</style>