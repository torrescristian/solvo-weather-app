import { Button, TextField, Stack, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormData {
  email: string;
  password: string;
}

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
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handleClickSubmit = (data: IFormData) => {
    console.log({ data });
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
    <form onSubmit={handleSubmit}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        width="60vw"
        marginX="auto"
        pt={4}
      >
        <TextField
          fullWidth
          label="Email"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" color="primary" variant="contained" fullWidth>
          Login
        </Button>
      </Stack>
    </form>
  );
}
