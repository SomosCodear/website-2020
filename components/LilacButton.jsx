import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export const LilacButton = React.forwardRef(({
  children,
  onClick,
  onMouseEnter,
  ...props
}, ref) => {
  const buttonRef = useRef(null);

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

  useEffect(() => {
    if (ref != null && buttonRef.current != null) {
      ref(buttonRef.current);
    }
  }, [ref]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <lilac-button {...props} ref={buttonRef}>
      {children}
    </lilac-button>
  );
});

LilacButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
};

LilacButton.defaultProps = {
  onClick: null,
  onMouseEnter: null,
};
