<template>
  <article class="filter">
    <h3>Por Estado</h3>

    <ul>
      <li class="filter__item" v-for="state in statesSliced" :key="state">
        <input @change="changeFilters(state)" type="checkbox" :id="state" />
        <label :for="state">{{ capitalize(state) }}</label>
      </li>
    </ul>

    <button class="filter__btn" @click="sliceList = !sliceList">
      {{ sliceList ? 'Ver' : 'Ocultar' }} todos
    </button>
  </article>
</template>

<script setup>
import states from './states';
import { ref, computed } from 'vue';
import { capitalize } from '../../utils/func';

const emit = defineEmits(['filtered']);

const filters = ref([]);
const sliceList = ref(true);

const statesSliced = computed(() =>
  sliceList.value ? states.slice(0, 5) : states,
);

const changeFilters = (state) => {
  if (filters.value.includes(state)) {
    const index = filters.value.indexOf(state);
    filters.value.splice(index, 1);
    emit('filtered', filters);
    return;
  }

  filters.value.push(state);
  emit('filtered', filters);
};
</script>

<style lang="scss">
.filter {
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid $grey-2;

  h3 {
    font-weight: bold;
    font-size: 1.2rem;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  &__item {
    gap: 0.5rem;
    display: flex;
    padding: 0.25rem 0;
    font-size: 1.1rem;
    align-items: center;
  }

  &__btn {
    border: none;
    font-size: 1rem;
    text-decoration: underline;
    background-color: transparent;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
