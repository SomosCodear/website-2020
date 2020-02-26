import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
`;
const Title = styled.h1`
  font-size: 1.6875rem;
  font-weight: normal;
  color: var(--color-accent);
  margin: 1.25rem 0 0 0;
`;
const Description = styled.p`
  font-size: 0.875rem;
  color: var(--color-text);
  margin: 0.4375rem 0 0 0;
`;

export const CheckoutTitle = ({ title, description }) => (
  <Container>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </Container>
);

CheckoutTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
