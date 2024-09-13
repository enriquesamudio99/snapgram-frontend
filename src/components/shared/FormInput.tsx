interface FormInputProps {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}

const FormInput = ({ id, type, label, placeholder, value, onChange, error } : FormInputProps) => {
  return (
    <div className="form__group">
      <label htmlFor={id} className="form__label">{label}</label>
      <input 
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form__input"
      />
      {error && (
        <p className="form__message">{error}</p>
      )}
    </div>
  )
}

export default FormInput;