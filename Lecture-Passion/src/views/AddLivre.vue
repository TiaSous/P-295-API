<script setup>
import { addLivre } from '@/services/BookService.mjs';
import { getCategories, getEditeurs, getEcrivains } from '@/services/BookService.mjs';
import { decodeToken } from '@/tools/decodeToken.mjs';
import { onMounted, ref } from 'vue';

const IsError401 = ref();

// tous les champs du livres
const titre = ref();
const nbPage = ref();
const resume = ref();
const date = ref();
const extrait = ref();
const categorie = ref();
const ecrivain = ref();
const editeur = ref();

const utilisateurId = ref();

const token = ref();

const allCategories = ref();
const allEditeurs = ref();
const allEcrivains = ref();

const exist = ref(false);

const today = ref(new Date());

// va récupérer la liste des catégories, des éditeurs et écrivains
onMounted(() => {
  getEditeurs()
    .then((response) => {
      IsError401.value = false;
      allEditeurs.value = response.data.data;
      const test = localStorage.getItem('token');
      token.value = decodeToken(test);
      utilisateurId.value = token.value.userId;
    })
    .catch((error) => {
      if (error.message == 'Request failed with status code 401') {
        IsError401.value = true;
      }
      console.log(error);
    });

  getCategories()
    .then((response) => {
      allCategories.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });

  getEcrivains()
    .then((response) => {
      allEcrivains.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });

  let dd = today.value.getDate();
  let mm = today.value.getMonth() + 1;
  const yyyy = today.value.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today.value = yyyy + '-' + mm + '-' + dd;
  document.getElementById('datefield').setAttribute('max', today.value);
});

// lorsqu'il ajoute un livre
async function Submit() {
  const body = {
    ouvTitre: titre.value,
    ouvNbPage: nbPage.value,
    ouvResume: resume.value,
    ouvAnneeEdition: date.value,
    ouvCouverture: 'default.jpg',
    ouvExtrait: extrait.value,
    fk_utilisateur: utilisateurId.value,
    fk_categorie: categorie.value,
    fk_ecrivain: ecrivain.value,
    fk_editeur: editeur.value,
  };
  await addLivre(body)
    .then(() => {
      alert('Le livre a été ajouté');
    })
    .catch(() => {
      alert("Le livre n'a pas pu être ajouté");
    });
  window.location.reload();
}
</script>
<template>
  <form v-if="!IsError401" class="review-form" @submit.prevent="Submit">
    <label for="titre">Titre: </label>
    <input v-model="titre" type="text" required maxlength="50" />
    <label for="nbPage">Nombre de page: </label>
    <input v-model="nbPage" type="number" min="1" />
    <label for="resume">Resume: </label>
    <input v-model="resume" type="text" maxlength="255" />
    <label for="date">Date: </label>
    <input id="datefield" v-model="date" required type="date" />
    <label for="extrait">Extrait: </label>
    <input v-model="extrait" type="text" maxlength="255" />
    <label for="categorie">Categorie: </label>
    <select id="" v-model="categorie" required name="">
      <option disabled selected>Choisissez un catégorie</option>
      <option v-for="categorie in allCategories" :value="categorie.id_categorie">
        {{ categorie.catNom }}
      </option>
    </select>
    <label for="ecrivain">Ecrivain: </label>
    <select id="" v-model="ecrivain" required name="">
      <option disabled selected>Choisissez un écrivain</option>
      <option v-for="ecrivain in allEcrivains" :value="ecrivain.id_ecrivain">
        {{ ecrivain.ecrPrenom }} {{ ecrivain.ecrNom }}
      </option>
    </select>
    <label for="editeur">Editeur: </label>
    <select id="" v-model="editeur" required name="">
      <option disabled selected>Choisissez un éditeur</option>
      <option v-for="editeur in allEditeurs" :value="editeur.id_editeur">
        {{ editeur.ediNom }}
      </option>
    </select>
    <input class="button" type="submit" value="Submit" />
  </form>
  <div v-else>Vous n'êtes pas connecté !</div>
</template>

<style scoped>
.review-form {
  display: flex;
  flex-direction: column;
}
</style>
