<template>
  <svg
    fill="none"
    class="app-icon"
    stroke="currentColor"
    :viewBox="`0 0 ${icon.width} ${icon.width}`"
  >
    <path
      :key="i"
      :d="path"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      v-for="(path, i) in icon.paths"
    />
  </svg>
</template>

<script setup>
import icons from './icons';
import { computed } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
});

const icon = computed(() => icons[props.name] || {});
</script>

<style lang="scss">
.app-icon {
  width: 24px;
  height: 24px;
  display: inline-block;
}
</style>
