<script setup>
import AffichageLivre from '@/components/AffichageLivre.vue'
const props = defineProps({
    name: String,
    livres: Array
})
</script>

<template>
    <h2>{{ name }}</h2>
    <div v-if="livres.length <= 0">
        <p>Chargement</p>
    </div>
    <div v-else>
        <AffichageLivre v-for="livre in props.livres" :livre="livre"></AffichageLivre>
    </div>
</template>
