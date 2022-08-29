<script setup lang="ts">
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

onMounted(() => {
  document.addEventListener("mousewheel", scrollHandler);
});
</script>
<template>
  <background />
  <meteor />
  <meteor-path />
</template>

<style lang="scss" scoped></style>
