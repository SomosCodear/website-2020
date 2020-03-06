import styled from 'styled-components';
import { BREAKPOINTS } from '../../style/constants';

export const CheckoutActions = styled.div`
  display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'flex')};
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  padding-bottom: 1.25rem;

  > *:only-child {
    flex-grow: 1;
  }

  > * + * {
    flex-grow: 1;
    margin-left: 2.5rem;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    display: ${({ hideOnDesktop }) => (hideOnDesktop ? 'none' : 'flex')};
    width: 100%;
    margin: 0;
    padding-bottom: 0;

    > * {
      min-width: 310px;
      flex-grow: 0;
      margin-left: 0;
    }
  }
`;
