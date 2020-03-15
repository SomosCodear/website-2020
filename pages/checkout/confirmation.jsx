/* globals window */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { BREAKPOINTS } from '../../style/constants';
import { conditionallyFetchItems } from '../../utils/dataFetching';
import { createOrder } from '../../data/order/actions';
import { isProcessingOrder, getProcessedOrderPreferenceId } from '../../data/order/selectors';
import { buildPaymentURL } from '../../data/order/utils';
import {
  CheckoutStep,
  CheckoutTitle,
  CheckoutActions,
  CheckoutAction,
} from '../../layouts/checkout';
import { OrderDetails } from '../../components/OrderDetails';

const CheckoutTitleWrapper = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    > * {
      margin-bottom: 0;
    }
  }
`;

const Wrapper = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Content = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-bottom: 3rem;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Texts = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${BREAKPOINTS.hd}) {
    padding: 0;
    flex-grow: 1;
  }
`;

const Subtitle = styled.h2`
  margin: -0.5rem 3rem 0;
  font-size: 1.75rem;
  font-weight: lighter;
  color: var(--color-text);
  text-align: center;

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin: 0.5rem 0 0;
    font-size: 2.25rem;
    line-height: 2.6875rem;
    text-align: left;
  }
`;

const Terms = styled.div`
  font-size: 1.25rem;
  color: var(--color-text);
  margin-top: 1.25rem;

  ul {
    padding-left: 1.75rem;
  }

  li {
    margin-top: 1.25rem;
    list-style: disc;

    ::marker {
      font-size: 2rem;
      color: var(--color-secondary-light)
    }
  }

  a {
    color: var(--color-accent);
    text-decoration: none;
  }
`;

const OrderDetailsWrapper = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    padding-top: 1rem;
    align-self: stretch;
    display: flex;
  }
`;

const Confirmation = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isProcessing = useSelector(isProcessingOrder);
  const preferenceId = useSelector(getProcessedOrderPreferenceId);

  const onProceed = useCallback(
    () => {
      if (preferenceId == null) {
        dispatch(createOrder());
      } else {
        window.location = buildPaymentURL(preferenceId);
      }
    },
    [dispatch, preferenceId],
  );

  return (
    <CheckoutStep>
      <Wrapper>
        <CheckoutTitleWrapper>
          <CheckoutTitle title="¡Todo listo!" />
        </CheckoutTitleWrapper>
        <Content>
          <Texts>
            <Subtitle>
              Solo resta que pagues tu compra
            </Subtitle>
            <Terms>
              Proceder al pago implica que has leído, aceptado y entendido:
              <ul>
                <li>
                  los términos establecidos en el&nbsp;
                  <a href="https://codear.org/codigo-de-conducta">Código de Conducta</a>
                  &nbsp;de la Comunidad de Desarrolladores de Argentina,
                  organización que produce WebConf 2020
                </li>
                <li>
                  los&nbsp;
                  <a href="/">Términos y Condiciones</a>
                  &nbsp;de la venta de pases de Córdoba WebConf 2020
                </li>
                <li>
                  y la&nbsp;
                  <a href="/">Política de Privacidad</a>
                  &nbsp;de Córdoba WebConf 2020.
                </li>
              </ul>
            </Terms>
          </Texts>
          <OrderDetailsWrapper>
            <OrderDetails>
              <CheckoutActions hideOnDesktop>
                <CheckoutAction
                  label="Pagar ahora"
                  color="accent"
                  onClick={onProceed}
                  disabled={isProcessing}
                />
                {preferenceId == null ? (
                  <CheckoutAction
                    onClick={router.back}
                    backButton
                    disabled={isProcessing}
                  />
                ) : null}
              </CheckoutActions>
            </OrderDetails>
          </OrderDetailsWrapper>
        </Content>
        <CheckoutActions hideOnMobile>
          <CheckoutAction
            label="Pagar ahora"
            color="accent"
            onClick={onProceed}
            disabled={isProcessing}
          />
          {preferenceId == null ? (
            <CheckoutAction
              onClick={router.back}
              backButton
              disabled={isProcessing}
            />
          ) : null}
        </CheckoutActions>
      </Wrapper>
    </CheckoutStep>
  );
};

Confirmation.getInitialProps = async ({ store, isServer }) => {
  await conditionallyFetchItems(store, isServer);

  return {};
};

export default Confirmation;
