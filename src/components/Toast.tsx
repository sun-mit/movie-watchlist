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
            className={`fixed left-8 bottom-8 z-50 px-7 py-5 rounded-2xl shadow-2xl font-bold text-lg animate-toast-in transition-all duration-500 flex items-center gap-4
                ${
                    type === "success"
                        ? "bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white border-2 border-green-300"
                        : "bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 text-white border-2 border-red-300"
                }
            `}
            style={{
                minWidth: "240px",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
            }}
        >
            <span className="relative flex items-center justify-center">
                {type === "success" ? (
                    <MdCheckCircle className="text-white text-3xl animate-pop" />
                ) : (
                    <MdError className="text-white text-3xl animate-pop" />
                )}
                {/* Sparkle */}
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300/80 rounded-full blur-sm animate-sparkle" />
            </span>
            <span className="flex-1 animate-slide-in">{message}</span>
            <style>{`
                @keyframes toast-in {
                    from { opacity: 0; transform: translateX(-40px) scale(0.95); }
                    to { opacity: 1; transform: translateX(0) scale(1); }
                }
                .animate-toast-in {
                    animation: toast-in 0.7s cubic-bezier(.4,0,.2,1);
                }
                @keyframes pop {
                    0% { transform: scale(0.7); }
                    60% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                .animate-pop {
                    animation: pop 0.5s cubic-bezier(.4,0,.2,1);
                }
                @keyframes slide-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-in {
                    animation: slide-in 0.6s cubic-bezier(.4,0,.2,1);
                }
                @keyframes sparkle {
                    0%, 100% { opacity: 0.7; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.3); }
                }
                .animate-sparkle {
                    animation: sparkle 1.2s infinite;
                }
            `}</style>
        </div>
    );
};

export default Toast;
