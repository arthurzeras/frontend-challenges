<template>
  <div class="app-search">
    <app-icon class="app-search__icon" name="search" />

    <input type="text" @keyup="emitChange" placeholder="Buscar aqui" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['search']);

const emitChange = (ev) => {
  emit('search', ev.target.value);
};
</script>

<style lang="scss">
.app-search {
  display: flex;
  position: relative;
  align-items: center;

  input {
    width: 350px;
    line-height: 1;
    font-size: 1rem;
    border-radius: 20px;
    background-color: $white;
    border: 1px solid $silver;
    padding: 0.75rem 1rem 0.75rem 3rem;
  }

  &__icon {
    left: 1rem;
    position: absolute;
  }
}
</style>
