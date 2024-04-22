<script setup>
import ListeCategorie from '@/components/ListeCategorie.vue';
const listeLivres = [{id:1,titre: "Harry", note: 4.5, couv: "/Harry-potter-a-l-ecole-des-sorciers 1.png"}, {id:2,titre: "Harry", note: 4.5, couv: "/Harry-potter-a-l-ecole-des-sorciers 1.png"}]

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
