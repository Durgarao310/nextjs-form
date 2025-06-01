import { Controller } from "react-hook-form";

const Index = ({
  name,
  id,
  label,
  type,
  placeholder,
  diasbled,
  readOnly,
  defaultValue,
  onChange,
  onBlur,
  rules,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <Controller
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            id={id}
            type={type}
            placeholder={placeholder}
            disabled={diasbled}
            readOnly={readOnly}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) onChange(e);
            }}
            onBlur={(e) => {
              field.onBlur();
              if (onBlur) onBlur(e);
            }}
          />
        )}
      />
      
    </div>
  );
};
export default Index;
