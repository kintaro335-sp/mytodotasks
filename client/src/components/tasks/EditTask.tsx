/// <reference path="EditTask.d.ts" />
import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  TextField,
  Grid,
  Checkbox,
  Button
} from '@mui/material';
import { Edit, Close } from '@mui/icons-material';
import * as yup from 'yup';
// eslint-disable-next-line
import { Form, Formik, Field, FieldProps } from 'formik';
// api
import { updateTask } from 'src/api/tasks';
import useTasksC from 'src/hooks/useTasksC';

export default function EditTask({ task }: EditTaskProps) {
  const { id, nombre, descripcion, done } = task;
  const [open, setOpen] = useState(false);
  const [msgE, setMsgE] = useState('');
  const { updateTasks } = useTasksC();

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={clickOpen}>
        <Edit />
      </IconButton>
      <Dialog open={open} onClose={clickClose} maxWidth="lg">
        <AppBar position="relative">
          <Toolbar>
            <IconButton onClick={clickClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Formik
            initialValues={{ nombre, descripcion, done: Boolean(done) }}
            onSubmit={async (values: ValuesTask, { setSubmitting }) => {
              try {
                setSubmitting(true);
                await updateTask({
                  id,
                  done: values.done,
                  nombre: values.nombre,
                  descripcion: values.descripcion
                })
                  .then((resp) => {
                    setMsgE(resp.message);
                    setTimeout(() => setMsgE(''), 3500);
                    updateTasks();
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
            validationSchema={yup.object().shape({
              done: yup.bool().required(),
              nombre: yup.string().required().min(10).max(50),
              descripcion: yup.string().required().max(16777214)
            })}
          >
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={1}>
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
                </Grid>
                <Grid item xs={11}>
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
                </Grid>
                <Grid item xs={12}>
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
                        maxRows={8}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>
              {msgE}
              <DialogActions>
                <Button type="submit">Guardar</Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
