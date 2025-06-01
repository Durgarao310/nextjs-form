const Index = ({
  name, // input name
  id, // input id
  label, // input label
  type = "text", // input type
  placeholder = "", // input placeholder
  onChange, // input change handler
  onBlur, // input blur handler
  defaultValue = "", // input default value
  rules = {}, // react hook form validation rules
  onFocus, // input focus handler, optional
  state: {
    disabled = false, // input disabled
    readOnly = false, // input read-only
    active = false, // input focused or active
    error = false, // validation error present
    valid = false, // validation passed
    hover = false, // mouse hover
    filled = false, // has value
    loading = false, // async validation or data loading
  },
}: {
  state: {
    disabled: boolean; // input disabled
    readOnly: boolean; // input read-only
    active: boolean; // input focused or active
    error: boolean; // validation error present
    valid: boolean; // validation passed
    hover: boolean; // mouse hover
    filled: boolean; // has value
    loading: boolean; // async validation or data loading
  };
  name: string;
  id: string;
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  defaultValue: string;
  rules: { [key: string]: unknown }; // react hook form validation rules
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) => {
  return <div>Base Controller</div>;
};

export default Index;

//
