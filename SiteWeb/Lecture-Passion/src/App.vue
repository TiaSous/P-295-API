<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { decodeToken } from './tools/decodeToken.mjs';

const token = ref()
const userId = ref(0)
onMounted(() => {
  try
  {
    getToken();
  }catch{
    userId.value = 0
  }
})

function getToken() {
  const test = localStorage.getItem('token')
  token.value = decodeToken(test)
  userId.value = token.value.userId
}
</script>

<template>
  <header>
    <nav>

      <RouterLink to="/">
        <h1 class="logo">BOOK STORY</h1>
      </RouterLink>
      <RouterLink :to="{name: 'user', params: {id: userId}}" class="navigation">
        <p class="button-3" role="button">Mes ouvrages</p>
      </RouterLink>
      <RouterLink class="navigation" to="/liste">
        <p class="button-3" role="button">Liste</p>
      </RouterLink>
      <RouterLink to="/connection">
        <img class="user" src="./assets/image/connection.png" alt="" >
      </RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <div>
      <p>Auteur</p>
      <p>Contact</p>
    </div>
    <div>
      <p>© 2024 Book Story. All rights reserved.</p>
    </div>
  </footer>
</template>

<style>
@font-face {
  font-family: Inter-light;
  src: url('./assets/font/Inter-Light.ttf');
}

@font-face {
  font-family: Inter-Medium;
  src: url('./assets/font/Inter-Medium.ttf');
}

* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: Inter-light;
}

.logo {
  color: rgb(76, 175, 80);

}

header,
footer {
  background-color: #ffffff;
  width: 100%;
}

header {
  border-bottom: 3px solid rgb(76, 175, 80);
}

.user{
  width: 50px;
  margin-top: 9px;
}

nav {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
}

main {
  background-color: #ffffff;
  color: rgb(76, 175, 80);

  padding-right: 15%;
}

a {
  color: rgb(76, 175, 80);
}

footer {
  height: 40px;
  border-top: 3px solid rgb(76, 175, 80);
  display: flex;
  flex-grow: 2;

}

body {
  background-color: #ffffff;
}

p {
  color: rgb(7, 150, 15);
}
</style>
