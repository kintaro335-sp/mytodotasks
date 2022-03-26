/// <reference path="./RegisterForm.d.ts" />
import React, { useState } from 'react';
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
import { register } from '../../../api/users';
import useAuth from '../../../hooks/useAuth';

export default function RegisterForm(): JSX.Element {
  const { checkAuth } = useAuth();
  const [msg, setMsg] = useState('');
  return (
    <>
      <Card>
        <CardHeader title="registrarse" />
        <CardContent>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            onSubmit={async (values: Values, { setSubmitting }) => {
              setSubmitting(true);
              const { username, password } = values;
              await register(username, password).catch((err) => {
                if (err.isAxiosError) {
                  setMsg(err.response.data.message);
                  setTimeout(() => setMsg(''), 3500);
                } else {
                  console.log(err);
                }
              });
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
              {msg}
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
