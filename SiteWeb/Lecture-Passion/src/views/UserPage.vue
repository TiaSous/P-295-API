<script setup>
import ListeCategorie from '../components/ListeCategorie.vue'
import { getLivreUser } from '@/services/BookService.mjs';
import { ref, onMounted } from 'vue'
import { decodeToken } from '@/tools/decodeToken.mjs';
import { getCommentaire } from '@/services/BookService.mjs';

const IsError401 = ref()
const token = ref()

const books = ref(null)
const listeLivres = ref([])
const nbCommentaires = ref(0)
const nbLivres = ref(0)

const props = defineProps({
  id: {
    required: true
  }
});

onMounted(async () => {
  await getLivreUser(props.id)
    .then((reponse) => {
      books.value = reponse.data
      listeLivres.value = books.value.data.rows
      IsError401.value = false
      const test = localStorage.getItem('token')
      token.value = decodeToken(test)
      nbLivres.value = listeLivres.value.length
    })
    .catch((error) => {
      if (error.message == "Request failed with status code 401") {
        IsError401.value = true
      }
    })
    getCommentaire(props.id).then((reponse) => {
      nbCommentaires.value = reponse.data.data.count
    }).catch((error) => {
      console.log(error)
    })
})

</script>

<template>
  <div v-if="books && token">
    <RouterLink to="/livre/add">
      <p v-if="props.id == token.userId">add book</p>
    </RouterLink>
    <p>Nombre de commentaires : {{ nbCommentaires }}</p>
    <p>Nombre de livre proposé : {{ nbLivres }}</p>
    <ListeCategorie :name="'Ouvrage proposé'" :livres="listeLivres"></ListeCategorie>
  </div>
  <div v-else-if="IsError401">
    <p>Vous n'êtes pas connecté !</p>
  </div>
  <div v-else>
    <p>Chargement</p>
  </div>
</template>