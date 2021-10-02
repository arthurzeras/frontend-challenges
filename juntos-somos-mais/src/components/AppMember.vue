<template>
  <div class="member">
    <img
      :alt="fullName"
      class="member__img"
      :src="props.member.picture.thumbnail"
    />

    <h4>{{ capitalize(fullName) }}</h4>

    <div>
      {{ props.member.location.street }}
    </div>

    <div>
      {{ props.member.location.city }}
    </div>

    <div>
      {{ props.member.location.state }}, {{ props.member.location.postcode }}
    </div>
  </div>
</template>

<script setup>
import { capitalize } from '../utils/func';
import { computed, toRefs } from '@vue/reactivity';

const props = defineProps({ member: { type: Object, required: true } });

toRefs(props);

const fullName = computed(
  () => `${props.member.name.first} ${props.member.name.last}`,
);
</script>

<style scoped lang="scss">
.member {
  padding: 1.5rem 0;
  border-radius: 5px;
  text-align: center;
  border: 1px solid $grey-2;

  &__img {
    height: 95px;
    border-radius: 100%;
  }

  div:nth-child(3) {
    margin-bottom: 1rem;
  }

  div:nth-child(4),
  div:nth-child(5) {
    font-size: 0.8rem;
  }
}
</style>
