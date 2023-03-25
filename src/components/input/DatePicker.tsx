import {
  MobileDatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "./TextField";

export interface CustomDatePickerProps extends DatePickerProps<Date> {
  name: string;
  helperText?: string;
  error?: boolean;
  inputLabel?: string;
  placeholder?: string;
  onBlur?: () => void;
  required?: boolean;
  fullWidth?: boolean;
  clearable?: boolean;
}

const CustomDatePicker = ({
  name,
  helperText,
  error,
  inputLabel,
  onBlur,
  required,
  fullWidth,
  disabled,
  placeholder,
  clearable,
  ...props
}: CustomDatePickerProps) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          sx={{ width: "100%" }}
          slots={{
            textField: (params) => (
              <TextField
                {...params}
                name={name}
                error={error}
                helperText={helperText}
                label={inputLabel}
                onBlur={onBlur}
                required={required}
                fullWidth={fullWidth}
                disabled={disabled}
                placeholder={disabled ? undefined : placeholder}
                inputProps={{
                  ...params.inputProps,
                  placeholder: disabled ? undefined : placeholder,
                }}
              />
            ),
          }}
          format="dd.MM.yyyy"
          {...props}
        />
      </LocalizationProvider>
    </>
  );
};

export default CustomDatePicker;
