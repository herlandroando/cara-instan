<template>
  <menubar :model="items">
    <template #start>
      <router-link class="no-deco-link" :to="{ name: 'Home' }"
        ><h3 class="title">Cara Instan!</h3></router-link
      >
    </template>
    <template #end>
      <div class="p-d-inline-flex">
        <div class="p-mr-3">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <input-text type="text" v-model="search" placeholder="Search" />
          </span>
        </div>
        <div class="p-mr-3">
          <toggle-button
            v-model="is_change_theme"
            :onIcon="PrimeIcons.SUN"
            :offIcon="PrimeIcons.MOON"
          />
        </div>
      </div>
    </template>
  </menubar>
  <div class="p-grid content">
    <router-view />
  </div>
  <div class="footer">
    <div class="p-d-flex p-jc-center p-flex-column">
      <h4>CaraInstan Website Open Source</h4>
      <p>Last Build: {{ lastBuild ?? "404" }}</p>
    </div>
  </div>
</template>

<script>
import Menubar from "primevue/menubar";
import { PrimeIcons } from "primevue/api";
import ToggleButton from "primevue/togglebutton";
import InputText from "primevue/inputtext";
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import axios from "axios";
// import Firebase from "firebase";

export default {
  name: "App",
  components: {
    Menubar,
    ToggleButton,
    InputText,
  },
  setup() {
    const items = [
      { label: "Dokumen", icon: PrimeIcons.BOOK },
      { label: "Media", icon: PrimeIcons.VIDEO },
      { label: "Dunia IT", icon: PrimeIcons.DESKTOP },
      { label: "Tentang Kami", icon: PrimeIcons.INFO, to: { name: "About" } },
    ];
    const theme = ref("saga-blue");
    const search = ref("");
    const lastBuild = ref("");
    const is_change_theme = computed({
      get: () => {
        return theme.value === "saga-blue";
      },
      set: (is_light) => {
        let themeElement = document.getElementById("theme-link");
        if (is_light) {
          themeElement.setAttribute(
            "href",
            themeElement.getAttribute("href").replace(theme.value, "saga-blue")
          );
          theme.value = "saga-blue";
        } else {
          themeElement.setAttribute(
            "href",
            themeElement.getAttribute("href").replace(theme.value, "vela-blue")
          );
          theme.value = "vela-blue";
        }
      },
    });

    onMounted(() => {
      axios.get("/last-build").then((value) => {
        lastBuild.value = new Date(value.data).toDateString();
      });
    });
    return { is_change_theme, items, search, PrimeIcons, lastBuild };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0px;
}
.no-deco-link {
  text-decoration: none;
  color: var(--text-color);
}

.deco-link {
  text-decoration: none;
  color: var(--text-color);
  border-bottom: 2px solid;
}

.title {
  padding: 0px 20px;
}

.content {
  background-color: var(--surface-d);
  color: var(--text-color);
  min-height: 90vh;
  margin: 0px !important;
}

.footer {
  background-color: var(--surface-c);
  color: var(--text-color-secondary);
  padding: 10px;
}
.footer .p-d-flex * {

  margin: 5px !important;
}
</style>
