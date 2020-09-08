"use strict";
import React from "react";
import { useFormContext } from "react-hook-form";
import { TouchableOpacity } from "react-native";

const SubmitButton = props => {
  const context = useFormContext();

  return (
    <TouchableOpacity
      onPress={context?.handleSubmit(() =>
        props.onSubmit(context?.getValues()),
      )}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default SubmitButton;
