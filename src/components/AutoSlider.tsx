import React, { useRef, useEffect } from "react";

interface AutoSliderProps {
    children: React.ReactNode;
    speed?: number; 
    interval?: number;
}

const AutoSlider: React.FC<AutoSliderProps> = ({
    children,
    speed = 1,
    interval = 16,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        let animationFrame: number;
        let scrollLeft = 0;
        const maxScroll = container.scrollWidth - container.clientWidth;
        function autoScroll() {
            if (!container) return;
            scrollLeft += speed;
            if (scrollLeft > maxScroll) scrollLeft = 0;
            container.scrollLeft = scrollLeft;
            animationFrame = window.requestAnimationFrame(autoScroll);
        }
        animationFrame = window.requestAnimationFrame(autoScroll);
        return () => {
            window.cancelAnimationFrame(animationFrame);
        };
    }, [speed, interval]);
    return (
        <div
            ref={containerRef}
            style={{
                display: "flex",
                gap: "2rem",
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
            }}
            className="no-scrollbar"
        >
            {children}
        </div>
    );
};

export default AutoSlider;
