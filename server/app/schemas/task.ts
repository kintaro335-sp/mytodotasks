import * as yup from 'yup';

const taskSchema = yup.object().shape({
  id: yup.string().min(36),
  done: yup.bool().required(),
  nombre: yup.string().required().min(3).max(50),
  descripcion: yup.string().max(16777214)
});

export default taskSchema;
