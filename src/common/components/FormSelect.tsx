interface FormSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error: string | undefined;
}

const FormSelect = ({ id, label, value, onChange, error }: FormSelectProps) => {
  return (
    <div className="form__group">
      <label htmlFor={id} className="form__label">{label}</label>
      <select 
        onChange={onChange} 
        id={id}
        value={value}
        className="form__select"
      >
        <option value="Public" className="form__select-option">Public</option>
        <option value="Private" className="form__select-option">Private</option>
      </select>
      {error && (
        <p className="form__message">{error}</p>
      )}
    </div>
  )
}

export default FormSelect