/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { RadioButton } from '../style/lilac/components';

export const RadioGroup = ({ options, ...props }) => {
  const [field] = useField(props);

  return options.map(({ label, value }) => (
    <RadioButton
      {...field}
      id={`${field.name}-${value}`}
      key={value}
      label={label}
      value={value}
      checked={value === field.value}
    />
  ));
};

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ).isRequired,
};
