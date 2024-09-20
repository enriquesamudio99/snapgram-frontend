interface ButtonProps {
  type?: "submit" | "reset" | "button";
  title: string;
  onClick?: () => void;
  isLoading?: boolean;
  loadingTitle?: string;
  variant?: string;
  fullWidth?: boolean;
  icon?: string;
}

const Button = ({ type = "button", title, onClick, isLoading = false, loadingTitle, variant, fullWidth = false, icon } : ButtonProps) => {
  return (
    <button
      type={type}
      className={`button ${variant ? `button--${variant}` : ""} ${fullWidth ? `button--full` : ""}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {icon && (
        <img
          src={icon}
          alt="Button Icon"
          className="button__icon"
        />
      )}
      {isLoading ? loadingTitle : title}
    </button>
  )
}

export default Button;