import * as yup from 'yup';

export const passHolderSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  identityDocument: yup.string().required(),
  email: yup.string().email().required(),
  foodPreference: yup.string(),
});
