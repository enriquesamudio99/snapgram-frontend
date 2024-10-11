interface FormTextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string | undefined;
}

const FormTextarea = ({ id, label, placeholder, value, onChange, error } : FormTextareaProps) => {
  return (
    <div className="form__group">
      <label htmlFor={id} className="form__label">{label}</label>
      <textarea 
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form__textarea"
      ></textarea>
      {error && (
        <p className="form__message">{error}</p>
      )}
    </div>
  )
}

export default FormTextarea;