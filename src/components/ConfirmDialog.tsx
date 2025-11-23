import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdWarning } from "react-icons/md";

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title,
    message,
    onConfirm,
    onCancel,
}) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            mass: 1.2,
                        }}
                        className="bg-gradient-to-br from-blue-600 via-purple-500 to-indigo-600 rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-[90vw] relative border border-white/10"
                    >
                        <motion.div
                            className="flex w-full justify-center -mt-16 mb-4"
                            initial={{ y: 0, rotate: 0 }}
                            animate={{
                                y: [0, -6, 0, 6, 0],
                                rotate: [0, 8, -8, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2.2,
                                ease: "easeInOut",
                            }}
                        >
                            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-400 via-blue-500 to-indigo-500 shadow-xl border-2 border-white">
                                <MdWarning
                                    size={24}
                                    className="text-yellow-400 drop-shadow"
                                />
                            </span>
                        </motion.div>
                        {title && (
                            <motion.h2
                                className="text-xl font-bold mb-2 text-white drop-shadow text-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                {title}
                            </motion.h2>
                        )}
                        <motion.p
                            className="mb-6 text-gray-100 text-base font-medium drop-shadow text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {message}
                        </motion.p>
                        <motion.div
                            className="flex justify-end gap-4 mt-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2 bg-white/90 text-blue-700 font-semibold rounded-lg shadow hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={onConfirm}
                            >
                                Yes, Logout
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2 bg-blue-700/80 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                onClick={onCancel}
                            >
                                Cancel
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmDialog;
