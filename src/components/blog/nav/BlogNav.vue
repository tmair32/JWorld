<script setup lang="ts">
import { useBlogStore } from "~/store/blog/blog";
import { storeToRefs } from "pinia";
const store = useBlogStore();
const { toggleMenu } = store;
const { menuStatus, title } = storeToRefs(store);

const hoverLogo = ref(false);
</script>
<template>
  <nav class="nav">
    <blog-logo />
    <div class="nav__title">
      <h1>{{ title }}</h1>
    </div>
    <div class="nav__icons">
      <div class="nav__icons-search" />
      <div class="nav__icons-menu">
        <blog-menu-icon />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  @apply col-span-full h-14 z-120;
  @apply grid grid-rows-1 grid-cols-[min-content,auto,100px];
  @apply items-center mx-5 mt-5;
  @apply text-white cursor-pointer;

  &__title {
    @apply text-2xl font-bold;
    @apply flex items-center;
    @apply cursor-pointer;
    @apply transition-all duration-300 ease-in-out;
    @apply justify-center;
    &:hover {
      @apply text-gray-300;
    }
  }

  &__icons {
    @apply grid grid-cols-2 gap-x-2 items-center;
    &-search {
      @apply col-span-1 w-40px h-40px;
      @apply justify-self-center flex items-center;
      @apply justify-end cursor-pointer;
      background: url("~/assets/search.svg") no-repeat center;
      background-size: 30px;

      &:hover {
        @apply transition-all duration-300 ease-in-out;
        @apply transform scale-120;
      }
    }
    &-menu {
      @apply col-span-1 w-40px h-40px;
      @apply cursor-pointer;
    }
  }
}
</style>
