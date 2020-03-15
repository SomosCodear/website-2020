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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-grow: 1;
  }
`;
const Texts = styled.div`
  padding: 0 2rem;

  @media (min-width: ${BREAKPOINTS.hd}) {
    padding: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
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
              Necesitamos que confirmes lo siguiente y podrás proceder al pago
            </Subtitle>
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
