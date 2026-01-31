import React from 'react';
import { OverlayScrollbarsComponent, type OverlayScrollbarsComponentProps } from 'overlayscrollbars-react';

type ScrollbarProps = Omit<OverlayScrollbarsComponentProps, 'options' | 'className'> & {
    className?: string;
    options?: OverlayScrollbarsComponentProps['options'];
    style?: React.CSSProperties;
};

export const Scrollbar: React.FC<ScrollbarProps> = ({
                                                        children,
                                                        className,
                                                        options,
                                                        style,
                                                        ...props
                                                    }) => {
    const hostClassName = ['os-theme-thin', className].filter(Boolean).join(' ');
    const mergedOptions = options === false
        ? false
        : {
            ...options,
            scrollbars: {
                autoHide: options?.scrollbars?.autoHide ?? 'scroll',
                ...(options?.scrollbars ?? {}),
            },
        };

    return (
        <OverlayScrollbarsComponent
            className={hostClassName}
            options={mergedOptions}
            style={style}
            {...props}
        >
            {children}
        </OverlayScrollbarsComponent>
    );
};
