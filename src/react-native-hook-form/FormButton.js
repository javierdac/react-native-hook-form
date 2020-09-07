'use strict';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {Button} from 'react-native';

const FormButton = (props) => {
  const context = useFormContext();

  return (
    <Button
      title={'Submit'}
      onPress={context?.handleSubmit(() =>
        props.onSubmit(context?.getValues()),
      )}
    />
  );
};

export default FormButton;
