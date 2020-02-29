import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin-bottom: 0.875rem;
`;
const Title = styled.h1`
  font-size: 2.3125rem;
  font-weight: normal;
  color: var(--color-accent);
  margin: 1.25rem 0 0 0;
`;
const Description = styled.p`
  font-size: 1.125rem;
  color: var(--color-text);
  margin: 0.4375rem 0 0 0;
  line-height: 1.375rem;
  padding: 0 2.1875rem;
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
