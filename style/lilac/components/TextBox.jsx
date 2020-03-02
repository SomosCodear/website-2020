/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { BREAKPOINTS } from '../../constants';

const Container = styled.div`
  border: 1px solid var(--color-text);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 0.875rem 0;
  padding: 15px 15px 4px 15px;
  @media (min-width: ${BREAKPOINTS.hd}) {
    box-sizing: border-box;
    margin: 0 18px 0.875rem 0;
    &:last-child {
      margin-left: 0;
    }
    ${({ medium }) => medium && css`
      width: calc(50% - 10px);
      &:nth-child(even) {
        margin-right: 0;
      }
    `}
    ${({ small }) => small && css`
      width: calc(35% - 10px);
      & + ${Container} {
        margin-right: 0;
      }
    `}
    ${({ large }) => large && css`
      width: calc(65% - 10px);
    `}
  }
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
  labelProps,
  medium,
  large,
  small,
  ...inputProps
}) => {
  const allInputProps = {
    id,
    ...inputProps,
  };
  const containerProps = {
    small,
    medium,
    large,
  };
  return (
    <Container {...containerProps}>
      <Label htmlFor={id} {...labelProps}>{label}</Label>
      <Input {...allInputProps} />
    </Container>
  );
};

TextBox.defaultProps = {
  labelProps: {},
  medium: false,
  large: false,
  small: false,
};

TextBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelProps: PropTypes.object,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
};
