import React from "react";
import { MdCheckCircle, MdError } from "react-icons/md";

interface ToastProps {
    message: string;
    type?: "success" | "error";
    onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
    message,
    type = "success",
    onClose,
}) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed top-8 right-8 z-50 px-6 py-4 rounded-xl shadow-2xl font-bold text-lg animate-fade-in transition-all duration-300 flex items-center gap-3
                ${
                    type === "success"
                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white border border-green-300"
                        : "bg-gradient-to-r from-red-500 to-pink-500 text-white border border-red-300"
                }
            `}
            style={{ minWidth: "220px" }}
        >
            {type === "success" ? (
                <MdCheckCircle className="text-white text-2xl" />
            ) : (
                <MdError className="text-white text-2xl" />
            )}
            {message}
        </div>
    );
};

export default Toast;
