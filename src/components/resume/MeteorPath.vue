<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCommonStore } from "~/store/common";
const store = useCommonStore();
const { clientWidth, clientHeight } = storeToRefs(store);

defineProps({
  pathType: {
    type: String,
    default: "right",
  },
});

const height = computed(() => {
  if (clientHeight.value / 2 - 50 > 0) {
    return clientHeight.value / 2 - 50;
  } else {
    return 422;
  }
});
</script>
<template>
  <svg-base
    svg-name="meteor-path"
    :svg-class="`absolute top-0 invisible`"
    width="960"
    :height="height"
    :viewBox="`0 0 960 ${height}`"
    fill="#fff"
  >
    <template #svgContent>
      <path
        d="M5,264 q53.5,40.5 107,31 q34,-11.5 68,-73 q10,-68 -58,-81 q-53,19 -41,79 q19,91 121,74 q111,-46 85,-141 q-49,-40 -78,14 q-20,113 115,139 q50.5,-6.5 94,-60 q8,-68 -27,-100 q-51,9 -52,44 q-13,88 85,110 q35.5,-1 71,-52 q50.5,-6.5 94,-60 q8,-68 -27,-100 q-51,9 -52,44 q-13,88 85,110 q35.5,-1 71,-52"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="miter"
        stroke="#0066FF"
        stroke-width="1"
      />
    </template>
  </svg-base>
</template>

<style scoped></style>
