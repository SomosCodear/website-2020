import styled from 'styled-components';
import { BREAKPOINTS } from '../../style/constants';

export const CheckoutActions = styled.div`
  display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'flex')};
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 1.25rem;

  > *:not(:last-child) {
    flex-grow: 1;
  }

  > *:last-child {
    margin-right: 2.5rem;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    display: ${({ hideOnDesktop }) => (hideOnDesktop ? 'none' : 'flex')};
    width: 100%;
    margin: 0;
    padding-bottom: 0;

    > * {
      min-width: 310px;
    }

    > *:not(:last-child) {
      flex-grow: 0;
    }

    > *:last-child {
      margin-right: 0;
    }
  }
`;
