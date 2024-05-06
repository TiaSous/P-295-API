<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">
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
  <main>
    <RouterView />
  </main>
  <footer>
    <p>Auteur</p>
    <p>Contact</p>
  </footer>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
}
header, footer{
  background-color: #063033;
  width: 100%;
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
  background-color: #1A888F;
}
main{
  background-color: #14484B;
  color: white;
  padding-left: 8%;
  padding-right: 8%;
}
a{
  color: white;
}
footer{
  height: 40px;
}
body{
  background-color: #14484B;
}
p{
  color: white;
}
</style>
