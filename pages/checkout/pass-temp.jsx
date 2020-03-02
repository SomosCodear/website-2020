/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { BREAKPOINTS } from '../../style/constants';
import { RadioGroup } from '../../components/RadioGroup';
import { ItemPrice } from '../../components/ItemPrice';
import {
  CheckoutLayout,
  CheckoutTitle,
  CheckoutActions,
  CheckoutAction,
} from '../../layouts/checkout';

const Disclaimer = styled.p`
  font-size: 0.875rem;
  color: var(--color-text);
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'flex')};
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: ${({ hideOnDesktop }) => (hideOnDesktop ? 'none' : 'flex')};
  }
`;

const Total = styled.div`
  text-align: center;
  margin: 1.9375rem 0 2.1875rem 0;
`;

const TotalLabel = styled.h2`
  font-size: 2.25rem;
  color: var(--color-gray-lighter);
  font-weight: lighter;
  margin: 0;
  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 4.5rem;
    color: var(--color-accent);
  }
`;

const TotalPrice = styled.strong`
  font-size: 4.5rem;
  color: var(--color-text);
  display: block;
`;

const RadioButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

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

const FormContent = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Subtitle = styled.div`
  display: none;
  color: var(--color-text);
  font-size: 2.25rem;
  line-height: 2.6875rem;
  font-weight: lighter;
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: block;
  }

  strong {
    color: var(--color-accent);
  }

  p {
    margin: 2.25rem 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

/**
 * This is necessary so the radio buttons will be aligned on the same Y no matter
 * the width of their labels.
 */
const RadioButtons = styled.div``;

const CheckoutSecondStep = () => {
  const router = useRouter();
  const items = [
    {
      name: 'Full',
      id: 'full',
    },
    {
      name: 'Simple (29/05)',
      id: 'simple-1',
    },
    {
      name: 'Simple (30/05)',
      id: 'simple-2',
    },
  ];
  const [item] = items;
  const onSubmit = () => {};

  return (
    <CheckoutLayout>
      {items.length > 0 ? (
        <Formik
          initialValues={{ item: item != null ? item : items[0].id }}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <FormWrapper>
              <CheckoutTitle
                title="Elegí el tipo de pase"
                description="Un pase Full te dará acceso a toda la conferencia durante los dos días del evento, 29 y 30 de mayo."
                hideDescriptionOnDesktop
              >
                <Subtitle>
                  <p>
                    Un pase <strong>Full</strong> te dará acceso a toda la conferencia durante
                    los días del evento, 29 y 30 de mayo.
                  </p>
                  <p>
                    Un pase <strong>Simple</strong> te dará acceso al día de conferencia que
                    elijas.
                  </p>
                </Subtitle>
              </CheckoutTitle>
              <FormContent>
                <RadioButtonsContainer>
                  <RadioButtons>
                    <RadioGroup
                      name="item"
                      options={items.map(({ id, name }) => ({ label: name, value: id }))}
                    />
                  </RadioButtons>
                </RadioButtonsContainer>
                <Total>
                  <TotalLabel>Tu pase costará</TotalLabel>
                  <TotalPrice>
                    <ItemPrice id={values.item} />
                  </TotalPrice>
                </Total>
                <Disclaimer hideOnDesktop>
                  Todos los precios son finales y en Pesos Argentinos.
                </Disclaimer>
              </FormContent>
              <CheckoutActions>
                <CheckoutAction backButton onClick={router.back} />
                <Disclaimer hideOnMobile>
                  Todos los precios son finales y en Pesos Argentinos.
                </Disclaimer>
                <CheckoutAction type="submit" />
              </CheckoutActions>
            </FormWrapper>
          )}
        </Formik>
      ) : null}
    </CheckoutLayout>
  );
};

export default CheckoutSecondStep;
