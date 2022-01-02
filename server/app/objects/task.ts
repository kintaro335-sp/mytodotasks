import * as yup from 'yup';

const taskSchema = yup.object().shape({
  id: yup.string().min(36),
  done: yup.bool().required(),
  nombre: yup.string().required().min(5),
  descripcion: yup.string().required().min(3)
});

export default taskSchema;
