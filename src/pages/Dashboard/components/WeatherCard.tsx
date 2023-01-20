import { Grid, IconButton, Paper, Typography } from '@mui/material';
import IWeather from '../../../state/interfaces/IWeather';
import { formatTemp } from '../../../state/utils';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useToggleFavoriteMutation from '../../../state/hooks/useToggleFavoriteMutation';
import { useMemo } from 'react';
import useFavoriteCitiesQuery from '../../../state/hooks/useFavoriteCitiesQuery';
import ICoordinates from '../../../state/interfaces/ICoordinates';

interface IProps {
  weather: IWeather | null;
}

const useFavorite = ({ lat, lon }: ICoordinates) => {
  const favoriteCitiesQuery = useFavoriteCitiesQuery();

  const isFavorite = useMemo(() => {
    if (!favoriteCitiesQuery.isSuccess) return false;

    return (
      favoriteCitiesQuery.data!.find(
        (fc) => fc.lat === lat && fc.lon === lon
      ) || false
    );
  }, [favoriteCitiesQuery]);

  return isFavorite;
};

const useWeatherProperties = (weather: IWeather | null) => {
  return useMemo(
    () =>
      !weather
        ? ({} as any)
        : {
            ...weather,
            ...weather.main,
            ...weather.sys,
            ...weather.coord,
          },
    [weather]
  );
};

export default function WeatherCard({ weather }: IProps) {
  const { temp, temp_max, temp_min, humidity, name, country, lat, lon } =
    useWeatherProperties(weather);

  const isFavorite = useFavorite({ lat, lon });

  const toggleFavoriteMutation = useToggleFavoriteMutation();

  const handleClickFavorite = () => {
    toggleFavoriteMutation.mutate({ lat, lon });
  };

  return !name ? null : (
    <Paper elevation={3} sx={{ width: '25rem', marginX: 'auto', p: 4, marginY: 2 }}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h2">{formatTemp(temp)}ºC</Typography>
          <Typography>
            {name}, {country}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6" color="red">
            max {formatTemp(temp_max)}℃
          </Typography>
          <Typography variant="h6" color="blue">
            min {formatTemp(temp_min)}℃
          </Typography>
          <Typography variant="h6" color="cyan">
            humidity {humidity}%
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            color="primary"
            component="label"
            onClick={handleClickFavorite}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}
