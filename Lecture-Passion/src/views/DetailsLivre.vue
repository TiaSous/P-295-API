<script setup lang="ts">
import { Book } from '@/model/bo/book';
import type { Comment } from '@/model/bo/comment';
import { getBookById } from '@/services/api/bookService.js';
import { addComment, getComment } from '@/services/api/commentService';
import { useUserStore } from '@/stores/userStore';
import { computed, onMounted, ref } from 'vue';

const props = defineProps(['id']);

const userStore = useUserStore();

 // id du livre

const livre = ref(new Book());
const id = computed(() => parseInt(props.id));
const commentaires = ref(new Array<Comment>());

const note = ref();
const text = ref();

// losrqu'il ajoute un commentaire
async function OnSubmit() {
  await addComment(id.value, text.value, note.value);
  alert('Commentaire ajouté');
  commentaires.value = await getComment(id.value);
}

onMounted(async () => {
  livre.value = await getBookById(id.value);

  if (userStore.isAuthenticated) {
    commentaires.value = await getComment(id.value);
  }
});
</script>

<template>
  <div v-if="livre.id_ouvrage">
    <div class="detail-livre">
      <div>
        <img :src="'/' + livre.ouvCouverture" alt="couverture du livre" />

        <p class="user-text">Publié par : {{ livre.user.utiPseudo }}</p>
      </div>
      <div class="detail-livre-text">
        <p>Titre : {{ livre.ouvTitre }}</p>
        <p>
          Auteur : {{ livre.ecrivain.ecrPrenom }}
          {{ livre.ecrivain.ecrNom }}
        </p>
        <p>Catégorie : {{ livre.categorie }}</p>
        <p>Année édition : {{ livre.ouvAnneeEdition }}</p>
        <p>Éditeur : {{ livre.editeur }}</p>
        <p>Nombre de pages : {{ livre.ouvNbPage }}</p>
        <p>Résumé : {{ livre.ouvResume }}</p>
        <p>Note : {{ livre.ouvMoyenneAppreciation }}</p>
      </div>
    </div>
    <div>
      <form class="review-form" @submit.prevent="OnSubmit">
        <label for="note">Note: </label>
        <input v-model="note" required type="number" class="note" min="0" max="5" />
        <label for="text">Commentaire: </label>
        <input v-model="text" required class="text" type="text" maxlength="255" />

        <input class="button" type="submit" value="Submit" />
      </form>
    </div>
    <div v-if="commentaires">
      <br />
      <div v-for="commentaire in commentaires">
        note : {{ commentaire.comAppreciation }} <br />
        Commentaire : {{ commentaire.comCommentaire }}
        <br />
        <p class="user-text">Publié par : {{ commentaire.user.utiPseudo }}</p>

        <br />
      </div>
    </div>
  </div>
  <div v-else-if="!userStore.isAuthenticated">
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
