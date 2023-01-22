import { Alert, Box, Divider, Stack } from '@mui/material';
import WeatherCard from './components/WeatherCard';
import FavoriteCitiesList from './components/FavoriteCitiesList';
import SearchInput, { useSearch } from './components/SearchInput';
import AlertForm from './components/AlertForm';

export default function Dashboard() {
  const { errors, handleSubmit, register, weather, notFound } = useSearch();

  return (
    <Stack flexDirection="column" justifyContent="space-between" height="80vh">
      <SearchInput
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
      />
      {notFound ? (
        <Alert severity="error" sx={{ marginX: 'auto', width: '20rem' }}>
          City not found
        </Alert>
      ) : (
        <WeatherCard weather={weather} />
      )}
      <Box>
        <Divider>Favorites</Divider>
        <FavoriteCitiesList />
        <Divider>Alert</Divider>
        <AlertForm />
      </Box>
    </Stack>
  );
}
