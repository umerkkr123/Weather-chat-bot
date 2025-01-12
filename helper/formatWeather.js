const moment = require('moment');

const formatWeatherResponse = (weatherData, isForecast = false) => {
    if (isForecast) {
      const forecasts = weatherData.list.map(item => ({
        date: moment(item.dt * 1000).format('MMMM Do'),
        temp: Math.round(item.main.temp - 273.15),
        description: item.weather[0].description,
        humidity: item.main.humidity
      }));
      return forecasts.map(forecast => 
        `On ${forecast.date}: ${forecast.temp}°C, ${forecast.description}, humidity: ${forecast.humidity}%`
      ).join('\n');
    }
    const temp = Math.round(weatherData.main.temp - 273.15);
    return `Current weather in ${weatherData.name}: ${temp}°C, ${weatherData.weather[0].description}, humidity: ${weatherData.main.humidity}%`;
  };
module.exports = {formatWeatherResponse}