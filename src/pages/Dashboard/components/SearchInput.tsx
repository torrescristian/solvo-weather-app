import {
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

import countryIsoCodes from '../../../state/countryISOCodes';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import fetchGeocoding, {
  IGeoCodingProps,
} from '../../../state/services/fetchGeocoding';
import fetchWeather from '../../../state/services/fetchWeather';
import { useState } from 'react';
import IWeather from '../../../state/interfaces/IWeather';


export const useSearch = () => {
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [notFound, setNotFound] = useState(false);

  const schema = yup
    .object({
      query: yup.string().required(),
      countryCode: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGeoCodingProps>({
    resolver: yupResolver(schema),
  });

  const handleClickSubmit = async (data: IGeoCodingProps) => {
    setNotFound(false);
    const geocoding = await fetchGeocoding(data);

    if (!geocoding) {
      setNotFound(true);
    }

    const _weather = await fetchWeather(geocoding!);

    setWeather(_weather);
  };

  return {
    register,
    errors,
    handleSubmit: handleSubmit(handleClickSubmit),
    weather,
    notFound,
  };
};

type IProps = Pick<ReturnType<typeof useSearch>, 'errors' | 'handleSubmit' | 'register'>

export default function SearchInput({ errors, handleSubmit, register }: IProps) {
  return (
    <form onSubmit={handleSubmit}>
        <Stack p={2} marginX="auto" width="40rem" flexDirection="row">
          <Select
            {...register('countryCode')}
            defaultValue={countryIsoCodes[0].alpha2Code}
            error={!!errors.countryCode}
            sx={{ height: 'fit-content' }}
          >
            {countryIsoCodes.map((code) => (
              <MenuItem key={code.alpha2Code} value={code.alpha2Code}>
                {code.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Search by zipcode or city name"
            fullWidth
            {...register('query')}
            error={!!errors.query}
            helperText={errors.query?.message}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{ flexShrink: 0, height: 'fit-content' }}
          >
            Search
          </Button>
        </Stack>
      </form>
  )
}
