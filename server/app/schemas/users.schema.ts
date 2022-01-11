import * as yup from 'yup';

const useridSchema = yup.string().min(36);

const userNameSchema = yup.string().min(1).max(30);

const passwordSchema = yup.string().min(8).max(30);

const userSchema = yup.object().shape({
  id: useridSchema,
  username: userNameSchema.required(),
  password: passwordSchema.required()
});

export default userSchema;
