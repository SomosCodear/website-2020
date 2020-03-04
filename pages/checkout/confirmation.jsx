import React from 'react';
import { useRouter } from 'next/router';
import { conditionallyFetchItems } from '../../utils/dataFetching';
import {
  CheckoutLayout,
  CheckoutTitle,
  CheckoutActions,
  CheckoutAction,
} from '../../layouts/checkout';
import { OrderDetails } from '../../components/OrderDetails';

const CheckoutFifthStep = () => {
  const router = useRouter();

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
          <CheckoutAction label="Proceder al pago" color="accent" />
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
