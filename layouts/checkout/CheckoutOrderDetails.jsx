import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getItemsById } from '../../data/items/selectors';
import { getOrderPasses, getAddons, getOrderPassHolderNames } from '../../data/order/selectors';
import { OrderDetails } from '../../components/OrderDetails';

export const CheckoutOrderDetails = ({ children }) => {
  const itemsById = useSelector(getItemsById);
  const passes = useSelector(getOrderPasses);
  const addons = useSelector(getAddons);
  const passHolderNames = useSelector(getOrderPassHolderNames);

  return (
    <OrderDetails
      itemsById={itemsById}
      passes={passes}
      addons={addons}
      passHolderNames={passHolderNames}
    >
      {children}
    </OrderDetails>
  );
};

CheckoutOrderDetails.propTypes = {
  children: PropTypes.node,
};

CheckoutOrderDetails.defaultProps = {
  children: null,
};
