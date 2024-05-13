<script setup>
import { addCommentaire, getCommentaire, getLivreId } from "@/services/BookService.mjs";
import { decodeToken } from "@/tools/decodeToken.mjs";
import { computed, onMounted, ref } from "vue";

const props = defineProps(["id"]);
const IsError401 = ref(false)

const livre = ref("");
const id = computed(() => props.id);
const commentaires = ref()

const note = ref()
const text = ref()

const token = ref()

function OnSubmit(){
    addCommentaire(id.value, token.value.userId, text.value, note.value)
} 
onMounted(() => {
    getLivreId(id.value)
        .then((response) => {
            livre.value = response.data.data
            IsError401.value = false
        })
        .catch((error) => {
            if (error.message == "Request failed with status code 401")
            {
                IsError401.value = true
            }
    });
    getCommentaire(id.value).then((response) => {
        console.log(response.data.data.rows)
        commentaires.value = response.data.data.rows;
    }).catch((error) => {
        console.log(error)
    });
    const test = localStorage.getItem('token')
    token.value = decodeToken(test)

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
        <div>
            <form @submit.prevent="OnSubmit" class="review-form">
            <label for="note">Note: </label>
            <input type="number" class="note" min="1" max="5" v-model="note" />
            <label for="text">Commentaire: </label>
            <input class="text" type="text" v-model="text">

            <input class="button" type="submit" value="Submit">
            </form>
        </div>
        <div>
            <div v-for="comentaire in commentaires">
            {{ comentaire.comCommentaire }}
            </div>
        </div>
    </div>
    <div v-else-if="IsError401">
        <p>Vous n'êtes pas connecté</p>
    </div>
    <div v-else>
        <p>Chargement</p>
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
