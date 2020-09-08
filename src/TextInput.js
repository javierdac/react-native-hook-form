"use strict";
import React from "react";
import { TextInput as Input } from "react-native-paper";
import { Controller, useFormContext } from "react-hook-form";
import { Text } from "react-native";

const TextInput = props => {
  const context = useFormContext();

  const renderItem = props => {
    return (
      <Input
        label={props.label}
        value={props.value}
        onChangeText={props.onChange}
        onBlur={props.onBlur}
        {...props}
      ></Input>
    );
  };

  if (context?.control) {
    return (
      <>
        <Controller
          name={props.name}
          rules={props.rules}
          control={context?.control}
          render={propsRender =>
            renderItem({
              ...propsRender,
              ...props,
              value: props.value || propsRender.value,
            })
          }
        />
        {context?.errors[props.name] && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {context?.errors[props.name].message
              ? context?.errors[props.name].message
              : context?.errors[props.name].type}
            {/* TODO: si no tiene error personalizado tiro el default */}
          </Text>
        )}
      </>
    );
  } else {
    return renderItem(props);
  }
};

export default TextInput;
