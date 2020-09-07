"use strict";
import React, { useEffect } from "react";
import ListPicker from "./ListPicker";
import { useFormContext } from "react-hook-form";

const TextInputList = props => {
  const context = useFormContext();

  useEffect(() => {
    context.register(props.name, props.value);
  }, []);

  const onChange = value => {
    if (context?.control) {
      context.setValue(props.name, value);
      console.log(props.name, value);
    }
    props.onChange && props.onChange(value);
  };

  return (
    <ListPicker
      label={props.label}
      items={props.list}
      name={props.name}
      value={props.value}
      onChange={value => onChange(value)}
      {...props}
    />
  );
};

export default TextInputList;
