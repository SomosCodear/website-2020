import R from 'ramda';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { getNewOrderPassHolders, areNewOrderPassHoldersValid } from '../../data/order/selectors';
import { getCustomer } from '../../data/customer/selectors';
import { CheckoutLayout } from './CheckoutLayout';
import { CheckoutStepsIndicator } from './CheckouStepsIndicator';

const PASS_HOLDERS = '/checkout';
const PASSES = '/checkout/pass';
const ADDONS = '/checkout/addons';
const INVOICE = '/checkout/invoice';
const CONFIRMATION = '/checkout/confirmation';

const STEPS = [
  PASS_HOLDERS,
  PASSES,
  ADDONS,
  INVOICE,
  CONFIRMATION,
];

const hasSelectedPasses = R.compose(
  R.lt(0),
  R.length,
  R.reject(R.isNil),
  R.map(R.prop('item')),
  getNewOrderPassHolders,
);
const hasCustomer = (state) => getCustomer(state) != null;

const REQUIREMENTS = {
  [PASS_HOLDERS]: R.T,
  [PASSES]: areNewOrderPassHoldersValid,
  [ADDONS]: hasSelectedPasses,
  [INVOICE]: hasSelectedPasses,
  [CONFIRMATION]: R.both(hasSelectedPasses, hasCustomer),
};

export const CheckoutStep = ({ children }) => {
  const requirements = useSelector(
    (state) => R.map((requirement) => requirement(state))(REQUIREMENTS),
  );
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const currentStep = router.pathname;

  useScrollToTop();
  useEffect(() => {
    let redirectStep = currentStep;

    while (!requirements[redirectStep]) {
      redirectStep = STEPS[STEPS.indexOf(redirectStep) - 1];
    }

    if (currentStep !== redirectStep) {
      router.replace(redirectStep);
    } else {
      setValidated(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CheckoutLayout>
      <CheckoutStepsIndicator
        steps={STEPS}
        currentStep={R.indexOf(currentStep, STEPS)}
      />
      {validated ? children : null}
    </CheckoutLayout>
  );
};

CheckoutStep.propTypes = {
  children: PropTypes.node.isRequired,
};
