'use strict';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';

const Form = (props) => {
  const methods = useForm({
    defaultValues: props.defaultValues,
  });

  return <FormProvider {...methods}>{props.children}</FormProvider>;
};

export default Form;
