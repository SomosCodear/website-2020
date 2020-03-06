import R from 'ramda';
import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { useRedirect } from '../../hooks/useRedirect';
import { conditionallyFetchItems } from '../../utils/dataFetching';
import { getPassHolder, isOrderProcessed } from '../../data/order/selectors';
import { getCustomer } from '../../data/customer/selectors';
import { setCustomerData } from '../../data/customer/actions';
import { customerSchema } from '../../data/customer/schemas';
import {
  CheckoutLayout,
  CheckoutTitle,
  CheckoutActions,
  CheckoutAction,
} from '../../layouts/checkout';
import { TextBox, ErrorNugget } from '../../style/lilac/components';
import { OrderDetails } from '../../components/OrderDetails';

const Fields = styled.div`
  padding: 0 2rem;
`;

const CheckoutFourthStep = () => {
  useRedirect(isOrderProcessed, '/checkout/confirmation');

  const dispatch = useDispatch();
  const router = useRouter();

  const customer = useSelector(getCustomer);
  const firstPassHolder = useSelector((store) => getPassHolder(store, 0));

  const initialValues = useMemo(
    () => R.defaultTo({
      identityDocument: firstPassHolder.identityDocument,
      firstName: `${firstPassHolder.firstName} ${firstPassHolder.lastName}`,
      email: firstPassHolder.email,
    })(customer),
    [customer, firstPassHolder],
  );

  const onSubmit = useCallback((values) => {
    dispatch(setCustomerData(values));
    router.push('/checkout/confirmation');
  }, [dispatch, router]);

  return (
    <CheckoutLayout>
      <CheckoutTitle
        title="¿A quién le emitimos la factura?"
        description="Los siguientes datos son necesarios para poder generar tu factura electrónica."
      />
      <Formik
        initialValues={initialValues}
        validationSchema={customerSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid, submitCount }) => (
          <Form>
            <Fields>
              <Field
                as={TextBox}
                id="identityDocument"
                name="identityDocument"
                label="Número de documento o CUIT"
                small
              />
              <Field
                as={TextBox}
                id="firstName"
                name="firstName"
                label="Nombre y apellido o razón social"
                medium
              />
              <Field
                as={TextBox}
                id="email"
                name="email"
                label="Dirección de correo electrónico"
                type="email"
                large
              />
              {submitCount > 0 && !isValid ? (
                <ErrorNugget>
                  Revisá estos datos.
                </ErrorNugget>
              ) : null}
            </Fields>
            <OrderDetails>
              <CheckoutActions>
                <CheckoutAction
                  onClick={router.back}
                  disabled={isSubmitting}
                  backButton
                />
                <CheckoutAction
                  type="submit"
                  disabled={isSubmitting}
                />
              </CheckoutActions>
            </OrderDetails>
          </Form>
        )}
      </Formik>
    </CheckoutLayout>
  );
};

CheckoutFourthStep.getInitialProps = async ({ store, isServer }) => {
  await conditionallyFetchItems(store, isServer);

  return {};
};

export default CheckoutFourthStep;
