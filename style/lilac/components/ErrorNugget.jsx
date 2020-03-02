import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { BREAKPOINTS } from '../../constants';

const Container = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;
const Message = styled.p`
  background: #FFFFFF;
  border-radius: 0.625rem;
  font-size: 1.125rem;
  line-height: 1.375rem;
  text-align: center;
  color: var(--color-accent);
  padding: 0.375rem;
  margin: 0.875rem 0 1.375rem 0;
  @media (min-width: ${BREAKPOINTS.hd}) {
    min-width: 17.875rem;
  }
`;

export const ErrorNugget = ({ children }) => (
  <Container>
    <Message>
      {children}
    </Message>
  </Container>
);

ErrorNugget.propTypes = {
  children: PropTypes.node.isRequired,
};
