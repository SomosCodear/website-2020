import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { BREAKPOINTS } from '../../style/constants';

const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-top: 1rem;
    text-align: left;
  }
`;

const Title = styled.h1`
  margin: 2rem 0 0 0;
  padding: 0 2rem;
  font-size: 2.3125rem;
  font-weight: normal;
  color: var(--color-accent);

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin: 0;
    padding: 0;
    font-size: 4.5rem;
    font-weight: lighter;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: var(--color-text);
  margin: 0.4375rem 0 0 0;
  line-height: 1.375rem;
  padding: 0 2rem;

  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 2.25rem;
    line-height: 2.6875rem;
    font-weight: lighter;
    padding: 0;
    ${({ hideDescriptionOnDesktop }) => hideDescriptionOnDesktop && css`
      display: none;
    `}
  }
`;

const Subtitle = styled.div``;

export const CheckoutTitle = ({
  title,
  description,
  hideDescriptionOnDesktop,
  children,
}) => (
  <Container>
    <Title>{title}</Title>
    {
      description
        ? (
          <Description
            hideDescriptionOnDesktop={hideDescriptionOnDesktop}
          >
            {description}
          </Description>
        )
        : null
    }
    {
      children
        ? (<Subtitle>{children}</Subtitle>)
        : null
    }
  </Container>
);

CheckoutTitle.defaultProps = {
  description: '',
  hideDescriptionOnDesktop: false,
  children: null,
};

CheckoutTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  hideDescriptionOnDesktop: PropTypes.bool,
  children: PropTypes.node,
};
