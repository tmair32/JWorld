<script setup lang="ts">
import anime from "animejs";

const scrollDirection = ref(0); // 1: up, -1: down
const waiting = ref(false); // Throttle Flag
const scrollTrace = ref(0); // Previous Scroll Direction

const scrollHandler = (e: WheelEvent) => {
  if (!waiting.value) {
    waiting.value = true; // throttle check

    // Throttle 100ms
    setTimeout(() => {
      waiting.value = false;
    }, 100);
  }
};

const clientWidth = ref(0);
const clientHeight = ref(0);

const path = anime.path("path");

onMounted(async () => {
  document.addEventListener("mousewheel", scrollHandler);

  if (typeof window === "undefined") return;
  const ani = await import("animejs/lib/anime.es.js");
  const anime = ani.default;
  const path = anime.path(".meteor-path path");
  console.log(path("x"));
  console.log(path("y"));

  anime({
    targets: ".meteor-path .meteor",
    translateX: path("x"),
    translateY: path("y"),
    // rotate: path("angle"),
    easing: "linear",
    duration: 12000,
    loop: true,
  });
});
</script>
<template>
  <background />
  <div class="meteor-path">
    <meteor-path />
    <meteor />
  </div>
</template>

<style lang="scss" scoped></style>
