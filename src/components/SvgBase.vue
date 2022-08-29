<script setup lang="ts">
defineProps({
  viewBox: {
    type: String,
    default: "0 0 20 20",
  },
  svgName: {
    type: String,
    default: null,
  },
  svgClass: {
    type: String,
    default: "",
  },
  fill: {
    type: String,
    default: "none",
  },
  stroke: {
    type: String,
    default: "currentColor",
  },
  width: {
    type: [String, Number],
    default: 0,
  },
  height: {
    type: [String, Number],
    default: 0,
  },
});
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="svgClass"
    :viewBox="viewBox"
    :aria-labelledby="svgName"
    :fill="fill"
    :stroke="stroke"
    :width="width"
    :height="height"
    style="enable-background: new 0 0 512 512"
  >
    <title :id="svgName">{{ svgName }}</title>
    <slot name="svgContent" />
  </svg>
</template>
<style lang="scss" scoped></style>
