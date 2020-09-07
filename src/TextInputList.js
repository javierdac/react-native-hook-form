'use strict';
import React from 'react';
import ListPicker from './ListPicker';
import {useFormContext} from 'react-hook-form';

const TextInputList = (props) => {
  const context = useFormContext();

  const onChange = (value) => {
    if (context?.control) {
      context.setValue(props.name, moment(data).format(format));
    }
    props.onChange && props.onChange(value);
  };

  return (
    <ListPicker
      label={props.label}
      items={props.list}
      name={props.name}
      onChange={(value) => onChange(value)}
      {...props}
    />
  );
};

export default TextInputList;
