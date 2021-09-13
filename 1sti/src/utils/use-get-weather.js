export default async (city = '') => {
  try {
    const APP_ID = '';
    const qs = `q=${city}&appid=${APP_ID}&units=metric`;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${qs}`,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(response);
    }

    return data;
  } catch (error) {
    return {};
  }
};
