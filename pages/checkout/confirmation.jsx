import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { conditionallyFetchItems } from '../../utils/dataFetching';
import { createOrder } from '../../data/order/actions';
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
  const onProceed = useCallback(
    () => dispatch(createOrder()),
    [dispatch],
  );

  return (
    <CheckoutLayout>
      <CheckoutTitle
        title="¡Todo listo!"
        description="Necesitamos que confirmes lo siguiente y podrás proceder al pago"
      />
      <OrderDetails>
        <CheckoutActions>
          <CheckoutAction
            onClick={router.back}
            backButton
          />
          <CheckoutAction
            label="Proceder al pago"
            color="accent"
            onClick={onProceed}
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
