import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getItemsById } from '../../data/items/selectors';
import {
  getNewOrderPasses,
  getNewOrderAddons,
  getNewOrderPassHolderNames,
} from '../../data/order/selectors';
import { OrderDetails } from '../../components/OrderDetails';

export const CheckoutOrderDetails = ({ children }) => {
  const itemsById = useSelector(getItemsById);
  const passes = useSelector(getNewOrderPasses);
  const addons = useSelector(getNewOrderAddons);
  const passHolderNames = useSelector(getNewOrderPassHolderNames);

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
