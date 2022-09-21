<script setup lang="ts">
const hoverLogo = ref(false);
</script>
<template>
  <nav class="nav">
    <blog-logo />
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  @apply grid grid-cols-12 grid-rows-1 items-center px-10 mt-5;
  @apply col-span-12 h-14 z-120;
  @apply text-white;
}
</style>
