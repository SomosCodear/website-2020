import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { BREAKPOINTS } from '../../style/constants';
import { passHolderSchema } from '../../data/order/schemas';
import { setOrderPassInfo } from '../../data/order/actions';
import { getPassHolder } from '../../data/order/selectors';
import {
  CheckoutLayout,
  CheckoutTitle,
  CheckoutActions,
  CheckoutAction,
} from '../../layouts/checkout';
import { TextBox, ErrorNugget, Counter } from '../../style/lilac/components';

const FormWrapper = styled(Form)`
  display: block;
  padding: 0 2rem;
  @media (min-width: ${BREAKPOINTS.hd}) {
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Fields = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const BulkBar = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.25rem;
`;

const BulkBarText = styled.p`
  color: var(--color-text);
  font-size: 2.25rem;
  margin: 0 1.25rem 0 0;
  padding-top: 0.3125rem;
`;

const Entries = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Entry = styled.li`
  width: calc(50% - 18px);
  &:nth-child(odd) {
    margin-right: 36px;
  }
`;
const EntryHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const EntryTitle = styled.p`
  font-size: 2.25rem;
  padding-top: 0.5rem;
  margin: 0;
  font-weight: bold;
  color: var(--color-accent);
`;

const ToggleWrapper = styled.div`
  display: none;
  & + * {
    flex-grow: 1;
    margin-left: 0;
  }
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: block;
    & + * {
      flex-grow: 0;
    }
  }
`;

const Checkout = () => {
  const [bulkMode, setBulkMode] = useState(false);
  const toggleBulkMode = () => setBulkMode(!bulkMode);
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = useCallback((values) => {
    dispatch(setOrderPassInfo(0, values));
    router.push('/checkout/pass');
  }, [dispatch, router]);
  const passHolder = useSelector((state) => getPassHolder(state, 0));

  return (
    <CheckoutLayout>
      <Formik
        initialValues={passHolder}
        validationSchema={passHolderSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid, submitCount }) => (
          <FormWrapper>
            <CheckoutTitle
              title="Completá tus datos"
              description="Para generar tu pase, necesitaremos: nombre y apellido, DNI o pasaporte y dirección de correo electrónico."
            >
              {
                bulkMode
                  ? (
                    <BulkBar>
                      <BulkBarText>¿Cuántos pases vas a comprar?</BulkBarText>
                      <Counter
                        value={1}
                        onChange={() => {}}
                        max={6}
                      />
                    </BulkBar>
                  )
                  : null
              }
            </CheckoutTitle>
            {
              bulkMode
                ? (
                  <Entries>
                    {Array.from(new Array(3), (_, ind) => {
                      const i = ind + 1;
                      return (
                        <Entry key={i}>
                          <EntryHeader>
                            <EntryTitle>{`Pase ${i}`}</EntryTitle>
                            <ErrorNugget>
                              Revisá estos datos.
                            </ErrorNugget>
                          </EntryHeader>
                          <Fields>
                            <Field
                              as={TextBox}
                              id="firstName"
                              name="firstName"
                              label="Nombre"
                              medium
                            />
                            <Field
                              as={TextBox}
                              id="lastName"
                              name="lastName"
                              label="Apellido"
                              medium
                            />
                            <Field
                              as={TextBox}
                              id="identityDocument"
                              name="identityDocument"
                              label="DNI/PSP"
                              small
                              inlineLabel
                            />
                            <Field
                              as={TextBox}
                              id="email"
                              name="email"
                              label="E-mail"
                              type="email"
                              large
                              inlineLabel
                            />
                          </Fields>
                        </Entry>
                      );
                    })}
                  </Entries>
                )
                : (
                  <Fields>
                    <Field
                      as={TextBox}
                      id="firstName"
                      name="firstName"
                      label="Nombre"
                      medium
                    />
                    <Field
                      as={TextBox}
                      id="lastName"
                      name="lastName"
                      label="Apellido"
                      medium
                    />
                    <Field
                      as={TextBox}
                      id="identityDocument"
                      name="identityDocument"
                      label="DNI o Pasaporte"
                      small
                    />
                    <Field
                      as={TextBox}
                      id="email"
                      name="email"
                      label="E-mail"
                      type="email"
                      large
                    />
                  </Fields>
                )
            }
            {submitCount > 0 && !isValid ? (
              <ErrorNugget>
                Revisá estos datos.
              </ErrorNugget>
            ) : null}
            <CheckoutActions>
              <ToggleWrapper>
                <CheckoutAction
                  label={bulkMode ? 'Comprar pase individual' : 'Comprar varios pases'}
                  color="accent"
                  onClick={toggleBulkMode}
                />
              </ToggleWrapper>
              <CheckoutAction
                type="submit"
                disabled={isSubmitting}
              />
            </CheckoutActions>
          </FormWrapper>
        )}
      </Formik>
    </CheckoutLayout>
  );
};

export default Checkout;
