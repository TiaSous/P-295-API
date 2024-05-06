<script setup>
import ListeCategorie from '../components/ListeCategorie.vue'
import { getAllLivre } from '@/services/BookService.mjs';
import {ref, onMounted} from 'vue'

const books = ref(null)
const listeLivres = ref([])

onMounted(() => {
  getAllLivre()
    .then((reponse) => {
      books.value = reponse.data
      listeLivres.value = books.value.data.rows
      console.log(listeLivres.value)
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>
<template>
        <h1>Liste</h1>
        <ListeCategorie :name="'Roman'" :livres="listeLivres"></ListeCategorie>
        <ListeCategorie :name="'Aventure'" :livres="listeLivres"></ListeCategorie>
</template>

<style>
</style>
