<script setup>
import { getLivreId } from "@/services/BookService.mjs";
import { computed, onMounted, ref } from "vue";

const props = defineProps(["id"]);

const livre = ref("");
const id = computed(() => props.id);
onMounted(() => {
    getLivreId(id.value)
        .then((response) => {
            livre.value = response.data.data
        })
        .catch((error) => {
            console.log(error);
        });
});
</script>

<template>
    <div v-if="livre">
        <div class="detail-livre">
            <div>
                <img :src="'/' + livre.ouvCouverture" alt="couverture du livre">
                <RouterLink :to="{ name: 'user', params: { id: livre.t_utilisateur.id_utilisateur } }">
                    <p class="user-text">Publié par : {{ livre.t_utilisateur.utiPseudo }}</p>
                </RouterLink>
            </div>

            <div class="detail-livre-text">
                <p>Titre : {{ livre.ouvTitre }}</p>
                <p>Auteur : {{ livre.t_ecrivain.ecrPrenom }} {{ livre.t_ecrivain.ecrNom }}</p>
                <p>Catégorie : {{ livre.t_categorie.catNom }}</p>
                <p>Année édition : {{ livre.ouvAnneeEdition }}</p>
                <p>Éditeur : {{ livre.t_editeur.ediNom }}</p>
                <p>Nombre de pages : {{ livre.ouvNbPage }}</p>
                <p>Résumé : {{ livre.ouvResume }}</p>
                <p>Note : {{ livre.ouvMoyenneAppreciation }}</p>
            </div>

        </div>
    </div>
</template>

<style scoped>
img {
    height: 400px;
}

.detail-livre {
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
}

p {
    font-size: 20px;
    font-family: Inter-light;
}

.detail-livre-text {
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.user-text{
    font-size:medium;
}
</style>
