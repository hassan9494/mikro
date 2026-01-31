import React, { useEffect, useMemo, useState } from 'react';

export type StickyProps = {
    children: React.ReactNode;
    top?: number | string;
    enabled?: boolean;
    innerZ?: number | string;
    className?: string;
    style?: React.CSSProperties;
};

export const Sticky: React.FC<StickyProps> = ({
    children,
    top = 0,
    enabled = true,
    innerZ,
    className,
    style,
}) => {
    const [calculatedTop, setCalculatedTop] = useState(0);

    useEffect(() => {
        if (typeof top !== 'string') {
            return;
        }

        const updateOffset = () => {
            const target = document.querySelector(top);
            if (target instanceof HTMLElement) {
                setCalculatedTop(target.getBoundingClientRect().height);
            } else {
                setCalculatedTop(0);
            }
        };

        updateOffset();
        window.addEventListener('resize', updateOffset);
        return () => {
            window.removeEventListener('resize', updateOffset);
        };
    }, [top]);

    const topValue = useMemo(() => {
        return typeof top === 'number' ? top : calculatedTop;
    }, [calculatedTop, top]);

    if (!enabled) {
        return <>{children}</>;
    }

    return (
        <div
            className={className}
            style={{
                position: 'sticky',
                top: topValue,
                zIndex: innerZ,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default Sticky;
