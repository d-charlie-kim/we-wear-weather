import React from 'react';
import axios from 'axios';
import { config } from 'API/openWeatherAPI_Config';
const useOpenWeatherAPI = () => {
  const API_ID = config.API_ID;
  const openWeatherAxios = axios.create({
    baseURL: config.BaseURL,
  });
  const forecastAxios = axios.create({
    baseURL: config.ForeCastURL,
  });
  const airPollutionAxios = axios.create({
    baseURL: config.AirPollutionURL,
  });

  async function getCityWeather(latLonData: { lon: number; lat: number }) {
    const lat = latLonData.lat;
    const lon = latLonData.lon;
    const requestURL = `?lat=${lat}&lon=${lon}&appid=${API_ID}&units=metric`;
    try {
      const response = await openWeatherAxios.get(requestURL).then((response) => response.data);

      return response;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  async function getForecast(latLonData: { lat: number; lon: number }) {
    const lat = latLonData.lat;
    const lon = latLonData.lon;
    const reqURL = `?lat=${lat}&lon=${lon}&appid=${API_ID}&units=metric`;

    try {
      const response = await forecastAxios.get(reqURL).then((res) => res.data);
      return response;
    } catch (error) {
      console.error('Forecast API 문제가 있습니다.', error);
    }
  }

  async function getAirPollution(latLonData: { lat: number; lon: number }) {
    const lat = latLonData.lat;
    const lon = latLonData.lon;
    // const reqURL = `?lat=${lat}&lon=${lon}&appid=${API_ID}&units=metric`;

    try {
      const response = await airPollutionAxios
        .get('', {
          params: {
            lat,
            lon,
            appid: API_ID,
            units: 'metric',
          },
        })
        .then((res) => res.data);
      return response;
    } catch (error) {
      console.error('AirPollution API 문제가 있습니다.', error);
    }
  }

  return { getCityWeather, getForecast, getAirPollution };
};

export default useOpenWeatherAPI;
