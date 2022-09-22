<script setup lang="ts"></script>
<template>
  <background />
  <section class="blog">
    <blog-nav />
    <blog-side />
  </section>
</template>

<style lang="scss" scoped>
.blog {
  @apply grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12;
  @apply gap-x-1 md:gap-x-2;
  @apply h-screen w-screen;
}
</style>
