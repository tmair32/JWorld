<script setup lang="ts">
import anime from "animejs";

const clientWidth = ref(0);
const clientHeight = ref(0);

const getScrollPercent = () => {
  const h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
};

onBeforeMount(() => {
  window.scrollTo(0, 0);
});

onMounted(async () => {
  if (typeof window === "undefined") return;

  const ani = await import("animejs/lib/anime.es.js");
  const anime = ani.default;
  const path = anime.path(".meteor-path path");

  const animation = anime({
    targets: ".meteor-path .meteor",
    translateX: path("x"),
    translateY: path("y"),
    duration: 5000,
    delay: (el, i) => i * 500,
    elasticity: 200,
    easing: "linear",
    autoplay: false,
  });

  const seek = () => {
    const percentage = getScrollPercent();
    return animation.seek(animation.duration * (percentage * 0.02));
  };

  const scrollHandler = () => {
    window.requestAnimationFrame(() => seek());
  };

  window.addEventListener("scroll", scrollHandler);
});
</script>
<template>
  <background />
  <div class="meteor-path">
    <meteor-path />
    <meteor />
  </div>
  <div class="w-screen h-screen flex items-center justify-center">
    <logo />
  </div>
  <div class="fake-height" />
</template>

<style lang="scss" scoped>
.fake-height {
  @apply relative w-full h-[500vh];
}

.meteor-path {
  @apply fixed w-screen h-screen flex;
}
</style>
