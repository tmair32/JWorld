<script setup lang="ts">
import anime from "animejs";

const clientWidth = ref(0);
const clientHeight = ref(0);

const path = anime.path("path");

const getScrollPercent = () => {
  const h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
};

onMounted(async () => {
  if (typeof window === "undefined") return;
  const ani = await import("animejs/lib/anime.es.js");
  const anime = ani.default;
  const path = anime.path(".meteor-path path");

  const animation = anime({
    targets: ".meteor-path .meteor",
    translateX: path("x"),
    translateY: path("y"),
    duration: 2000,
    delay: (el, i) => i * 100,
    easing: "linear",
    autoplay: false,
  });

  const waiting = ref(false); // Throttle Flag
  const scrollValue = ref(0); // Scroll Value

  const scrollHandler = (e: WheelEvent) => {
    if (!waiting.value) {
      waiting.value = true; // throttle check
      const percentage = getScrollPercent();
      animation.seek(animation.duration * (percentage * 0.01));

      // Throttle 100ms
      setTimeout(() => {
        waiting.value = false;
      }, 100);
    }
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
  @apply relative w-full h-[1000vh];
}
</style>
