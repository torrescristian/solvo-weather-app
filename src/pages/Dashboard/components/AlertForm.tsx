import {
  Button,
  FormControl,
  Grid,
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
import { formatOperator } from '../../../state/utils';

export default function AlertForm() {
  const [enableUpdate, setEnableUpdate] = useState(false);

  const alertQuery = useAlertQuery();
  const alertMutation = useAlertMutation();

  const schema = yup
    .object({
      operator: yup.string().oneOf(operators).required(),
      temperature: yup.number().lessThan(100).moreThan(-100).required(),
      checkFrequency: yup
        .number()
        .integer()
        .moreThan(0)
        .lessThan(Number.MAX_SAFE_INTEGER)
        .required(),
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
  });

  watch();

  const handleClickSubmit = (data: IAlert) => {
    handleClickToggleEnableUpdate();

    alertMutation.mutate(data);
  };

  const handleClickToggleEnableUpdate = () => {
    setEnableUpdate(!enableUpdate);
  };

  useEffect(() => {
    if (!alertQuery.isSuccess) return;

    const { operator, temperature, checkFrequency } = alertQuery.data;

    console.log(alertQuery.data);

    setValue('operator', operator);
    setValue('temperature', temperature);
    setValue('checkFrequency', checkFrequency);
  }, [alertQuery.data]);

  const CompleteText = () => {
    if (enableUpdate) return null;

    const { operator, checkFrequency, temperature } = getValues();

    if (!operator || !temperature || !checkFrequency) return null;

    return (
      <Typography>
        Notify every {checkFrequency / 1000} seconds when a favorite city is{' '}
        {formatOperator(operator)} {temperature} ℃
      </Typography>
    );
  };

  if (!enableUpdate)
    return (
      <Stack
        flexDirection="row"
        sx={{ marginX: 'auto' }}
        alignItems="center"
        justifyContent="center"
      >
        <CompleteText />
        <Button
          variant="contained"
          color="warning"
          onClick={handleClickToggleEnableUpdate}
          disabled={!alertQuery.isSuccess}
          sx={{
            ml: 2,
          }}
        >
          Modify Alert
        </Button>
      </Stack>
    );

  return (
    <form onSubmit={handleSubmit(handleClickSubmit)}>
      <Grid
        container
        width="40rem"
        sx={{ marginX: 'auto' }}
        alignItems="center"
        gap={1}
        mt={2}
        gridTemplateColumns="repeat(auto, 3)"
      >
        <Grid item xs={4}>
          <Typography textAlign="right">Notify when temperature is </Typography>
        </Grid>
        <Grid item xs="auto">
          <FormControl
            sx={{
              ml: 2,
            }}
          >
            <InputLabel id="select-operator">Operator</InputLabel>

            <Select
              labelId="select-operator"
              sx={{
                width: '10rem',
              }}
              {...register('operator')}
            >
              {operators.map((op) => (
                <MenuItem key={op} value={op}>
                  {formatOperator(op)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Temperature"
            sx={{ width: '10rem', ml: 2 }}
            error={!!errors.temperature}
            helperText={errors.temperature?.message}
            InputProps={{
              endAdornment: <InputAdornment position="end">℃</InputAdornment>,
            }}
            {...register('temperature')}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography textAlign="right">and check every</Typography>
        </Grid>
        <Grid item xs="auto">
          <TextField
            label="Frequency"
            sx={{ width: '10rem', ml: 2 }}
            error={!!errors.checkFrequency}
            helperText={errors.checkFrequency?.message}
            InputProps={{
              endAdornment: <InputAdornment position="end">ms</InputAdornment>,
            }}
            {...register('checkFrequency')}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={!alertQuery.isSuccess}
            sx={{
              ml: 2,
            }}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
