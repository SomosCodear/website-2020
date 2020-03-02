import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { passHolderSchema } from '../../data/order/schemas';
import { setOrderPassInfo } from '../../data/order/actions';
import { getPassHolder } from '../../data/order/selectors';
import {
  CheckoutLayout,
  CheckoutTitle,
  CheckoutActions,
  CheckoutAction,
} from '../../layouts/checkout';
import { TextBox, ErrorNugget } from '../../style/lilac/components';

const FormWrapper = styled(Form)`
  display: block;
  padding: 0 2rem;
`;

const Checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = useCallback((values) => {
    dispatch(setOrderPassInfo(0, values));
    router.push('/checkout/pass');
  }, [dispatch, router]);
  const passHolder = useSelector((state) => getPassHolder(state, 0));

  return (
    <CheckoutLayout>
      <CheckoutTitle
        title="Completá tus datos"
        description="Para generar tu pase, necesitaremos: nombre y apellido, DNI o pasaporte y dirección de correo electrónico."
      />
      <Formik
        initialValues={passHolder}
        validationSchema={passHolderSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid, submitCount }) => (
          <FormWrapper>
            <Field
              as={TextBox}
              id="firstName"
              name="firstName"
              label="Nombre"
            />
            <Field
              as={TextBox}
              id="lastName"
              name="lastName"
              label="Apellido"
            />
            <Field
              as={TextBox}
              id="identityDocument"
              name="identityDocument"
              label="DNI o Pasaporte"
            />
            <Field
              as={TextBox}
              id="email"
              name="email"
              label="E-mail"
              type="email"
            />
            {submitCount > 0 && !isValid ? (
              <ErrorNugget>
                Revisá estos datos.
              </ErrorNugget>
            ) : null}
            <CheckoutActions>
              <CheckoutAction type="submit" disabled={isSubmitting} />
            </CheckoutActions>
          </FormWrapper>
        )}
      </Formik>
    </CheckoutLayout>
  );
};

export default Checkout;
