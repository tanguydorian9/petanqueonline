import { useState, useEffect } from 'react';

export function useWeather(latitude, longitude) {
  const [temp, setTemp] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const data = await res.json();
        setTemp(Math.round(data.current_weather.temperature));
        setWeatherCode(data.current_weather.weathercode);
      } catch {
        setTemp(12);
        setWeatherCode(0);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  return { temp, weatherCode, loading };
}
