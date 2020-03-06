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
  CheckoutLayout,
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
  @media (min-width: ${BREAKPOINTS.hd}) {
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

const CheckoutFifthStep = () => {
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
    <CheckoutLayout>
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
          <OrderDetails>
            <CheckoutActions hideOnDesktop>
              {preferenceId == null ? (
                <CheckoutAction
                  onClick={router.back}
                  backButton
                  disabled={isProcessing}
                />
              ) : null}
              <CheckoutAction
                label="Proceder al pago"
                color="accent"
                onClick={onProceed}
                disabled={isProcessing}
              />
            </CheckoutActions>
          </OrderDetails>
        </Content>
        <CheckoutActions hideOnMobile>
          {preferenceId == null ? (
            <CheckoutAction
              onClick={router.back}
              backButton
              disabled={isProcessing}
            />
          ) : null}
          <CheckoutAction
            label="Proceder al pago"
            color="accent"
            onClick={onProceed}
            disabled={isProcessing}
          />
        </CheckoutActions>
      </Wrapper>
    </CheckoutLayout>
  );
};

CheckoutFifthStep.getInitialProps = async ({ store, isServer }) => {
  await conditionallyFetchItems(store, isServer);

  return {};
};

export default CheckoutFifthStep;
