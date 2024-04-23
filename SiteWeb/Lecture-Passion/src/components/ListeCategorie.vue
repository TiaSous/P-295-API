<script setup>
const props = defineProps({
    name: String,
    livres: Array
})
</script>

<template>
    <h2>{{ name }}</h2>
    <div class="liste-livres">
        <div v-for="livre in props.livres" class="livre">
            <RouterLink :to="{name: 'livre-details', params: {id: livre.id_ouvrage}}">
                <img :src="livre.ouvCouverture" alt="">
            </RouterLink>
            <p>{{ livre.ouvTitre }}</p>
            <p>{{ livre.ouvNote }}</p>
        </div>
    </div>
</template>

<style scoped>
.liste-livres{
    display: flex;
}
.livre{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>