<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';

const nom = ref();
const mdp = ref();
const userStore = useUserStore();

// lorsqu'il tente de se connecter
function OnSubmit() {
  userStore.login(nom.value, mdp.value);
}
</script>

<template>
  <h1>Connexion</h1>
  <form class="review-form" @submit.prevent="OnSubmit">
    <label for="nom">Nom: </label>
    <input v-model="nom" class="nom" type="text" />
    <label for="motdepasse">Mot de passe: </label>
    <input v-model="mdp" class="motdepasse" type="password" />

    <input class="button" type="submit" value="Submit" />
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
