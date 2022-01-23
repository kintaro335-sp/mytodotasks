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

export default function LoginForm(): JSX.Element {
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
              setSubmitting(false);
            }}
          >
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field
                    id="username"
                    name="username"
                    render={({ field, form: { values } }: FieldProps) => (
                      <TextField
                        label="Nombre de usuario"
                        {...field}
                        value={values.username}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    id="password"
                    name="password"
                    render={({ field, form: { values } }: FieldProps) => (
                      <TextField
                        label="contraseña"
                        type="password"
                        {...field}
                        value={values.password}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Box>
                <LoadingButton type="submit">submit</LoadingButton>
              </Box>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </>
  );
}
