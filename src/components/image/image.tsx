import React from "react";
import placeholder from "./product-placeholder.png";

const placeholderSrc = typeof placeholder === 'string' ? placeholder : placeholder.src;

type ImageProps = {
    url?: string;
    alt?: string;
    className?: string;
    style?: any;
    width?: number | string;
    height?: number | string;
    priority?: boolean; // if true, load eagerly
};

const Placeholder = ({ alt = 'product', width, height, priority = false }: { alt?: string; width?: number | string; height?: number | string; priority?: boolean }) => (
    <img
        src={placeholderSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        width={width as any}
        height={height as any}
        style={{ width: width ? undefined : '100%', height: height ? undefined : 'auto', display: 'block' }}
    />
);

export default function Image({
    url,
    alt = "placeholder",
    className,
    style,
    width,
    height,
    priority = false,
}: ImageProps) {
    if (!url) return <Placeholder alt={alt} width={width} height={height} priority={priority} />;

    const resolveSrc = (src: any) => (typeof src === 'object' && src?.src) ? src.src : src;
    const src = resolveSrc(url);

    return (
        <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            style={{ display: 'block', width: width ? undefined : '100%', height: height ? undefined : 'auto', objectFit: 'contain', ...style }}
            className={className}
            width={width as any}
            height={height as any}
            draggable={false}
            onError={(e) => {
                (e.target as HTMLImageElement).src = placeholderSrc;
            }}
        />
    );
}
