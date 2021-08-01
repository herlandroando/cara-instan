<template>
  <div class="p-grid about p-text-left">
    <template v-if="initReady">
      <!-- <div class="about-title p-col-12 p-my-4">
        <h1>Tentang Website</h1>
      </div> -->
      <!-- <div class="p-col-12 p-text-center">
        <img class="blog-image" :src="blog.thumbnail" />
      </div> -->
      <div class="about-content p-col-12">
        <markdown :source="content" :breaks="true" :typographer="true" />
      </div>
    </template>
    <template v-else>
      <skeleton class="p-mt-3 p-mb-3" width="30rem" height="30px" />
      <skeleton width="100vw" height="400px" />
    </template>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Markdown from "vue3-markdown-it";
import { onMounted } from "@vue/runtime-core";
import Skeleton from "primevue/skeleton";
import axios from "axios";
export default {
  components: { Markdown, Skeleton },
  setup() {
    const initReady = ref(false);
    const content = ref("");

    onMounted(async () => {
      await axios.get("/markdown/tentang-kami.md").then((value) => {
        content.value = value.data;
      });

      initReady.value = true;
    });

    return { initReady, content };
  },
};
</script>

<style scoped>
.blog-image {
  width: 80%;
  height: auto;
  margin: 0 auto;
}

.about {
  margin: 0px !important;
}
</style>

<style>
.about-content div,
.about-title {
  text-align: left;
  padding: 20px 7em !important;
}

.about-content div h1,
.about-content div h2 {
  text-align: center;
}

.about-content div blockquote {
  border-left: 5px solid var(--surface-a);
  padding: 5px 10px;
  color: var(--text-color-secondary);
  background-color: var(--surface-b);
}

.about-content div a {
  text-decoration: none;
  color: var(--text-color);
  border-bottom: 2px solid;
}
</style>