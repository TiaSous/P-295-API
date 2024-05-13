<script setup>
import { getCategories } from '@/services/BookService.mjs';
import { ref, onMounted } from 'vue'

const categories = ref()

onMounted(() => {
  getCategories().then((reponse) => {
    categories.value = reponse.data.data
  }).catch((error) => {
    console.log(error)
  })
})
</script>
<template>
  <h1>Liste des catégories</h1>
  <div v-for="categorie in categories">
    <RouterLink :to="{ name: 'livre-categorie', params: { id: categorie.id_categorie } }">
      <p>{{ categorie.catNom }}</p>
    </RouterLink>
  </div>
  
</template>

<style></style>
