<script setup>
import ListeCategorie from '../components/ListeCategorie.vue'
import { getLivreUser } from '@/services/BookService.mjs';
import {ref, onMounted} from 'vue'

const books = ref(null)
const listeLivres = ref([])
const props = defineProps({
    id: {
        required: true
    }
})
onMounted(() => {
    getLivreUser(props.id)
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
    <ListeCategorie :name="'Ouvrage proposé'" :livres="listeLivres"></ListeCategorie>
</template>