<script setup>
import { getAllLivresCategorie } from '@/services/BookService.mjs';
import { ref, onMounted } from 'vue';
import ListeCategorie from '../components/ListeCategorie.vue'

const books = ref(null)
const listeLivres = ref([])

const props = defineProps({
    id: {
        required: true
    }
});

onMounted(() => {
    getAllLivresCategorie(props.id)
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
    <ListeCategorie v-if="listeLivres.length > 0" :name="props.name" :livres="listeLivres"></ListeCategorie>
</template>