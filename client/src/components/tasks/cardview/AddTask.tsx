/// <reference path="./AddTask.d.ts" />
import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
  Checkbox,
  Box
} from '@mui/material';
// eslint-disable-next-line
import { Form, Formik, Field, FieldProps } from 'formik';
import { addTask } from '../../../api/tasks';
import useTasksC from '../../../hooks/useTasksC';
// schema
import { taskSchema } from '../../../utils/schemas/taskSchema';

export default function AddTask() {
  const [addT, setAddT] = useState(false);
  const [msgE, setMsgE] = useState('');
  const { updateTasks } = useTasksC();

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        {addT ? (
          <Formik
            initialValues={{ nombre: '', descripcion: '', done: false }}
            onSubmit={async (
              values: taskTAdd,
              { setSubmitting, resetForm }
            ) => {
              try {
                setSubmitting(true);
                await addTask({
                  done: values.done,
                  nombre: values.nombre,
                  descripcion: values.descripcion
                })
                  .then((resp) => {
                    setMsgE(resp.message);
                    setTimeout(() => setMsgE(''), 3500);
                    updateTasks();
                    resetForm();
                  })
                  .catch((err) => {
                    if (err.isAxiosError) {
                      setMsgE(err.response.data.message);
                      setTimeout(() => setMsgE(''), 3500);
                    } else {
                      console.error(err);
                    }
                  });
              } catch (err) {
                console.error(err);
              }
            }}
            validationSchema={taskSchema}
          >
            <Form autoComplete="off">
              <CardHeader
                title={
                  <Field
                    id="nombre"
                    name="nombre"
                    render={({
                      field,
                      form: { values, errors, touched }
                    }: FieldProps) => (
                      <TextField
                        label="Nombre"
                        {...field}
                        value={values.nombre}
                        error={
                          Boolean(touched.nombre) && Boolean(errors.nombre)
                        }
                        helperText={Boolean(touched.nombre) && errors.nombre}
                        fullWidth
                      />
                    )}
                  />
                }
                action={
                  <Field
                    id="done"
                    name="done"
                    render={({
                      field,
                      form: { values, setFieldValue }
                    }: FieldProps) => (
                      <Checkbox
                        {...field}
                        checked={Boolean(values.done)}
                        onChange={(e) => {
                          setFieldValue('done', e.target.checked);
                        }}
                      />
                    )}
                  />
                }
              />
              <CardContent>
                <Field
                  id="descripcion"
                  name="descripcion"
                  render={({
                    field,
                    form: { values, errors, touched }
                  }: FieldProps) => (
                    <TextField
                      {...field}
                      label="Descripcion"
                      value={values.descripcion}
                      error={
                        Boolean(touched.descripcion) &&
                        Boolean(errors.descripcion)
                      }
                      helperText={
                        Boolean(touched.descripcion) && errors.descripcion
                      }
                      multiline
                      minRows={3}
                      maxRows={6}
                      fullWidth
                    />
                  )}
                />
                {msgE}
                <CardActions>
                  <Button type="submit">Guardar</Button>
                </CardActions>
              </CardContent>
            </Form>
          </Formik>
        ) : (
          <CardContent>
            <Box sx={{ width: '100%', height: '100%' }}>
              <Button
                sx={{ width: '100%', height: '100%' }}
                onClick={() => setAddT(true)}
              >
                Agregar Tarea
              </Button>
            </Box>
          </CardContent>
        )}
      </Card>
    </Grid>
  );
}
