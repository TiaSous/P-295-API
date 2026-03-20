<script setup lang="ts">
import { Book } from '@/model/bo/book';

// livre à afficher
const props = defineProps({
  livre: Book,
});
</script>

<template>
  <div class="livre">
    <RouterLink :to="{ name: 'livre-details', params: { id: livre.id_ouvrage } }">
      <img :src="'/' + livre.ouvCouverture" alt="couverture du livre" />
    </RouterLink>
    <div class="livre-description">
      <div>
        <RouterLink :to="{ name: 'livre-details', params: { id: livre.id_ouvrage } }">
          <h2>{{ livre.ouvTitre }}</h2>
        </RouterLink>
        <p>{{ livre.ecrivain.ecrPrenom }} {{ livre.ecrivain.ecrNom }}</p>
        <p>{{ livre.ouvMoyenneAppreciation }}</p>
      </div>
      <p>Publié par : {{ livre.user.utiPseudo }}</p>
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
