import { useMemo } from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { debounce } from "lodash";
import clsx from "clsx";

interface State {
  disabled?: boolean;
  readOnly?: boolean;
  active?: boolean;
  error?: boolean;
  valid?: boolean;
  hover?: boolean;
  filled?: boolean;
  loading?: boolean;
}

interface Props {
  /** The name of the form field */
  name: string;
  /** The HTML id attribute */
  id: string;
  /** The label text for the input */
  label: string;
  /** The type of the input element */
  type?: HTMLInputElement["type"];
  /** Placeholder text */
  placeholder?: string;
  /** Handler for value changes */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler for blur events */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Handler for focus events */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Default value for the input */
  defaultValue?: string;
  /** React Hook Form validation rules */
  rules?: RegisterOptions;
  /** Component state */
  state?: State;
  /** Optional helper text */
  helperText?: string;
  /** Optional aria-describedby */
  ariaDescribedBy?: string;
}

const defaultState: State = {
  disabled: false,
  readOnly: false,
  active: false,
  error: false,
  valid: false,
  hover: false,
  filled: false,
  loading: false,
};

const Index = ({
  name,
  id,
  label,
  type = "text",
  placeholder = "",
  onChange,
  onBlur,
  defaultValue = undefined,
  rules = {},
  onFocus,
  state = defaultState,
  helperText,
  ariaDescribedBy,
}: Props) => {
  const { control } = useFormContext();
  const inputId = `${id}-input`;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const debouncedOnChange = useMemo(() => {
    return debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    }, 300);
  }, [onChange]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({
        field: {
          value,
          onChange: controllerOnChange,
          onBlur: controllerOnBlur,
          ref: controllerRef,
          disabled: disabledField,
        },
        fieldState: { error },
      }) => (
        <div className="form-control">
          <label htmlFor={inputId} className="form-label">
            {label}
          </label>
          <input
            id={inputId}
            className={clsx("input", {
              active: state.active,
              error: error,
              valid: state.valid,
              hover: state.hover,
              filled: state.filled,
              loading: state.loading,
            })}
            ref={controllerRef}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              controllerOnChange(e);
              debouncedOnChange(e);
            }}
            value={value}
            onBlur={(e) => {
              controllerOnBlur();
              onBlur?.(e);
            }}
            onFocus={onFocus}
            disabled={state.disabled || disabledField}
            readOnly={state.readOnly}
            aria-invalid={!!error}
            aria-describedby={clsx({
              [errorId]: error,
              [helperId]: helperText,
              [ariaDescribedBy || ""]: ariaDescribedBy,
            })}
          />
          {helperText && !error && (
            <span id={helperId} className="helper-text">
              {helperText}
            </span>
          )}
          {error && (
            <span id={errorId} className="error" role="alert">
              {error.message || `${label} is invalid`}
            </span>
          )}
          {state.loading && (
            <span className="loading" aria-live="polite">
              Loading...
            </span>
          )}
        </div>
      )}
    />
  );
};

export default Index;
