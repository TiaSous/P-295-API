<script setup>
import { addCommentaire, getCommentaire, getLivreId, updateLivre } from "@/services/BookService.mjs";
import { decodeToken } from "@/tools/decodeToken.mjs";
import { computed, onMounted, ref } from "vue";


const props = defineProps(["id"]) // id du livre
const IsError401 = ref() // si pas de token

const livre = ref("");
const id = computed(() => props.id)
const commentaires = ref()

const note = ref()
const text = ref()

const token = ref()

const moyenneNote = ref();

// losrqu'il ajoute un commentaire
function OnSubmit() {
    addCommentaire(id.value, token.value.userId, text.value, note.value)
    if(commentaires.value){
        moyenneNote.value = (commentaires.value.reduce((sum, note) => sum + note.comAppreciation, 0) + note.value) / (commentaires.value.length + 1)
    }
    else
    {
        moyenneNote.value = note.value
    }
    updateLivre(id.value,{ ouvMoyenneAppreciation: Math.round(moyenneNote.value) })

}

// va récupérer le selon l'id et les commentaires liées
onMounted(async () => {
    await getLivreId(id.value)
        .then((response) => {
            livre.value = response.data.data
            IsError401.value = false
        })
        .catch((error) => {
            if (error.message == "Request failed with status code 401") {
                IsError401.value = true
            }
        });

    if (IsError401.value == false) {
        getCommentaire(id.value).then((response) => {
            commentaires.value = response.data.data.rows;
        }).catch((error) => {
            console.log(error)
        });
        const test = localStorage.getItem('token')
        token.value = decodeToken(test)
    }


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
            <form @submit="OnSubmit" class="review-form">
                <label for="note">Note: </label>
                <input required type="number" class="note" min="0" max="5" v-model="note" />
                <label for="text">Commentaire: </label>
                <input required class="text" type="text" v-model="text"  maxlength="255"  >

                <input class="button" type="submit" value="Submit">
            </form>
        </div>
        <div>
            <br>
            <div v-for="commentaire in commentaires">
                note : {{ commentaire.comAppreciation }} <br>
                Commentaire : {{ commentaire.comCommentaire }}
                <br>
                <RouterLink :to="{ name: 'user', params: { id: commentaire.fk_utilisateur } }">
                    <p class="user-text">Publié par : {{ commentaire.t_utilisateur.utiPseudo }}</p>
                </RouterLink>
                <br>
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

.user-text {
    font-size: medium;
}
</style>
