<template>
  <div v-if="theme === 'dark'" class="dark">
    <img alt="" class="top-image" src="./assets/bg-desktop-dark.jpg">
    <header-component :theme="this.theme" @switch-theme="siwtchTheme"></header-component>
    <task-panel :theme="this.theme"></task-panel>
  </div>
  <div v-else class="light">
    <img alt="" class="top-image" src="./assets/bg-desktop-light.jpg">
    <header-component :theme="this.theme" @switch-theme="siwtchTheme"></header-component>
    <task-panel :theme="this.theme"></task-panel>
  </div> 
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      theme: "dark",
    }
  },
  created() {
    document.body.classList.add(`${this.theme}`);
  },
  methods: {
    siwtchTheme() {
      if (this.theme == 'dark') {
        this.theme = "light";
        document.body.classList.remove("dark");
        document.body.classList.add("light");
      } else {
        this.theme = "dark";
        document.body.classList.remove("light");
        document.body.classList.add("dark");
      }
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

#app {
  font-family: 'Josefin Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body.dark {
  background-color: #081e2c;
  transition: all 400ms ease-out;
}

body.light {
  background-color: transparent;
  transition: all 400ms ease-out;
}

* {
  box-sizing: border-box;
  margin: 0;
}
</style>
