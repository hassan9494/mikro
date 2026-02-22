import React from 'react';
import Router from 'next/router';
import { LogoBox, LogoImage } from './logo.style';

type LogoProps = {
    imageUrl?: any;
    alt?: string;
    onClick?: () => void;
};

const Logo: React.FC<LogoProps> = ({ imageUrl, alt, onClick }) => {
    function onLogoClick() {
        Router.push('/');
        if (onClick) {
            onClick();
        }
    }

    const renderLogo = () => {
        // Resolve imported image objects ({ src }) to string
        if (typeof imageUrl === 'object' && imageUrl?.src) {
            return <LogoImage src={imageUrl.src} alt={alt} width={200} height={40} loading="eager" {...{ fetchpriority: 'high' } as any} />;
        }

        // If the imported asset is a string (URL), render an <img>
        if (typeof imageUrl === 'string') {
            return <LogoImage src={imageUrl} alt={alt} width={200} height={40} loading="eager" {...{ fetchpriority: 'high' } as any} />;
        }

        // If the imported asset is a React component (SVGR) or element, render it directly
        try {
            // imageUrl might be a React component (function/class) or an object with default
            const candidate: any = imageUrl;
            const Comp = candidate?.default || candidate;
            if (typeof Comp === 'function' || React.isValidElement(Comp)) {
                // Ensure it has reasonable size constraints via wrapper so SVGs are visible
                return (
                    <span style={{ display: 'inline-flex', alignItems: 'center', width: 200, maxWidth: '100%', height: 40 }}>
                        {React.createElement(Comp, { width: '100%', height: '100%', preserveAspectRatio: 'xMidYMid meet' })}
                    </span>
                );
            }
        } catch (e) {
            // fall through to render nothing
        }

        // Fallback: render nothing
        return null;
    };

    return (
        <a href={'/'}>
            <LogoBox onClick={onLogoClick}>
                {renderLogo()}
            </LogoBox>
        </a>
    );
};

export default Logo;
