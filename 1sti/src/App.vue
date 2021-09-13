<template>
  <main class="main">
    <div class="main__head" :class="{ 'main__head--card': hasCard }">
      <h1>Previsão do Tempo</h1>
    </div>

    <app-card-weather :city="city" />

    <fieldset class="main__head--search">
      <input
        type="text"
        v-model="search"
        @keyup.enter="getCityWeather()"
        placeholder="Insira aqui o nome da cidade"
      />

      <button @click="getCityWeather()" class="main__head--search__btn">
        <img src="./assets/icons/search.svg" alt="Search icon" />
      </button>
    </fieldset>

    <app-cities-list />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import useGetWeather from './utils/use-get-weather';
import AppCardWeather from './components/AppCardWeather.vue';
import AppCitiesList from './components/app-cities-list/AppCitiesList.vue';

const city = ref({});
const search = ref('');

const getCityWeather = async () => {
  city.value = await useGetWeather(search.value);
};

const hasCard = computed(() => !!Object.keys(city.value).length);
</script>

<style>
.main {
  min-height: 100vh;
}

.main__head {
  padding: 2rem;
}

.main__head h1 {
  margin: 0;
  color: #fff;
  font-size: 3rem;
  font-weight: bold;
}

.main__head--card {
  z-index: 1;
  position: sticky;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

.main__head--card h1 {
  font-size: 1.5rem;
}

.main__head--search {
  border: none;
  padding: 1rem 2rem;
  position: relative;
  border-bottom: 1px solid #fff;
}

.main__head--search input {
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem 1rem;
}

.main__head--search__btn {
  top: 25px;
  border: none;
  right: 2.5rem;
  position: absolute;
  background-color: transparent;
}

@media (min-width: 768px) {
  .main {
    margin: 0 25%;
  }

  .main__head--card {
    box-shadow: none;
    text-align: center;
  }
}

@media (min-width: 1024px) {
  .main {
    margin: 0 30%;
  }
}
</style>
