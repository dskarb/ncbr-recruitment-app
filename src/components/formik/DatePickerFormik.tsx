import { Box, FormHelperText, FormLabel } from "@mui/material";
import { DatePickerProps } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CustomDatePicker, {
  CustomDatePickerProps,
} from "components/input/DatePicker";
import { useField } from "formik";

export interface DatePickerFormikProps
  extends Omit<
    CustomDatePickerProps,
    "name" | "value" | "error" | "onChange" | "onError" | "label"
  > {
  name: string;
  helperText?: string;
  fullWidth?: boolean;
  placeholder?: string;
  clearable?: boolean;
}

const DatePickerFormik = ({
  name,
  placeholder,
  helperText,
  clearable,
  ...props
}: DatePickerFormikProps) => {
  const [field, meta, form] = useField(name);

  return (
    <CustomDatePicker
      name={field.name}
      value={field.value ? field.value : null}
      onChange={(date) => {
        form.setTouched(true);
        form.setValue(date);
      }}
      onBlur={() => form.setTouched(true)}
      error={meta.touched && Boolean(meta.error)}
      helperText={(meta.touched && meta.error) || helperText}
      onError={() => form.setError(meta.error)}
      placeholder={placeholder}
      clearable={clearable}
      {...props}
    />
  );
};

export default DatePickerFormik;
