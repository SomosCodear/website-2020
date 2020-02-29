/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { LilacButton } from '../../components/LilacButton';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 20.75rem;
  margin: 0 auto;
  > *:last-child {
    flex-grow: 1;
    ${({ twoButtons }) => (twoButtons ? css`margin-left: 2.4375rem;` : css`width: 100%;`)}
  }
`;

const GoBackIconContainer = styled.span`
  display: block;
  min-width: 2.3125rem;
  img {
    transform: rotate(-90deg);
    margin-bottom: 0.1875rem;
  }
`;

export const CheckoutActions = ({
  onContinue,
  onGoBack,
  continueButtonProps,
  continueButtonText,
  goBackButtonProps,
}) => {
  const baseProps = {
    color: 'primary-light',
    shadow: true,
  };
  const allContinueButtonProps = {
    onClick: onContinue,
    ...baseProps,
    ...continueButtonProps,
  };
  let goBackButton = null;
  if (onGoBack) {
    const allGoBackButtonProps = {
      onClick: onGoBack,
      ...baseProps,
      ...goBackButtonProps,
    };
    goBackButton = (
      <LilacButton {...allGoBackButtonProps}>
        <GoBackIconContainer>
          <img src="/images/chevron-text.svg" alt="Botón de volver" />
        </GoBackIconContainer>
      </LilacButton>
    );
  }

  return (
    <Container twoButtons={goBackButton}>
      {goBackButton}
      <LilacButton {...allContinueButtonProps}>
        {continueButtonText}
      </LilacButton>
    </Container>
  );
};

CheckoutActions.defaultProps = {
  onGoBack: null,
  continueButtonProps: {},
  continueButtonText: 'CONTINUAR',
  goBackButtonProps: {},
};

CheckoutActions.propTypes = {
  onContinue: PropTypes.func.isRequired,
  onGoBack: PropTypes.func,
  continueButtonProps: PropTypes.object,
  continueButtonText: PropTypes.string,
  goBackButtonProps: PropTypes.object,
};
