import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getItemPrice } from '../data/items/selectors';

export const ItemPrice = ({ id, amount }) => {
  const price = useSelector((state) => getItemPrice(state, id));
  const finalPrice = useMemo(() => price * amount, [price, amount]);

  return `$ ${finalPrice}`;
};

ItemPrice.PropTypes = {
  id: PropTypes.string.isRequired,
  amount: PropTypes.number,
};

ItemPrice.defaultProps = {
  amount: 1,
};
