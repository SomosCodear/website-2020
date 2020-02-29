import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Counter } from '../style/lilac/components';

const Container = styled.div``;
const ImageContainer = styled.div`
  text-align:center;
  img {
    max-height: 10rem;
  }
`;
const ProductName = styled.p`
  font-size: 1.5rem;
  line-height: 1.8125rem;
  color: var(--color-text);
  margin: 1.25rem 1rem 1.0625rem 1rem;
  text-align: center;
`;
const ProductDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const CounterContainer = styled.div``;
const Price = styled.div`
  margin-left: 1.75rem;
  font-size: 3rem;
  font-weight: bold;
  color: var(--color-accent);
`;

export const Product = ({
  name,
  image,
  price,
  count,
  onCountChange,
  minCount,
  maxCount,
}) => (
  <Container>
    <ImageContainer>
      <img src={image} alt={`Foto de ${name}`} title={name} />
    </ImageContainer>
    <ProductName>{name}</ProductName>
    <ProductDetail>
      <CounterContainer>
        <Counter
          value={count}
          onChange={onCountChange}
          min={minCount}
          max={maxCount}
        />
      </CounterContainer>
      <Price>{`$${price}`}</Price>
    </ProductDetail>
  </Container>
);

Product.defaultProps = {
  minCount: 0,
  maxCount: 10,
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onCountChange: PropTypes.func.isRequired,
  minCount: PropTypes.number,
  maxCount: PropTypes.number,
};
