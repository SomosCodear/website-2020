import R from 'ramda';
import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { BREAKPOINTS } from '../../style/constants';
import { conditionallyFetchItems } from '../../utils/dataFetching';
import { getPassHolder } from '../../data/order/selectors';
import { getCustomer } from '../../data/customer/selectors';
import { setCustomerData } from '../../data/customer/actions';
import { customerSchema } from '../../data/customer/schemas';
import {
  CheckoutStep,
  CheckoutTitle,
  CheckoutActions,
  CheckoutAction,
} from '../../layouts/checkout';
import { TextBox, ErrorNugget } from '../../style/lilac/components';
import { OrderDetails } from '../../components/OrderDetails';

const Wrapper = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const FormWrapper = styled(Form)`
  @media (min-width: ${BREAKPOINTS.hd}) {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
`;

const FormContent = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-grow: 1;
  }
`;

const CheckoutTitleWrapper = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    > * {
      margin-bottom: 0;
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: var(--color-text);
  margin: 0 0 1.875rem 0;
  line-height: 1.375rem;
  text-align: center;
  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 2.25rem;
    line-height: 2.6875rem;
    font-weight: lighter;
    text-align: left;
    margin-top: 0.4375rem;
  }
`;

const OrderDetailsWrapper = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    padding-top: 1rem;
  }
`;

const Fields = styled.div`
  padding: 0 2rem;
  @media (min-width: ${BREAKPOINTS.hd}) {
    padding-left: 0;
  }
`;

const StyledTextBox = styled(TextBox)`
  margin: 0 0 0.85rem;
`;

const Invoice = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const customer = useSelector(getCustomer);
  const firstPassHolder = useSelector((store) => getPassHolder(store, 0));

  const initialValues = useMemo(
    () => (
      firstPassHolder != null
        ? R.defaultTo({
          identityDocument: firstPassHolder.identityDocument,
          firstName: `${firstPassHolder.firstName} ${firstPassHolder.lastName}`,
          email: firstPassHolder.email,
        })(customer)
        : customer
    ),
    [customer, firstPassHolder],
  );

  const onSubmit = useCallback((values) => {
    dispatch(setCustomerData(values));
    router.push('/checkout/confirmation');
  }, [dispatch, router]);

  return (
    <CheckoutStep>
      <Wrapper>
        <CheckoutTitleWrapper>
          <CheckoutTitle
            title="Datos de facturación"
          />
        </CheckoutTitleWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={customerSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid, submitCount }) => (
            <FormWrapper>
              <FormContent>
                <Fields>
                  <Subtitle>
                    Los siguientes datos son necesarios para poder generar tu factura electrónica.
                  </Subtitle>
                  <Field
                    as={StyledTextBox}
                    id="identityDocument"
                    name="identityDocument"
                    label="Número de documento o CUIT"
                    autoWidth
                  />
                  <Field
                    as={StyledTextBox}
                    id="firstName"
                    name="firstName"
                    label="Nombre y apellido o razón social"
                  />
                  <Field
                    as={StyledTextBox}
                    id="email"
                    name="email"
                    label="Dirección de correo electrónico"
                    type="email"
                  />
                  {submitCount > 0 && !isValid ? (
                    <ErrorNugget>
                      Revisá estos datos.
                    </ErrorNugget>
                  ) : null}
                </Fields>
                <OrderDetailsWrapper>
                  <OrderDetails>
                    <CheckoutActions hideOnDesktop>
                      <CheckoutAction
                        type="submit"
                        disabled={isSubmitting}
                      />
                      <CheckoutAction
                        onClick={router.back}
                        disabled={isSubmitting}
                        backButton
                      />
                    </CheckoutActions>
                  </OrderDetails>
                </OrderDetailsWrapper>
              </FormContent>
              <CheckoutActions hideOnMobile>
                <CheckoutAction
                  type="submit"
                  disabled={isSubmitting}
                />
                <CheckoutAction
                  onClick={router.back}
                  disabled={isSubmitting}
                  backButton
                />
              </CheckoutActions>
            </FormWrapper>
          )}
        </Formik>
      </Wrapper>
    </CheckoutStep>
  );
};

Invoice.getInitialProps = async ({ store, isServer }) => {
  await conditionallyFetchItems(store, isServer);

  return {};
};

export default Invoice;
