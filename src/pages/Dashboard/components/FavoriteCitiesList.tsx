import { Box } from '@mui/material';

import useFavoriteCitiesWeatherQuery from '../../../state/hooks/useFavoriteCitiesWeatherQuery';
import FavoriteWeatherCard from './FavoriteWeatherCard';

export default function FavoriteCitiesList() {
  const fcwq = useFavoriteCitiesWeatherQuery();

  return (
    <Box sx={{ p: 2, m: 3, display: 'flex', height: '150px', overflowX: 'scroll', justifyContent: 'center' }}>
      {fcwq.isSuccess && fcwq.data.map((w, index) => (
        <FavoriteWeatherCard key={[w.coord.lat, w.coord.lon, index].join('-')} weather={w} />
      ))}
    </Box>
  );
}
