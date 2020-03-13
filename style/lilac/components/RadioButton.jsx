/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading */
import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 3.875rem;
  padding-left: 3.875rem;
  margin: 1.0625rem 0;
`;

const Label = styled.label`
  padding: 0.125rem 0 0 2.3125rem;
  font-size: 2.25rem;
  color: var(--color-text);
  font-weight: lighter;
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

const Radio = styled.span.attrs(() => ({ tabIndex: 0 }))`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 3.875rem;
  width: 3.875rem;
  border: 0.0625rem solid #FFFFFF;
  border-radius: 0.625rem;

  &::after {
    content: '';
    position: absolute;
    display: none;
    border-radius: 0.375rem;
    background-color: var(--color-accent);
    width: 3.25rem;
    height: 3.25rem;
    margin: 0.3125rem;
  }

  &:focus {
    &::after {
      display: block;
      opacity: 0.5;
    }
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ ${Radio}::after {
    display: block;
  }
`;

export const RadioButton = ({
  id,
  label,
  labelProps,
  ...inputProps
}) => {
  const allInputProps = {
    id,
    type: 'radio',
    ...inputProps,
  };
  const radioRef = useRef(null);
  const onFakeRadioClick = useCallback(() => {
    radioRef.current.click();
  }, [radioRef]);
  const onKeyDown = useCallback(({ key }) => {
    if ([' ', 'Enter'].includes(key)) {
      onFakeRadioClick();
    }
  }, [onFakeRadioClick]);

  return (
    <Container>
      <Input ref={radioRef} {...allInputProps} />
      <Radio onClick={onFakeRadioClick} onKeyDown={onKeyDown} />
      <Label htmlFor={allInputProps.id} {...labelProps}>{label}</Label>
    </Container>
  );
};

RadioButton.defaultProps = {
  labelProps: {},
};

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelProps: PropTypes.object,
};
