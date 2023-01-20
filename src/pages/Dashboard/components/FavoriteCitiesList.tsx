import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import useFavoriteCitiesQuery from '../../../state/hooks/useFavoriteCitiesQuery';
import IWeather from '../../../state/interfaces/IWeather';
import fetchWeather from '../../../state/services/fetchWeather';
import FavoriteWeatherCard from './FavoriteWeatherCard';

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
    <Box sx={{ p: 2, m: 3, display: 'flex', height: '150px', overflowX: 'scroll' }}>
      {weathers.map((w, index) => (
        <FavoriteWeatherCard key={[w.coord.lat, w.coord.lon, index].join('-')} weather={w} />
      ))}
    </Box>
  );
}
