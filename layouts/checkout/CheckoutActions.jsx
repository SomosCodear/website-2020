/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading */
import styled from 'styled-components';

export const CheckoutActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  padding-bottom: 1.25rem;

  *:only-child {
    flex-grow: 1;
  }

  * + * {
    flex-grow: 1;
    margin-left: 2.5rem;
  }
`;
