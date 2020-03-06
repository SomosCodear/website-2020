import * as yup from 'yup';

export const customerSchema = yup.object().shape({
  firstName: yup.string().required(),
  identityDocument: yup.string().required(),
  email: yup.string().email().required(),
});
