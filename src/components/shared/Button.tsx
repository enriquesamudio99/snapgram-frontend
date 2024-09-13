interface ButtonProps {
  type?: "submit" | "reset" | "button";
  title: string;
  onClick?: () => void;
  isLoading?: boolean;
  loadingTitle?: string;
}

const Button = ({ type = "button", title, onClick, isLoading = false, loadingTitle } : ButtonProps) => {
  return (
    <button
      type={type}
      className={`button`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? loadingTitle : title}
    </button>
  )
}

export default Button