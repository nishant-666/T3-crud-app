interface Input {
  name?: string;
  id?: string;
  type: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input: React.FC<Input> = ({
  type,
  placeholder,
  onChange,
  name,
  value,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input-bordered input m-3 w-full max-w-xs"
      name={name}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
