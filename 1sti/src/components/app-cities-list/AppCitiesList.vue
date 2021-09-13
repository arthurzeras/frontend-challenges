<template>
  <div class="cities-list">
    <h2>Capitais</h2>

    <table class="cities-list__table">
      <thead>
        <tr>
          <th width="40">Min</th>
          <th width="40">Max</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="city in citiesWeather" :key="city.name">
          <td>{{ city.min }}º</td>
          <td>{{ city.max }}º</td>
          <td>{{ city.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import citiesList from './cities-list';
import useGetWeather from '../../utils/use-get-weather.js';

const citiesWeather = ref([]);

onMounted(async () => {
  const promises = citiesList.map(async (city) => {
    const data = await useGetWeather(city);

    if (!Object.keys(data).length) {
      return { max: '--', min: '--', name: city };
    }

    const max = Math.round(data.main.temp_max);
    const min = Math.round(data.main.temp_min);

    return { max, min, name: city };
  });

  citiesWeather.value = await Promise.all(promises);
});
</script>

<style>
.cities-list {
  padding: 2rem;
}

.cities-list h2 {
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
}

.cities-list__table {
  width: 100%;
}

.cities-list__table th {
  font-weight: normal;
}

.cities-list__table td {
  font-weight: bold;
}

.cities-list__table td,
.cities-list__table th {
  text-align: left;
  padding: 0.5rem 0;
}
</style>
