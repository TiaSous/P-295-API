<script setup>
import { getLivreId } from "@/services/BookService.mjs";
import { computed, onMounted, ref } from "vue";

const props = defineProps(["id"]);

const event = ref("");
const id = computed(() => props.id);
onMounted(() => {
   getLivreId(id.value)
    .then((response) => {
      event.value = response.data.data
      console.log(event.value)
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <div v-if="event">
    <h1>{{ event.ouvTitre }}</h1>
    <p>{{ event.ouvAnneeEdition }}</p>
    <p>{{ event.ouvResume }}</p>
  </div>
</template>
