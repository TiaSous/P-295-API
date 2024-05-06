<script setup>
const props = defineProps({
    livre: Object
})
</script>

<template>
    <div class="livre">
        <RouterLink :to="{ name: 'livre-details', params: { id: livre.id_ouvrage } }">
            <img :src="'/'+livre.ouvCouverture" alt="couverture du livre">
        </RouterLink>
        <div class="livre-description">
            <div>
                <RouterLink :to="{ name: 'livre-details', params: { id: livre.id_ouvrage } }">
                    <h2>{{ livre.ouvTitre }}</h2>
                </RouterLink>
                <p>{{ livre.t_ecrivain.ecrPrenom }} {{ livre.t_ecrivain.ecrNom }}</p>
                <p>{{ livre.ouvMoyenneAppreciation }}</p>
            </div>
            <RouterLink :to="{ name: 'user', params: { id: livre.t_utilisateur.id_utilisateur } }">
                <p>Publié par : {{ livre.t_utilisateur.utiPseudo }}</p>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.livre {
    display: flex;
    padding: 10px;
    margin-bottom: 50px;
}

img {
    height: 150px;
}

.livre-description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 40px;
}
</style>