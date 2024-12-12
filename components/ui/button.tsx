import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "lg"
  variant?: "outline"
}

export function Button({ 
  children, 
  className = "", 
  size,
  variant,
  ...props 
}: ButtonProps) {
  const sizeClasses = size === "lg" ? "px-6 py-3 text-lg" : "px-4 py-2"
  const variantClasses = variant === "outline" 
    ? "border-2" 
    : "bg-red-600 hover:bg-red-700"

  return (
    <button 
      className={`rounded-md ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
} 