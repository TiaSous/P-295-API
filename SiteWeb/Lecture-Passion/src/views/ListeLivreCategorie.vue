<script setup>
import { getAllLivresCategorie } from '@/services/BookService.mjs';
import { ref, onMounted } from 'vue';
import ListeCategorie from '../components/ListeCategorie.vue'

const books = ref(null)
const listeLivres = ref([])

// id de la catégorie
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
    <ListeCategorie v-if="listeLivres.length > 0" :name="listeLivres[0].t_categorie.catNom" :livres="listeLivres"></ListeCategorie>
    <div v-else>Aucun livre dans cette catégorie</div>
</template>