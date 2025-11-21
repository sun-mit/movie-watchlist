import React from "react";
import { motion } from "framer-motion";

export type AuthCardProps = {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    error?: string;
    children: React.ReactNode;
    bgImage?: string;
    glowColor?: string;
    footer?: React.ReactNode;
    gradientFrom?: string;
    gradientTo?: string;
    gradientVia?: string;
    copyright?: string;
};

const AuthCard: React.FC<AuthCardProps> = ({
    title,
    subtitle,
    icon,
    error,
    children,
    bgImage,
    glowColor = "purple-600",
    footer,
    gradientFrom = "black/60",
    gradientTo = "black/90",
    gradientVia = "transparent",
    copyright,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black font-sans text-white"
        >
            {/* Background */}
            {bgImage && (
                <motion.div
                    initial={{ scale: 1.1, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "brightness(0.3) blur(2px)",
                    }}
                />
            )}
            <div
                className={`absolute inset-0 z-0 bg-gradient-to-b from-${gradientFrom} via-${gradientVia} to-${gradientTo}`}
            />

            {/* Card */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[520px] px-4"
            >
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10 relative overflow-hidden group">
                    {/* Decorative Glow */}
                    <motion.div
                        initial={{ opacity: 0.2, scale: 0.9 }}
                        animate={{ opacity: 0.4, scale: 1.1 }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut",
                            repeatType: "reverse",
                        }}
                        className={`absolute -top-12 -left-12 w-40 h-40 bg-${glowColor}/20 rounded-full blur-3xl pointer-events-none`}
                    />

                    {/* Header */}
                    <div className="mb-8 text-center relative">
                        {icon && (
                            <div className="flex justify-center mb-4">
                                {icon}
                            </div>
                        )}
                        <h1 className="text-3xl font-bold tracking-tight mb-2">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-gray-400 text-sm">{subtitle}</p>
                        )}
                    </div>

                    {/* Error */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 120 }}
                            className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            {error}
                        </motion.div>
                    )}

                    {/* Form Content */}
                    {children}
                </div>
                {/* Footer */}
                {footer}
                {copyright && (
                    <p className="text-center text-gray-600 text-xs mt-8">
                        {copyright}
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
};

export default AuthCard;
