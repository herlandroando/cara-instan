<template>
  <div class="p-col-12 p-mt-5">
    <h1 class="typewrite"><span class="wrap"></span></h1>
    <h3>Tapi bingung caranya?</h3>
    <p class="p-col-6 p-offset-3 p-text-center">
      Website ini ada untuk menjawab kebingungan anda. Kami mempunyai list
      website atau aplikasi yang akan memudahkan anda dalam bekerja.
    </p>
  </div>
  <div class="p-col-12">
    <h3>Tips Terbaru:</h3>
    <div class="p-d-flex p-d-flex-wrap p-jc-center">
      <template v-if="!initReady">
        <skeleton class="p-m-2" width="20rem" height="150px"></skeleton>
        <skeleton class="p-m-2" width="20rem" height="150px"></skeleton>
        <skeleton class="p-m-2" width="20rem" height="150px"></skeleton>
      </template>
      <template v-else>
        <Card
          v-for="tip in newTips"
          :key="tip.slug"
          style="width: 20rem; margin: 0px 50px"
        >
          <template #header>
            <img :src="tip.thumbnail" :alt="tip.label" class="tips-image" />
          </template>
          <template #title>
            <router-link class="deco-link" :to="'/tips/' + tip.slug">{{
              tip.label
            }}</router-link>
          </template>
          <template #content>
            <p class="p-text-left">
              Tanggal Publish: {{ tip.timestamp.toDate().toDateString() }}
            </p>
            <p class="p-text-left">Tipe Tips: {{ $_.capitalize(tip.type) }}</p>
          </template>
          <!-- <template #footer>

        </template> -->
        </Card>
      </template>
    </div>
  </div>
  <div class="p-col">
    <div class="box">3</div>
  </div>
</template>

<script>
import { tipsCollection } from "../firebase";

import Card from "primevue/card";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import Skeleton from "primevue/skeleton";

export default {
  components: { Card, Skeleton },
  setup() {
    const newTips = ref([]);
    const responsiveOptions = ref([
      {
        breakpoint: "1024px",
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: "600px",
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: "480px",
        numVisible: 1,
        numScroll: 1,
      },
    ]);
    const initReady = ref(false);

    onMounted(async () => {
      initTypewrite();
      await tipsCollection
        .orderBy("timestamp", "desc")
        .limit(5)
        .get()
        .then((QuerySnapshot) => {
          QuerySnapshot.forEach((doc) => {
            if (doc.exists) {
              newTips.value.push(doc.data());
            }
          });
        });
      initReady.value = true;
    });

    return { newTips, responsiveOptions, initReady };
  },
};

function initTypewrite() {
  //From CSS Trick
  var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  const dataper = [
    "Ingin Mengkonversi PDF Ke Word?",
    "Ingin Memotong Musik atau Video?",
    "Ingin Buat Game Tanpa Kode?",
  ];
  
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = dataper;
    var period = 2000;
    if (toRotate) {
      new TxtType(elements[i], toRotate, period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
}

</script>

<style scoped>
.tips-image {
  width: 100%;
  height: auto;
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
}

.tips-card {
  border: 1px solid var(--surface-d);
  border-radius: 3px;
  margin: 0.3rem;
  text-align: center;
  padding: 2rem 0;
}
</style>