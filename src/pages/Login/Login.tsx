import { Button, TextField, Stack, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useLoginMutation, {
  ILoginProps,
} from '../../state/hooks/useLoginMutation';
import Layout from '../../components/Layout';

const useLogin = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginProps>({
    resolver: yupResolver(schema),
  });

  const loginMutation = useLoginMutation();

  const handleClickSubmit = (data: ILoginProps) => {
    loginMutation.mutate(data);
  };

  return {
    register,
    errors,
    handleSubmit: handleSubmit(handleClickSubmit),
  };
};


export default function Login() {
  const { errors, handleSubmit, register } = useLogin();

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          width="35rem"
          marginX="auto"
          pt={4}
        >
          <TextField
            error={!!errors.email}
            fullWidth
            helperText={errors.email?.message}
            label="Email"
            type="email"
            {...register('email')}
          />
          <TextField
            error={!!errors.password}
            fullWidth
            helperText={errors.password?.message}
            label="Password"
            type="password"
            {...register('password')}
          />
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Login
          </Button>
          <Alert severity="info">
            The email is "admin@admin.com" and password is "admin"
          </Alert>
        </Stack>
      </form>
    </Layout>
  );
}
