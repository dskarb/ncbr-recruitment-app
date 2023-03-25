import { useField } from "formik";
import { ReactElement } from "react";
import xor from 'lodash/xor';
import Checkbox, { CheckboxProps } from "components/input/Checkbox/Checkbox";
import FormControlLabel, {
  FormControlLabelProps,
} from "components/input/FormControlLabel/FormControlLabel";
import { FormHelperText } from "@mui/material";

export interface CheckboxFormikProps
  extends Omit<CheckboxProps, "name" | "onChange" | "onBlur" | "error"> {
  name: string;
  label?: ReactElement | string;
  labelPlacement?: FormControlLabelProps["labelPlacement"];
  helperText?: string;
}

const CheckboxFormik = ({
  name,
  label,
  value,
  labelPlacement,
  helperText,
  required,
  ...props
}: CheckboxFormikProps) => {
  const [field, meta, form] = useField(name);

  return (
    <>
      <FormControlLabel
        onBlur={field.onBlur}
        control={
          <Checkbox
            error={meta.touched && Boolean(meta.error)}
            checked={
              Array.isArray(field.value)
                ? field.value.includes(value)
                : field.value
            }
            onChange={
              Array.isArray(field.value)
                ? () => form.setValue(xor(field.value, [value]))
                : field.onChange
            }
            name={field.name}
            {...props}
          />
        }
        label={
          required ? (
            <>
              <span className="MuiFormLabel-asterisk">*</span> {label}
            </>
          ) : (
            label || ""
          )
        }
        labelPlacement={labelPlacement}
      />
      {(helperText || (meta.touched && meta.error)) && (
        <FormHelperText error={Boolean(meta.error)}>
          {(meta.touched && meta.error) || helperText}
        </FormHelperText>
      )}
    </>
  );
};

export default CheckboxFormik;
