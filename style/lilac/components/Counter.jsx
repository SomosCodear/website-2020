import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid var(--color-text);
  border-radius: 10px;
  width: 9rem;
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  font-family: inherit;
  background: transparent;
  color: var(--color-accent);
  border: 0;
  padding: 0 1.25rem;
  margin: 0;
  font-size: 1.5rem;
  &:first-child {
    padding-right: 1rem;
  }
  &:last-child {
    padding-left: 1rem;
  }
`;
const Label = styled.span`
  display: block;
  line-height: 3.125rem;
  color: var(--color-text);
  flex-grow: 1;
  text-align: center;
  font-size: 1.5rem;
`;

export const Counter = ({
  value,
  onChange,
  min,
  max,
}) => (
  <Container>
    <Button onClick={() => value > min && onChange(value - 1)}>-</Button>
    <Label>{value}</Label>
    <Button onClick={() => value < max && onChange(value + 1)}>+</Button>
  </Container>
);

Counter.defaultProps = {
  min: 0,
  max: 100,
};

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};
