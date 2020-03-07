import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Counter } from '../style/lilac/components';
import { BREAKPOINTS } from '../style/constants'

const Container = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: flex;
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  text-align:center;
  img {
    max-height: 10rem;
  }
  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-right: 1.6875rem;
  }
`;

const Text = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const ProductName = styled.p`
  font-size: 1.5rem;
  line-height: 1.8125rem;
  color: var(--color-text);
  margin: 1.25rem 1rem 1.0625rem 1rem;
  text-align: center;

  @media (min-width: ${BREAKPOINTS.hd}) {
    text-align: left;
    margin: 0 1rem 1.0625rem 0rem;
  }
`;

const ProductDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (min-width: ${BREAKPOINTS.hd}) {
    justify-content: flex-start;
  }
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
    <Text>
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
    </Text>
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
