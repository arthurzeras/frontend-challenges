<template>
  <header class="header">
    <app-logo class="header__logo" />

    <app-search @search="emitChange" />
  </header>
</template>

<script setup>
import AppLogo from './AppLogo.vue';
import AppSearch from './AppSearch.vue';

const emit = defineEmits(['search']);

const emitChange = (query) => {
  emit('search', query);
};
</script>

<style lang="scss">
.header {
  padding: 1rem;
  display: flex;
  background-color: $grey;
  justify-content: space-between;

  @include padding-screen-width;

  &__logo {
    width: 148px;
    height: 40px;
  }
}
</style>
