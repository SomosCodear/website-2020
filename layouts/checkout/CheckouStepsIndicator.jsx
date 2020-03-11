import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { BREAKPOINTS } from '../../style/constants';
import { SROnlyText } from '../../components/SROnlyText';

const Container = styled.nav`
  margin-top: 1rem;
  padding: 0 3rem;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &::before {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    border-bottom: 1px solid var(--color-accent);
    content: '';
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin: 0;
    padding: 0;
    justify-content: flex-end;
  }
`;

const stepBackgroundColor = ({ completed, current }) => {
  let color = 'primary-light';

  if (completed) {
    color = 'accent';
  } else if (current) {
    color = 'text';
  }

  return color;
};
const stepColor = ({ current }) => (current ? 'accent' : 'text');

const Step = styled.div`
    z-index: 10;
    width: 2.75rem;
    height: 2.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-${stepBackgroundColor});
    border: 3px solid var(--color-accent);
    border-radius: 2rem;
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--color-${stepColor});
    cursor: pointer;

    @media (min-width: ${BREAKPOINTS.hd}) {
      & + & {
        margin-left: 4rem;
      }
    }
`;

export const CheckoutStepsIndicator = ({ steps, currentStep }) => (
  <Container>
    {steps.map((step, stepIndex) => (
      <Link key={step} href={step}>
        <Step
          completed={stepIndex < currentStep}
          current={stepIndex === currentStep}
        >
          <SROnlyText>
            Ir al paso
          </SROnlyText>
          {stepIndex + 1}
        </Step>
      </Link>
    ))}
  </Container>
);

CheckoutStepsIndicator.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentStep: PropTypes.number.isRequired,
};
