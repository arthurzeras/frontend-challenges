<template>
  <div class="card-weather" v-if="hasValues">
    <button @click="closeCard()" class="card-weather__close">&times;</button>

    <div class="card-weather__city">
      <strong>{{ city.name }} - {{ city.sys.country }}</strong>
    </div>

    <div class="card-weather__temp">
      <strong>
        <span>{{ city.main.temp }}ºC</span>&nbsp;&nbsp;
        <span>{{ city.weather[0].main }}</span>
      </strong>
    </div>

    <div class="card-weather__temp-info">
      <span>Min {{ city.main.temp_min }}</span>
      &nbsp;&nbsp;
      <span>Max {{ city.main.temp_max }}</span>
      &nbsp;&nbsp;
      <span>Sensação {{ city.main.feels_like }}</span>
    </div>

    <div class="card-weather__info">
      <span>
        Vento <strong>{{ city.wind.speed }} km/h</strong>
      </span>
      &nbsp;&nbsp;&nbsp;
      <span>
        Umidade <strong>{{ city.main.humidity }}%</strong>
      </span>
    </div>
  </div>
</template>

<script>
import { watch, computed, ref } from 'vue';

export default {
  props: {
    city: { type: Object, required: true },
  },

  setup(props) {
    const visible = ref(false);
    const hasValues = computed(
      () => !!Object.keys(props.city).length && visible.value,
    );

    const closeCard = () => {
      visible.value = false;
    };

    watch(
      props,
      () => {
        visible.value = true;
      },
      { deep: true },
    );

    return {
      visible,
      hasValues,
      closeCard,
    };
  },
};
</script>

<style>
.card-weather {
  padding: 0 2rem;
  position: relative;
  background-color: #fff;
}

.card-weather * {
  color: #666;
}

.card-weather__close {
  right: 1rem;
  top: 0.25rem;
  border: none;
  font-size: 2rem;
  position: absolute;
  background: transparent;
  padding: 0 1rem 1rem 1rem;
  color: hsl(26, 100%, 50%);
}

.card-weather__city {
  padding: 1rem 0;
  font-size: 1.1rem;
}

.card-weather__temp {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.card-weather__info {
  padding: 1rem 0;
}
</style>
