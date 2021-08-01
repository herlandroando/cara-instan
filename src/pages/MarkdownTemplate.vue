<template>
  <div class="p-grid p-text-left">
    <template v-if="initReady">
      <div class="tips-title p-col-12">
        <h1>{{ blog.label }}</h1>
      </div>
      <div class="p-col-12 p-text-center">
        <img class="blog-image" :src="blog.thumbnail" />
      </div>
      <div class="tips-content p-col-12">
        <markdown :source="content" :breaks="true" :typographer="true" />
      </div>
    </template>
    <template v-else>
      <skeleton class="p-mt-3 p-mb-3" width="30rem" height="30px" />
      <skeleton class="p-mb-3" width="100vw" height="400px" />
      <skeleton width="100vw" height="400px" />
    </template>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import Markdown from "vue3-markdown-it";
import { onMounted } from "@vue/runtime-core";
import { tipsCollection } from "../firebase";
import { useRoute, useRouter } from "vue-router";
import Skeleton from "primevue/skeleton";
import axios from "axios";
export default {
  components: { Markdown, Skeleton },
  setup() {
    const blog = reactive({
      label: "",
      thumbnail: "",
      slug: "",
      timestamp: "",
      contentPath: "",
      type: "",
    });
    const initReady = ref(false);
    const content = ref("");

    onMounted(async () => {
      let route = useRoute();
      let exist = false;
      await tipsCollection
        .where("slug", "==", route.params.slug)
        .limit(1)
        .get()
        .then((QuerySnapshot) => {
          QuerySnapshot.forEach((doc) => {
            if (doc.exists) {
              exist = doc.exists;
              let data = doc.data();
              blog.label = data.label;
              blog.thumbnail = data.thumbnail;
              blog.slug = data.slug;
              blog.type = data.type;
              blog.timestamp = data.timestamp;
              switch (data.type) {
                case "dokumen":
                  blog.contentPath =
                    window.location.origin +
                    `/markdown/dokumen/${data.filename}.md`;
                  break;
                case "media":
                  blog.contentPath =
                    window.location.origin +
                    `/markdown/media/${data.filename}.md`;
                  break;
                case "it":
                  blog.contentPath =
                    window.location.origin + `/markdown/it/${data.filename}.md`;
                  break;

                default:
                  break;
              }
            }
          });
        });
      if (exist)
        await axios.get(blog.contentPath).then((value) => {
          content.value = value.data;
        });
      else {
        useRouter().back();
      }
      initReady.value = true;
    });

    return { blog, initReady, content };
  },
};
</script>

<style scoped>
.blog-image {
  width: 80%;
  height: auto;
  margin: 0 auto;
}
</style>

<style>
.tips-content div,
.tips-title {
  padding: 20px 7em !important;
}
.tips-content div blockquote {
  border-left: 5px solid var(--surface-a);
  padding: 5px 10px;
  color: var(--text-color-secondary);
  background-color: var(--surface-b);
}

.tips-content div a {
  text-decoration: none;
  color: var(--text-color);
  border-bottom: 2px solid;
}
</style>