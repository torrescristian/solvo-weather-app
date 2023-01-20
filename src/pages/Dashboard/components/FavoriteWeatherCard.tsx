import { useMemo } from 'react';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { formatTemp } from '../../../state/utils';
import ICoordinates from '../../../state/interfaces/ICoordinates';
import IWeather from '../../../state/interfaces/IWeather';
import useFavoriteCitiesQuery from '../../../state/hooks/useFavoriteCitiesQuery';
import useToggleAlertMutation from '../../../state/hooks/useToggleAlertMutation';
import useToggleFavoriteMutation from '../../../state/hooks/useToggleFavoriteMutation';

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

const useAlertEnabled = (favorite: ICoordinates) => {
  const favoriteCitiesQuery = useFavoriteCitiesQuery();

  const isFavorite = useFavorite(favorite);

  const alertEnabled = useMemo(() => {
    if (!favoriteCitiesQuery.isSuccess) return false;

    if (!isFavorite) return false;

    const fav = favoriteCitiesQuery.data.find(
      (fc) => fc.lat === favorite.lat && fc.lon === favorite.lon
    );

    return fav?.alertEnabled || false;
  }, [favoriteCitiesQuery]);

  return alertEnabled;
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

export default function FavoriteWeatherCard({ weather }: IProps) {
  const { temp, temp_max, temp_min, humidity, name, country, lat, lon } =
    useWeatherProperties(weather);

  const isFavorite = useFavorite({ lat, lon });
  const alertEnabled = useAlertEnabled({ lat, lon });

  const toggleFavoriteMutation = useToggleFavoriteMutation();
  const toggleAlertMutation = useToggleAlertMutation();

  const handleClickFavorite = () => {
    toggleFavoriteMutation.mutate({ lat, lon });
  };

  const handleClickAlarm = () => {
    toggleAlertMutation.mutate({ lat, lon });
  };

  return !name ? null : (
    <Paper elevation={3} sx={{ width: '12rem', marginX: 2, p: 2 }}>
      <Grid container>
        <Grid
          item
          xs={10}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4">{formatTemp(temp)}ºC</Typography>
          <Typography>
            {name}, {country}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            color="primary"
            component="label"
            onClick={handleClickFavorite}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
          <IconButton
            color="primary"
            component="label"
            onClick={handleClickAlarm}
          >
            {alertEnabled ? (
              <NotificationsActiveIcon />
            ) : (
              <NotificationsNoneIcon />
            )}
          </IconButton>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-around' }}
          gap={1}
        >
          <Typography color="red">{formatTemp(temp_max)}℃</Typography>
          <Typography color="blue">{formatTemp(temp_min)}℃</Typography>
          <Typography color="cyan">{humidity}%</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
