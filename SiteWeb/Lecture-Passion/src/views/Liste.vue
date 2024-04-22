<script setup>
import ListeCategorie from '../components/ListeCategorie.vue'

const listeLivres = [{id:13,titre: "Harry", note: 4.5, couv: "/Harry-potter-a-l-ecole-des-sorciers 1.png"}, {id:13,titre: "Harry", note: 4.5, couv: "/Harry-potter-a-l-ecole-des-sorciers 1.png"}]
</script>
<template>
    <main>
        <h1>Liste</h1>
        <ListeCategorie :name="'Roman'" :livres="listeLivres"></ListeCategorie>
        <ListeCategorie :name="'Aventure'" :livres="listeLivres"></ListeCategorie>
    </main>
</template>

<style>
</style>
