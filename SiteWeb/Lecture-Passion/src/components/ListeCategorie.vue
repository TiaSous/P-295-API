<script setup>
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
        <div class="liste-livres">
            <div v-for="livre in props.livres" class="livre">
                <RouterLink :to="{ name: 'livre-details', params: { id: livre.id_ouvrage } }">
                    <img :src="livre.ouvCouverture" alt="">
                </RouterLink>
                <p>{{ livre.ouvTitre }}</p>
                <p>{{ livre.t_ecrivain.ecrPrenom }} {{ livre.t_ecrivain.ecrNom }}</p>
                <RouterLink :to="{name: 'user', params: {id: livre.t_utilisateur.id_utilisateur}}">
                    <p>{{ livre.t_utilisateur.utiPseudo }}</p>
                </RouterLink>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
.liste-livres {
    display: flex;
}

.livre {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>