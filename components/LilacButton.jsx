import React, { useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HiddenSubmitButton = styled.button.attrs(() => ({
  type: 'submit',
}))`
  display: none;
`;

export const LilacButton = React.forwardRef(({
  children,
  onClick,
  onMouseEnter,
  type,
  disabled,
  ...props
}, ref) => {
  const isSubmit = useMemo(() => type === 'submit', [type]);
  const buttonRef = useRef(null);
  const hiddenSubmitRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      /* eslint-disable global-require */
      require('@webcomponents/webcomponentsjs/webcomponents-bundle');
      require('@codear/lilac');
      /* eslint-enable global-require */
    }
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (onClick) {
      const currentRef = buttonRef.current;
      currentRef.addEventListener('click', onClick);

      return () => currentRef.removeEventListener('click', onClick);
    }
  }, [onClick]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (onMouseEnter) {
      const currentRef = buttonRef.current;
      currentRef.addEventListener('mouseenter', onMouseEnter);

      return () => currentRef.removeEventListener('mouseenter', onMouseEnter);
    }
  }, [onMouseEnter]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isSubmit) {
      const currentButtonRef = buttonRef.current;
      const currentSubmitRef = hiddenSubmitRef.current;
      const fireSubmit = () => currentSubmitRef.click();
      currentButtonRef.addEventListener('click', fireSubmit);

      return () => currentButtonRef.removeEventListener('mouseenter', fireSubmit);
    }
  }, [isSubmit, buttonRef, hiddenSubmitRef]);

  useEffect(() => {
    if (disabled) {
      buttonRef.current.setAttribute('disabled', null);
    } else {
      buttonRef.current.removeAttribute('disabled');
    }
  }, [disabled, buttonRef]);

  useEffect(() => {
    if (ref != null && buttonRef.current != null) {
      ref(buttonRef.current);
    }
  }, [ref]);

  return (
    <div>
      <HiddenSubmitButton ref={hiddenSubmitRef} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <lilac-button type={type} {...props} ref={buttonRef}>
        {children}
      </lilac-button>
    </div>
  );
});

LilacButton.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
};

LilacButton.defaultProps = {
  onClick: null,
  onMouseEnter: null,
  type: null,
  disabled: false,
};
