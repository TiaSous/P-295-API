<script setup>
import ListeCategorie from '@/components/ListeCategorie.vue'
import {getLivres} from '@/services/BookService.mjs'
import {ref, onMounted} from 'vue'

const books = ref(null)
const listeLivres = ref([]) // Initialisez listeLivres avec un tableau vide

// Connexion à l'API au moment du montage du composant
onMounted(() => {
  getLivres(5)
    .then((reponse) => {
      books.value = reponse.data
      listeLivres.value = books.value.data.rows
    })
    .catch((error) => {
      console.log(error)
    })
})

</script>

<template>
  <main>
    <h1>Bienvenu !</h1>
    <h2>Description</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Eaque aspernatur possimus odio quo omnis mollitia atque non aliquam fugiat alias, 
      autem est quia nam voluptatem provident quaerat. Ipsam, fugit. Cupiditate.
    </p>
    <ListeCategorie :name="'Dernière Sortie'" :livres="listeLivres"></ListeCategorie>
    
  </main>
</template>