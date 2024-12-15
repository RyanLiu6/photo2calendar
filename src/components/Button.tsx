import { type ReactNode } from "react";
import classNames from "classnames";
import { textStyle } from "@ryanliu6/xi/styles";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  href,
  className,
  type = "button",
  disabled = false
}: ButtonProps) => {
  const baseClasses = classNames(
    "px-4 py-2 rounded-lg",
    "bg-violet-500 hover:bg-violet-600",
    "dark:bg-violet-600 dark:hover:bg-violet-700",
    "text-white",
    "transition-colors duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    textStyle,
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
};
