<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useAuth } from './config/useAuth';
import { onMounted } from 'vue';
import { myMSALObj } from './config/msalConfig';

const { login, logout, handleRedirect } = useAuth();

const handleLogin = async () => {
  await login();
};

const handleLogout = () => {
  logout();
};

const initialize = async () => {
  try {
    await myMSALObj.initialize();
  } catch (error) {
    console.error('Error initializing MSAL:', error);
  }
};

onMounted(async () => {
  await initialize();
  await handleRedirect();
});
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <h1 class="logo">BOOK STORY TEST</h1>
      </RouterLink>
      <button @click="handleLogin">login</button>
      <button @click="handleLogout">logout</button>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <div>
      <p>Tiago Rodrigues Sousa</p>
      <a href="mailto:tiago.rodrigues2@eduvaud.ch">tiago.rodrigues2@eduvaud.ch</a>
      <br />
      <p>Evin Paramanathan</p>
      <a href="mailto:evin.paramanathan@eduvaud.ch">evin.paramanathan@eduvaud.ch</a>
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

.user {
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
  text-decoration: underline;
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
