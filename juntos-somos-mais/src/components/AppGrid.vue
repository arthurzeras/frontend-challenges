<template>
  <div class="grid">
    <div class="grid__paginator--info">
      <div>Exibindo 9 de {{ props.members.length }} itens</div>

      <div>
        <strong>Ordenar por: </strong>
        <select v-model="sorter">
          <option value="name">Nome</option>
          <option value="state">Estado</option>
          <option value="city">Cidade</option>
        </select>
      </div>
    </div>

    <div class="grid__members">
      <app-member
        :member="member"
        :key="member.email"
        class="grid__members--item"
        v-for="member in membersList"
      />
    </div>

    <div class="grid__paginator--state">
      <button
        @click="prevPage()"
        :disabled="currentPage === 0"
        class="grid__paginator--button"
      >
        <app-icon class="icon" name="chevron-left" />
      </button>

      <button
        :key="page"
        v-for="page in pages"
        @click="changePage(page)"
        class="grid__paginator--button"
        :class="{ current: page === currentPage + 1 }"
      >
        {{ page }}
      </button>

      <button
        @click="nextPage()"
        class="grid__paginator--button"
        :disabled="currentPage + 1 === totalPages"
      >
        <app-icon class="icon" name="chevron-right" />
      </button>
    </div>
  </div>
</template>

<script setup>
import AppMember from './AppMember.vue';
import { computed, onMounted, ref, toRefs } from 'vue';

const props = defineProps({ members: { type: Array, required: true } });

toRefs(props);

const perPage = 9;
const currentPage = ref(0);
const sorter = ref('name');

const membersList = computed(() =>
  props.members
    .sort((memberA, memberB) => {
      const comparatives = {
        city: () => memberA.location.city > memberB.location.city,
        name: () => fullName(memberA.name) > fullName(memberB.name),
        state: () => memberA.location.state > memberB.location.state,
      };

      return comparatives[sorter.value]() ? 1 : -1;
    })
    .slice(currentPage.value * perPage, currentPage.value * perPage + perPage),
);

const fullName = (name) => `${name.first} ${name.last}`;

const totalPages = computed(() => Math.ceil(props.members.length / perPage));

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value + 1 < totalPages.value) {
    currentPage.value++;
  }
};

const changePage = (page) => {
  currentPage.value = page - 1;
};

const pages = computed(() => {
  const items = [];
  const pageRange = 3;
  const fullPages = Array.from({ length: totalPages.value }).map(
    (_, i) => i + 1,
  );

  const rangeStart = () => {
    const start = currentPage.value - pageRange;
    return start > 0 ? start : 1;
  };

  const rangeEnd = () => {
    const end = currentPage.value + pageRange;
    return end < totalPages.value ? end : totalPages.value;
  };

  if (fullPages.length > pageRange) {
    items.push(...fullPages.slice(rangeStart() - 1, rangeEnd()));
  }

  return items;
});
</script>

<style lang="scss">
.grid {
  &__paginator {
    &--info {
      display: flex;
      padding: 1rem;
      border-radius: 5px;
      border: 1px solid $grey-2;
      justify-content: space-between;

      select {
        border: none;
        cursor: pointer;
        font-size: 1rem;
      }
    }

    &--state {
      gap: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &--button {
      border: none;
      font-size: 1rem;
      margin-top: 1rem;
      background: transparent;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.current {
        border-bottom: 2px solid $grey-3;
      }

      &:first-child,
      &:last-child {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        border-radius: 100%;
        justify-content: center;
        background-color: $grey-3;

        .icon {
          width: 20px;
          height: 20px;
          color: $white;
        }
      }
    }
  }

  &__members {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
    margin-left: -0.5rem;
    width: calc(100% + 1rem);

    &--item {
      margin: 0.5rem;
      flex: 0 0 calc(33.33333% - 1rem);
    }
  }
}
</style>
