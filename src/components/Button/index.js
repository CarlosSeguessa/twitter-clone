const Button = ({ children, onClick, className, isDisabled }) => {
  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  )
}

export default Button
