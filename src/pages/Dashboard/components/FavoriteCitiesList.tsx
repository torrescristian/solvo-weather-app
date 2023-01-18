import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import useFavoriteCitiesQuery from '../../../state/hooks/useFavoriteCitiesQuery';
import IWeather from '../../../state/interfaces/IWeather';
import fetchWeather from '../../../state/services/fetchWeather';
import WeatherCard from './WeatherCard';

export default function FavoriteCitiesList() {
  const fcq = useFavoriteCitiesQuery();
  const [weathers, setWeathers] = useState<IWeather[]>([]);

  useEffect(() => {
    const fn = async () => {
      if (!fcq.isSuccess) return;

      const _weathers = await Promise.all(fcq.data.map(fetchWeather));

      setWeathers(_weathers);
    };

    fn();
  }, [fcq.data]);

  return (
    <Paper elevation={2} sx={{ p: 2, m: 3 }}>
      {weathers.map((w) => (
        <WeatherCard key={[w.coord.lat, w.coord.lon].join('-')} weather={w} />
      ))}
    </Paper>
  );
}
