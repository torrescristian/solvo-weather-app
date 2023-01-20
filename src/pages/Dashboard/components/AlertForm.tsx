import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import useAlertQuery, {
  IAlert,
  operators,
} from '../../../state/hooks/useAlertQuery';
import useAlertMutation from '../../../state/hooks/useAlertMutation';

export default function AlertForm() {
  const [enableUpdate, setEnableUpdate] = useState(false);

  const alertQuery = useAlertQuery();
  const alertMutation = useAlertMutation();

  const schema = yup
    .object({
      operator: yup.string().oneOf(operators).required(),
      temperature: yup.number().lessThan(100).moreThan(-100).required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<IAlert>({
    resolver: yupResolver(schema),
    defaultValues: {
      operator: alertQuery.data?.operator,
      temperature: alertQuery.data?.temperature,
    },
  });

  watch();

  const handleClickSubmit = (data: IAlert) => {
    console.log('mutate', data);
    alertMutation.mutate(data);
  };

  const handleClickToggleEnableUpdate = () => {
    setEnableUpdate(!enableUpdate);
  };

  useEffect(() => {
    if (!alertQuery.isSuccess) return;

    const { operator, temperature } = alertQuery.data;

    setValue('operator', operator);
    setValue('temperature', temperature);

    console.log({ operator, temperature });
  }, [
    alertQuery.isSuccess,
    alertQuery.data?.operator,
    alertQuery.data?.temperature,
  ]);

  return (
    <form onSubmit={handleSubmit(handleClickSubmit)}>
      <Stack
        flexDirection="row"
        sx={{ marginX: 'auto' }}
        alignItems="center"
        justifyContent="center"
      >
        <Typography>
          Notify when temperature is{' '}
          {!enableUpdate &&
            getValues().operator &&
            getValues().temperature &&
            getValues().operator.split('_').join(' ') +
              ' ' +
              getValues().temperature +
              '℃'}
        </Typography>

        {enableUpdate && (
          <>
            <FormControl
              sx={{
                ml: 2,
              }}
            >
              <InputLabel id="select-operator">Operator</InputLabel>

              <Select
                labelId="select-operator"
                disabled={!enableUpdate}
                sx={{
                  width: '10rem',
                }}
                {...register('operator')}
              >
                {operators.map((op) => (
                  <MenuItem key={op} value={op}>
                    {op.split('_').join(' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Temperature"
              disabled={!enableUpdate}
              sx={{ width: '10rem', ml: 2 }}
              error={!!errors.temperature}
              helperText={errors.temperature?.message}
              InputProps={{
                endAdornment: <InputAdornment position="end">℃</InputAdornment>,
              }}
              {...register('temperature')}
            />
          </>
        )}

        <Button
          variant="contained"
          color={enableUpdate ? 'success' : 'warning'}
          onClick={handleClickToggleEnableUpdate}
          type={enableUpdate ? 'button' : 'submit'}
          disabled={!alertQuery.isSuccess}
          sx={{
            ml: 2,
          }}
        >
          {enableUpdate ? 'Save Changes' : 'Modify Alert'}
        </Button>
      </Stack>
    </form>
  );
}
