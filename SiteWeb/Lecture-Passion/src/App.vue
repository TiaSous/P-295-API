<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <section class="search-container">
        <input type="text" class="search-input" placeholder="Que recherchez-vous ?">
        <button class="search-button">Search</button>
      </section>

      <RouterLink to="/">
        <h1 class="logo">BOOK STORY</h1>
      </RouterLink>
      <RouterLink to="/" class="navigation">
        <p class="button-3" role="button">Accueil</p>
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

.search-container {
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #fff;
  
}

.search-input {
  flex-grow: 1;
  padding: 10px 15px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.search-button {
  padding: 5px 15px;
  background-color: #4CAF50;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  border: none;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
}

.search-button:hover {
  background-color: #45A049;
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
