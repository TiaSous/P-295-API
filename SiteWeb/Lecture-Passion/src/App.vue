<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/" class="navigation">
          <img src="./assets/image/logo.png" alt="">
        </RouterLink>
        <div id="barre-recherche"></div>
        <RouterLink to="/" class="navigation">Accueil</RouterLink>
        <RouterLink class="navigation" to="/liste">Liste</RouterLink>
        <RouterLink to="/connection">
          <img src="./assets/image/connection.png" alt="" width="100px">
        </RouterLink>
        
      </nav>
  </header>
  <RouterView />
</template>

<style>
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
}
header{
  background-color: #063033;
}
#barre-recherche{
  background-color: white;
  height: 50px;
  width: 20%;
}
nav{
  display: flex;
  align-items: center;
}
.navigation{
  color: white;
}
</style>
