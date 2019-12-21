import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export const LilacButton = ({ children, onClick, ...props }) => {
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
      buttonRef.current.addEventListener('click', onClick);

      return () => buttonRef.current.removeEventListener('click', onClick);
    }
  }, [onClick]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <lilac-button {...props} ref={buttonRef}>
      {children}
    </lilac-button>
  );
};

LilacButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

LilacButton.defaultProps = {
  onClick: null,
};
