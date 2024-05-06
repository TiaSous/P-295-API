<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <img src="./assets/image/logo.png" alt="">
      </RouterLink>
      <div>
        <input type="search" id="site-search" name="q" />
        <button>Search</button>
      </div>
      <RouterLink to="/" class="navigation"><button class="button-3" role="button">Accueil</button></RouterLink>
      <RouterLink class="navigation" to="/liste"><button class="button-3" role="button">Liste</button></RouterLink>
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

header,
footer {
  background-color: #063033;
  width: 100%;
}

#barre-recherche {
  background-color: white;
  height: 50px;
  width: 20%;
}

nav {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
}

main {
  background-color: #14484B;
  color: white;
  padding-left: 15%;
  padding-right: 15%;
}

a {
  color: white;
}

footer {
  height: 40px;
}

body {
  background-color: #14484B;
}

p {
  color: white;
}

/* button */
.button-3 {
  appearance: none;
  background-color: #1A888F;
  ;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 10px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 25px;
  font-weight: 600;
  line-height: 40px;
  width: 160px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
}

.button-3:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.button-3:hover {
  background-color: #125d63;
}

.button-3:focus {
  box-shadow: rgba(46, 156, 164, 0.4) 0 0 0 3px;
  outline: none;
}
</style>
