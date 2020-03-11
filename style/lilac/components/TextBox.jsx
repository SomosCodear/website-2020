/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { BREAKPOINTS } from '../../constants';

const Container = styled.div`
  border: 1px solid var(--color-text);
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  margin: 0.875rem 0;
  padding: 1rem 1rem 0.25rem 1rem;

  @media (min-width: ${BREAKPOINTS.hd}) {
    box-sizing: border-box;
    margin: 0 1rem 0.875rem 0;

    &:last-child {
      margin: 0;
    }

    ${({ medium }) => medium && css`
      width: calc(50% - 0.625rem);
      &:nth-child(even) {
        margin-right: 0;
      }
    `}
    ${({ small }) => small && css`
      width: calc(35% - 0.625rem);
      & + ${Container} {
        margin-right: 0;
      }
    `}
    ${({ large }) => large && css`
      width: calc(65% - 0.625rem);
    `}
    ${({ inlineLabel }) => inlineLabel && css`
      flex-direction: row;
      padding: 0.5rem;
    `}
    ${({ autoWidth }) => autoWidth && css`
      flex-grow: 1;
    `}
  }
`;
const Label = styled.label`
  text-transform: uppercase;
  color: var(--color-text);
  font-weight: bold;
  opacity: 0.6;
  font-size: 1.125rem;
  word-break: break-all;
  white-space: nowrap;
  ${({ inline }) => inline && css`
    padding-right: 0.5rem;
    border-right: 1px solid var(--color-text);
    height: 1.25rem;
    margin: 0.25rem 0.5rem 0 0;
  `}
  @media (min-width: ${BREAKPOINTS.hd}) {
    ${({ autoWidth }) => autoWidth && css`
      align-self: flex-start;
    `}
  }
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
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-transition-delay: 99999s;
    transition-delay: 99999s;
    &::first-line {
      /* This needs to be !important and can't be inherit in order to work */
      font-family: Roboto, sans-serif !important;
      font-size: 3rem;
    }
  }
  ${({ inlineLabel }) => inlineLabel && css`
    font-size: 1.5rem;
  `}
`;

export const TextBox = ({
  id,
  label,
  labelProps,
  medium,
  large,
  small,
  inlineLabel,
  autoWidth,
  ...inputProps
}) => {
  const allInputProps = {
    id,
    inlineLabel,
    autoWidth,
    ...inputProps,
  };
  const containerProps = {
    small,
    medium,
    large,
    inlineLabel,
    autoWidth,
  };
  return (
    <Container {...containerProps}>
      <Label
        htmlFor={id}
        inline={inlineLabel}
        autoWidth={autoWidth}
        {...labelProps}
      >
        {label}
      </Label>
      <Input {...allInputProps} />
    </Container>
  );
};

TextBox.defaultProps = {
  labelProps: {},
  medium: false,
  large: false,
  small: false,
  inlineLabel: false,
  autoWidth: false,
};

TextBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelProps: PropTypes.object,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  inlineLabel: PropTypes.bool,
  autoWidth: PropTypes.bool,
};
