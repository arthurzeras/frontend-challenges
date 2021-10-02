<template>
  <main class="app">
    <app-header @search="handleSearch" />

    <section class="app__content">
      <h1>Lista de membros</h1>

      <div class="app__content--cols">
        <app-filter @filtered="changeFilterList" class="app__content--filter" />

        <app-grid :members="memberList" class="app__content--grid" />
      </div>
    </section>
  </main>
</template>

<script setup>
import members from './utils/data';
import { computed, ref } from '@vue/reactivity';
import AppGrid from './components/AppGrid.vue';
import AppHeader from './components/AppHeader.vue';
import AppFilter from './components/AppFilter/AppFilter.vue';

const filters = ref([]);
const searchQuery = ref('');

const memberList = computed(() =>
  members.results.reduce((list, member) => {
    const filterState = !filters.value.length
      ? true
      : filters.value.includes(member.location.state);

    const filterQuery = new RegExp(searchQuery.value, 'gi').test(
      `${member.name.first}${member.name.last}`,
    );

    if (filterState && filterQuery) {
      list.push(member);
    }

    return list;
  }, []),
);

const changeFilterList = (_filters) => {
  filters.value = _filters.value;
};

const handleSearch = (query) => {
  searchQuery.value = query;
};
</script>

<style lang="scss">
.app {
  &__content {
    padding-bottom: 1rem;
    @include padding-screen-width;

    h1 {
      font-size: 2rem;
      font-weight: bold;
    }

    &--cols {
      gap: 1rem;
      width: 100%;
      display: flex;
    }

    &--filter {
      flex: 0 0 25%;
    }

    &--grid {
      flex: 0 0 calc(75% - 1rem);
    }
  }
}
</style>
