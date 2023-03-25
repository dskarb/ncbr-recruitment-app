import TextField, { TextFieldProps } from "components/input/TextField";
import { useField } from "formik";
import { useEffect, useState } from "react";

export interface TextFieldFormikProps
  extends Omit<
    TextFieldProps,
    "name" | "value" | "onChange" | "onBlur" | "error"
  > {
  name: string;
}

const TextFieldFormik = ({
  name,
  helperText,
  fullWidth = true,
  variant = "outlined",
  ...props
}: TextFieldFormikProps) => {
  const [field, meta, fieldHelpers] = useField(name);

  return (
    <TextField
      name={field.name}
      value={field.value}
      onChange={(e) => fieldHelpers.setValue(e.target.value)}
      onBlur={() => field.onBlur}
      error={meta.touched && Boolean(meta.error)}
      helperText={(meta.touched && meta.error) || helperText}
      fullWidth={fullWidth}
      maxRows="10"
      {...props}
    />
  );
};

export default TextFieldFormik;
