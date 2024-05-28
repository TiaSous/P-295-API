<script setup>
import ListeCategorie from '@/components/ListeCategorie.vue'
import { getLivres } from '@/services/BookService.mjs'
import { ref, onMounted } from 'vue'

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
  <div class="container">
    <main>
      <div class="sidebar">
      </div>
      <div class="content">
        <section class="Bienvenue">
          <h1>Bienvenue !</h1>
          <div class="site-description">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aspernatur possimus odio quo omnis mollitia atque non aliquam fugiat alias, autem est quia nam voluptatem provident quaerat. Ipsam, fugit. Cupiditate.
            </p>
          </div>
        </section>
        <ListeCategorie :name="'Dernière Sortie'" :livres="listeLivres" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 500px;
}
main {
  flex-grow: 1;
  display: flex;
  width: 100%;
}

.sidebar {
  background-color: rgb(76, 175, 80); 
  padding: 20px;
  width: 300px;
  
}

.content {
  flex-grow: 1;
  background-color: #fff;
  padding: 20px;
  box-shadow: -1px 0 4px rgba(0,0,0,0.1);
}

footer {
  background-color: #fff;
  text-align: center;
  padding: 10px;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
}

h1, h2 {
  color: rgb(76, 175, 80);
}

p {
  color: rgb(76, 175, 80);
  line-height: 1.6;
}

.ListeCategorie {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
