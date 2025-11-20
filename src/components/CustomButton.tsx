import React from "react";
import { theme } from "../styles/theme";

interface CustomButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    variant?: "contained" | "outlined";
    disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    onClick,
    type = "button",
    className = "",
    variant = "contained",
    disabled = false,
}) => {
    const base =
        "font-medium py-2 px-6 rounded-xl transition-all duration-300 shadow-md text-white text-base focus:outline-none";
    const contained = `${theme.gradients.button} hover:${theme.gradients.buttonHover} border-none`;
    const outlined =
        "bg-transparent border-2 border-white hover:border-purple-400 hover:text-purple-400";
    const style = `${base} ${
        variant === "contained" ? contained : outlined
    } ${className}`;

    return (
        <button
            type={type}
            onClick={onClick}
            className={style}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default CustomButton;
