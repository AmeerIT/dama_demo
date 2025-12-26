"use client";

import { ReactNode } from "react";
import ReactLenis from "lenis/react";

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
    return (
        <ReactLenis root
            options={{
                lerp: 0.5,
                duration: 0.7,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            }}>
            {children}
        </ReactLenis>
    );
};
