/// <reference path="./PasswdFrom.d.ts" />
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Button
} from '@mui/material';
import * as yup from 'yup';
// eslint-disable-next-line
import { Formik, Form, Field, FieldProps } from 'formik';
import { changePassword } from 'src/api/users';

export default function PasswdForm() {
  const [msg, setMsg] = useState('');
  return (
    <Card>
      <CardHeader title="Cambiar contraseña" />
      <CardContent>
        <Formik
          initialValues={{
            password: '',
            newPassword: ''
          }}
          validationSchema={yup.object().shape({
            password: yup.string().min(8),
            newPassword: yup.string().min(8)
          })}
          onSubmit={async (values: ValuesPasswd, { setSubmitting }) => {
            try {
              const { password, newPassword } = values;
              setSubmitting(true);
              await changePassword(password, newPassword)
                .then((resp) => {
                  setMsg(resp.message);
                  setTimeout(() => setMsg(''), 3500);
                })
                .catch((err) => {
                  if (err.isAxiosError) {
                    setMsg(err.response.data.message);
                    setTimeout(() => setMsg(''), 3500);
                  } else {
                    console.log(err);
                  }
                });
              setSubmitting(false);
            } catch (err) {
              console.error(err);
              setSubmitting(false);
            }
          }}
        >
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  id="password"
                  name="password"
                  render={({
                    field,
                    form: { values, errors, touched }
                  }: FieldProps) => (
                    <TextField
                      label="Password"
                      type="password"
                      {...field}
                      value={values.password}
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText={Boolean(touched.password) && errors.password}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  id="newPassword"
                  name="newPassword"
                  render={({
                    field,
                    form: { values, errors, touched }
                  }: FieldProps) => (
                    <TextField
                      label="New Pasword"
                      type="password"
                      {...field}
                      value={values.newPassword}
                      error={
                        Boolean(touched.newPassword) &&
                        Boolean(errors.newPassword)
                      }
                      helperText={
                        Boolean(touched.newPassword) && errors.newPassword
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
            {msg}
            <CardActions>
              <Button type="submit">Change Password</Button>
            </CardActions>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}
