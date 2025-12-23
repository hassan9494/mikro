import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';

export type IntersectionTriggerProps = {
    onEnter?: () => void;
    onLeave?: () => void;
    onChange?: (inView: boolean) => void;
    threshold?: number | number[];
    rootMargin?: string;
    className?: string;
    style?: CSSProperties;
};

export const IntersectionTrigger: React.FC<IntersectionTriggerProps> = ({
    onEnter,
    onLeave,
    onChange,
    threshold = 0,
    rootMargin = '0px',
    className,
    style,
}) => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const callbacksRef = useRef({ onEnter, onLeave, onChange });

    useEffect(() => {
        callbacksRef.current = { onEnter, onLeave, onChange };
    }, [onEnter, onLeave, onChange]);

    const options = useMemo(() => ({ threshold, rootMargin }), [threshold, rootMargin]);

    useEffect(() => {
        const node = targetRef.current;
        if (!node || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const { onEnter: handleEnter, onLeave: handleLeave, onChange: handleChange } = callbacksRef.current;
                const inView = entry.isIntersecting;

                handleChange?.(inView);
                if (inView) {
                    handleEnter?.();
                } else {
                    handleLeave?.();
                }
            });
        }, options);

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [options]);

    return <div ref={targetRef} className={className} style={style} />;
};

export default IntersectionTrigger;
