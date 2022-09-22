<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBlogStore } from "~/store/blog/blog";
const store = useBlogStore();
const { menuStatus } = storeToRefs(store);
</script>
<template>
  <div v-if="menuStatus" class="sidebar">
    <blog-side-content />
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  @apply absolute top-0 right-0 h-screen;
  @apply bg-gradient-to-b from-[rgb(25,25,112)] via-[rgb(33,20,0)] to-[rgb(0,0,0)];
  @apply z-10;
  @apply transition-all duration-500;
  @apply transform translate-x-full;
  @apply md:translate-x-0;
  @apply md:w-1/4 lg:w-1/5;
  @apply md:shadow-2xl;
  @apply md:rounded-r-3xl;
  @apply md:rounded-l-none;
  @apply md:rounded-b-none;
  @apply md:rounded-t-none;
  @apply md:overflow-y-auto;
  @apply md:overflow-x-hidden;
  @apply md:scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800;
  @apply hover:scrollbar-thumb-gray-600 md:focus:scrollbar-thumb-gray-600;

  &__background {
    @apply absolute top-0 left-0 w-full h-full;
    @apply bg-gradient-to-b from-[rgb(25,25,112)] via-[rgb(33,20,0)] to-[rgb(0,0,0)];
    @apply opacity-50;
  }
}
</style>
