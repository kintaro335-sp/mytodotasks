import * as yup from 'yup';

const taskSchema = yup.object().shape({
  id: yup.string().min(36),
  done: yup.bool().required(),
  nombre: yup.string().required().min(10).max(50),
  descripcion: yup.string().required().max(16777214)
});

export default taskSchema;
