/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 0.875rem 0;
  padding: 10px 10px 4px 10px;
`;
const Label = styled.label`
  text-transform: uppercase;
  color: white;
  opacity: 0.7;
  font-size: 14px;
`;
const Input = styled.input`
  width: 100%;
  font-family: inherit;
  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  color: white;
  font-size: 32px;
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
