<script setup lang="ts">
import { useCommonStore } from "~/store/common";
const store = useCommonStore();
const { ChangeClientSize } = store;

interface starType {
  range: string;
  width: string;
  height: string;
  left: string;
  top: string;
}

const backgroundRef: HTMLCanvasElement = ref();
const skyRef: HTMLDivElement = ref();
const starCount = 312;

const clientWidth = computed(() => backgroundRef.value.clientWidth ?? 0);
const clientHeight = computed(() => backgroundRef.value.clientHeight ?? 0);

const stars = ref([]);

const randRange = () => Math.floor(Math.random() * 5) + 1;
const random = (range: number, unit: string) => {
  const randNum = Math.floor(Math.random() * range) + 1;
  return `${randNum}${unit}`;
};

const createStar = (size: number) => {
  const widthAndHeight = random(size, "px");
  const star: starType = {
    range: `blink_${randRange()}`,
    width: widthAndHeight,
    height: widthAndHeight,
    left: random(clientWidth.value, "px"),
    top: random(clientHeight.value, "px"),
  };
  stars.value.push(star);
};

const paintStars = (stars: number, size: number) => {
  //   while (skyRef.value.firstChild) {
  //     skyRef.value.removeChild(skyRef.value.firstChild);
  //   }

  for (let i = 0; i < stars; i++) {
    createStar(size);
  }
};

onMounted(() => {
  //   if (!skyRef.value || !backgroundRef.value) return;
  paintStars(starCount, 5);
  ChangeClientSize({
    clientWidth: clientWidth.value,
    clientHeight: clientHeight.value,
  });
});
</script>
<template>
  <div ref="backgroundRef" class="background">
    <div
      v-for="(star, idx) in stars"
      :key="`star-${idx}`"
      class="star"
      :class="star.range"
      :style="{
        width: star.width,
        height: star.height,
        top: star.top,
        left: star.left,
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
.background {
  @apply w-screen h-screen fixed z-0;
  @apply bg-gradient-to-t from-[rgb(25,25,112)] via-[rgb(33,20,0)] to-[rgb(0,0,0)];
}

.star {
  @apply absolute bg-star-color-A rounded-xl;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}

.blink {
  &_1 {
    animation-name: blink10;
  }
  &_2 {
    animation-name: blink20;
  }
  &_3 {
    animation-name: blink30;
  }
  &_4 {
    animation-name: blink40;
  }
  &_5 {
    animation-name: blink50;
  }
}

@keyframes blink10 {
  0%,
  100% {
    @apply bg-star-color-A;
  }
  20% {
    @apply bg-star-color-B;
  }
}

@keyframes blink20 {
  0%,
  100% {
    @apply bg-star-color-B;
  }
  40% {
    @apply bg-star-color-A;
  }
}

@keyframes blink50 {
  0%,
  100% {
    @apply bg-star-color-A;
  }
  50% {
    @apply bg-star-color-B;
  }
}

@keyframes blink30 {
  0%,
  100% {
    @apply bg-star-color-A;
  }
  60% {
    @apply bg-star-color-B;
  }
}

@keyframes blink40 {
  0%,
  100% {
    @apply bg-star-color-B;
  }
  80% {
    @apply bg-star-color-A;
  }
}
</style>
