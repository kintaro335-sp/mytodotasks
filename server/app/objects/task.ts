import * as yup from 'yup';

const taskSchema = yup.object().shape({
  id: yup.string(),
  done: yup.bool().required(),
  nombre: yup.string().required(),
  descripcion: yup.string().required()
});

export default taskSchema;
