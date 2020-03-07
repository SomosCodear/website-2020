import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { BREAKPOINTS } from '../../style/constants';
import { conditionallyFetchItems } from '../../utils/dataFetching';
import { ITEM_TYPE_PASS } from '../../data/items/constants';
import { getItemsByType } from '../../data/items/selectors';
import { setOrderPassInfo } from '../../data/order/actions';
import { getPassHolder } from '../../data/order/selectors';
import { RadioGroup } from '../../components/RadioGroup';
import { ItemPrice } from '../../components/ItemPrice';
import {
  CheckoutStep,
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
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
  const items = useSelector((state) => getItemsByType(state, ITEM_TYPE_PASS));
  const { item } = useSelector((state) => getPassHolder(state, 0));
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = useCallback((values) => {
    dispatch(setOrderPassInfo(0, values));
    router.push('/checkout/addons');
  }, [dispatch, router]);

  return (
    <CheckoutStep>
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
                    { /* eslint-disable-next-line react/jsx-one-expression-per-line, max-len */ }
                    Un pase <strong>Full</strong> te dará acceso a toda la conferencia durante los días del evento, 29 y 30 de mayo.
                  </p>
                  <p>
                    { /* eslint-disable-next-line react/jsx-one-expression-per-line, max-len */ }
                    Un pase <strong>Simple</strong> te dará acceso al día de conferencia que elijas.
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
              </FormContent>
              <Disclaimer>
                Todos los precios son finales y en Pesos Argentinos.
              </Disclaimer>
              <CheckoutActions>
                <CheckoutAction backButton onClick={router.back} />
                <CheckoutAction type="submit" />
              </CheckoutActions>
            </FormWrapper>
          )}
        </Formik>
      ) : null}
    </CheckoutStep>
  );
};

CheckoutSecondStep.getInitialProps = async ({ store, isServer }) => {
  await conditionallyFetchItems(store, isServer);

  return {};
};

export default CheckoutSecondStep;
