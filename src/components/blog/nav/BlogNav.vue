<script setup lang="ts">
import { useBlogStore } from "~/store/blog/blog";
import { storeToRefs } from "pinia";
const store = useBlogStore();
const { title } = storeToRefs(store);

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
      <div class="nav__icons-menu" />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  @apply grid grid-cols-12 grid-rows-1 items-center px-10 mt-5;
  @apply col-span-12 h-14 z-120;
  @apply text-white;

  &__title {
    @apply col-start-2 col-end-12;
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
    @apply col-start-12 col-end-13;
    @apply grid grid-cols-2 items-center;
    &-search {
      @apply col-span-1 w-40px h-40px;
      @apply flex items-center;
      @apply justify-end cursor-pointer;
      background: url("~/assets/search.svg") no-repeat center;
      background-size: 30px;

      &:hover {
        @apply transition-all duration-300 ease-in-out;
        @apply transform scale-120;
      }
    }
  }

  &__icons-menu {
    @apply col-span-1;
    @apply transition-all translate-y-[15px] delay-0 duration-300;

    &,
    &::before,
    &::after {
      @apply w-40px h-5px bg-white;
    }

    &::before {
      content: "";
      @apply absolute left-0 bottom-15px;
      transition: bottom 0.3s 0.3s cubic-bezier(0.23, 1, 0.32, 1),
        transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }

    &::after {
      content: "";
      @apply absolute left-0 top-15px;
      transition: top 0.3s 0.3s cubic-bezier(0.23, 1, 0.32, 1),
        transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }

    &.active {
      &::before {
        @apply bottom-0 transform -rotate-45;
        transition: bottom 0.3s cubic-bezier(0.23, 1, 0.32, 1),
          transform 0.3s 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      }

      &::after {
        @apply top-0 transform rotate-45;
        transition: top 0.3s cubic-bezier(0.23, 1, 0.32, 1),
          transform 0.3s 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      }
    }
  }
}
</style>
