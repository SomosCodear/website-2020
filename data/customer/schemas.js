import * as yup from 'yup';
import { api, CUSTOMER } from '../api';
import { buildCustomerAuthenticationHeaders } from './utils';

export const customerSchema = yup.object().shape({
  firstName: yup.string().required(),
  identityDocument: yup.string().required(),
  email: yup.string().email().required(),
}).test(
  'is-verified',
  'Parece que ya realizaste un compra con este email, asegurate de usar el mismo documento',
  async function validate({ email, identityDocument }) {
    let result;

    if (email != null && identityDocument != null) {
      try {
        await api.findAll(CUSTOMER, {
          headers: buildCustomerAuthenticationHeaders(email, identityDocument),
          postfix: '/verify/',
        });

        result = true;
      } catch (e) {
        result = this.createError({ path: 'identityDocument' });
      }
    }

    return result;
  },
);
