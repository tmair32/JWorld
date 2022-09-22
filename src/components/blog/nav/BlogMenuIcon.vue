<script setup lang="ts">
import { useBlogStore } from "~/store/blog/blog";
import { storeToRefs } from "pinia";
const store = useBlogStore();
const { toggleMenu } = store;
const { menuStatus } = storeToRefs(store);
</script>
<template>
  <div id="menu" class="menu">
    <div id="menu__button" class="menu__button">
      <input
        id="menu_checkbox"
        class="menu__checkbox"
        type="checkbox"
        @change="toggleMenu"
      />
      <label id="menu_label" class="menu__label" for="menu_checkbox">
        <div id="menu_text_bar" class="menu__label__text-bar" />
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// https://codepen.io/himalayasingh/pen/GzZWyX

.menu {
  @apply absolute top-1/2 left-0 right-0 w-40px;
  @apply my-0 mx-auto;
  @apply transform -translate-y-1/2;

  &__button {
    @apply w-40px overflow-hidden;
  }

  &__checkbox {
    @apply hidden;
  }

  &__label {
    @apply relative block h-30px cursor-pointer;

    &:before,
    &:after,
    &__text-bar {
      @apply absolute left-0 w-full h-5px;
      @apply bg-white;
    }

    &:before,
    &:after {
      content: "";
      transition: 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) left;
    }

    &:before {
      @apply top-0;
    }
    &:after {
      @apply top-12px;
    }
    &__text-bar {
      @apply top-24px;
      &:before {
        content: "MENU";
        @apply absolute top-5px left-0 right-0 text-white text-12px font-bold
          text-center;
      }
    }

    &:hover {
      &:before {
        @apply -left-40px;
      }
      &:after {
        @apply left-40px;
      }
      .menu__label__text-bar:before {
        animation: moveUpThenDown 0.8s ease 0.2s forwards,
          shakeWhileMovingUp 0.8s ease 0.2s forwards,
          shakeWhileMovingDown 0.2s ease 0.8s forwards;
      }
    }
  }

  &__checkbox:checked + .menu__label {
    &:before {
      @apply -left-40px;
    }
    &:after {
      @apply left-40px;
    }
    .menu__label__text-bar:before {
      animation: moveUpThenDown 0.8s ease 0.2s forwards,
        shakeWhileMovingUp 0.8s ease 0.2s forwards,
        shakeWhileMovingDown 0.2s ease 0.8s forwards;
    }
  }
}

@keyframes moveUpThenDown {
  0% {
    top: 0;
  }
  50% {
    top: -25px;
  }
  100% {
    top: -20px;
  }
}

@keyframes shakeWhileMovingUp {
  0% {
    transform: rotateZ(0);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  50% {
    transform: rotateZ(0deg);
  }
  75% {
    transform: rotateZ(10deg);
  }
  100% {
    transform: rotateZ(0);
  }
}

@keyframes shakeWhileMovingDown {
  0% {
    transform: rotateZ(0);
  }
  80% {
    transform: rotateZ(3deg);
  }
  90% {
    transform: rotateZ(-3deg);
  }
  100% {
    transform: rotateZ(0);
  }
}
</style>
