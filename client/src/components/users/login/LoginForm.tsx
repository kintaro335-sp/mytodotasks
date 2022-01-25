/// <reference path="./LoginForm.d.ts" />
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Box,
  Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
// eslint-disable-next-line
import { Form, Formik, Field, FieldProps } from 'formik';
import { login } from 'src/api/users';
import useAuth from 'src/hooks/useAuth';

export default function LoginForm(): JSX.Element {
  const { checkAuth } = useAuth();

  return (
    <>
      <Card>
        <CardHeader title="iniciar sesion" />
        <CardContent>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            onSubmit={async (values: Values, { setSubmitting }) => {
              setSubmitting(true);
              const { username, password } = values;
              await login(username, password);
              await checkAuth();
              setSubmitting(false);
            }}
            validationSchema={yup.object().shape({
              username: yup.string().required('required'),
              password: yup.string().required('required')
            })}
          >
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field
                    id="username"
                    name="username"
                    render={({
                      field,
                      form: { values, errors, touched }
                    }: FieldProps) => (
                      <TextField
                        label="Nombre de usuario"
                        {...field}
                        value={values.username}
                        error={
                          Boolean(touched.password) && Boolean(errors.password)
                        }
                        helperText={
                          Boolean(touched.password) && errors.password
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    id="password"
                    name="password"
                    render={({
                      field,
                      form: { values, errors, touched }
                    }: FieldProps) => (
                      <TextField
                        label="contraseña"
                        type="password"
                        {...field}
                        value={values.password}
                        error={
                          Boolean(touched.password) && Boolean(errors.password)
                        }
                        helperText={
                          Boolean(touched.password) && errors.password
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Box sx={{ padding: '2%' }}>
                <LoadingButton variant="contained" type="submit">
                  Login
                </LoadingButton>
              </Box>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </>
  );
}
