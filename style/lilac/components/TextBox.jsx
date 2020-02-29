/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid var(--color-text);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 0.875rem 0;
  padding: 15px 15px 4px 15px;
`;
const Label = styled.label`
  text-transform: uppercase;
  color: var(--color-text);
  font-weight: bold;
  opacity: 0.6;
  font-size: 1.125rem;
`;
const Input = styled.input`
  width: 100%;
  font-family: inherit;
  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  color: white;
  font-size: 3rem;
`;

export const TextBox = ({
  id,
  label,
  onChange,
  hasError,
  value,
  labelProps,
  inputProps,
}) => {
  const allInputProps = {
    name: id,
    id,
    onChange,
    hasError,
    value,
    type: 'text',
    ...inputProps,
  };
  return (
    <Container>
      <Label htmlFor={id} {...labelProps}>{label}</Label>
      <Input {...allInputProps} />
    </Container>
  );
};

TextBox.defaultProps = {
  onChange: () => {},
  hasError: false,
  value: '',
  labelProps: {},
  inputProps: {},
};

TextBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
  value: PropTypes.string,
  labelProps: PropTypes.object,
  inputProps: PropTypes.object,
};
