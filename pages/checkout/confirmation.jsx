/* globals window */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
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
      <CheckoutTitle
        title="¡Todo listo!"
        description="Necesitamos que confirmes lo siguiente y podrás proceder al pago"
      />
      <OrderDetails>
        <CheckoutActions>
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
    </CheckoutLayout>
  );
};

CheckoutFifthStep.getInitialProps = async ({ store, isServer }) => {
  await conditionallyFetchItems(store, isServer);

  return {};
};

export default CheckoutFifthStep;
