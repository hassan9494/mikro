import React, { useState } from 'react';
import { themeGet } from '@styled-system/theme-get';
import Carousel from 'react-multi-carousel';
import styled from 'styled-components';

const SingleItem = styled.li`
  border: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};
  border-radius: ${themeGet('radii.base', '6px')};
  margin-right: 20px;
  padding: 0;
  outline: none;
  width: 70px;
  height: auto;
  overflow: hidden;

  &:last-child {
    margin-right: 0;
  }

  &.custom-dot--active {
    border: 2px solid ${themeGet('colors.primary.regular', '#009E7F')};
  }
`;

const ZoomContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 350px;
`;

const ZoomableImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: zoom-in;
`;

const ZoomOverlay = styled.div<{ show: boolean; position: { x: number; y: number } }>`
  position: fixed;
  display: ${({ show }) => (show ? 'block' : 'none')};
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  pointer-events: none;
  left: ${({ position }) => position.x}px;
  top: ${({ position }) => position.y}px;
  transform: translate(-50%, -50%);
  background-size: 400% 400%; // 3x zoom
`;

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024,
        },
        items: 1,
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0,
        },
        items: 1,
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 200,
        },
        items: 1,
    },
};

const CarouselWithCustomDots = ({
                                    items = [],
                                    deviceType: { mobile, tablet, desktop },
                                    title,
                                    ...rest
                                }: any) => {
    const [zoom, setZoom] = useState({
        active: false,
        img: '',
        position: { x: 0, y: 0 },
        backgroundPosition: '0% 0%'
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>, imgUrl: string) => {
        if (!zoom.active) return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        // Calculate background position to center the cursor point
        const bgX = (x / width) * 100;
        const bgY = (y / height) * 100;

        setZoom(prev => ({
            ...prev,
            img: imgUrl,
            position: { x: e.clientX, y: e.clientY },
            backgroundPosition: `${bgX}% ${bgY}%`
        }));
    };

    const children = items.slice(0, 6).map((item: any, index: number) => (
        <ZoomContainer
            key={index}
            onMouseEnter={() => setZoom(prev => ({ ...prev, active: true, img: item.url }))}
            onMouseLeave={() => setZoom(prev => ({ ...prev, active: false }))}
        >
            <ZoomableImage
                src={item.url}
                alt={title}
                onMouseMove={(e) => handleMouseMove(e, item.url)}
            />
        </ZoomContainer>
    ));

    const images = items.map((item: any, index: number) => (
        <img
            src={item.url}
            key={index}
            alt={title}
            style={{ width: '100%', height: '100%', position: 'relative' }}
        />
    ));

    const CustomDot = ({
                           index,
                           onClick,
                           active,
                           carouselState: { currentSlide, deviceType },
                       }: any) => {
        return (
            <SingleItem
                data-index={index}
                key={index}
                onClick={() => onClick()}
                className={`custom-dot ${active && 'custom-dot--active'}`}
            >
                {React.Children.toArray(images)[index]}
            </SingleItem>
        );
    };

    let deviceType = 'desktop';
    if (mobile) {
        deviceType = 'mobile';
    }
    if (tablet) {
        deviceType = 'tablet';
    }

    return (
        <>
            <Carousel
                showDots
                ssr
                infinite={true}
                slidesToSlide={1}
                containerClass='carousel-with-custom-dots'
                responsive={responsive}
                deviceType={deviceType}
                autoPlay={false}
                arrows={false}
                customDot={<CustomDot />}
                {...rest}
            >
                {children}
            </Carousel>

            <ZoomOverlay
                show={zoom.active}
                position={zoom.position}
                style={{
                    backgroundImage: `url(${zoom.img})`,
                    backgroundPosition: zoom.backgroundPosition
                }}
            />
        </>
    );
};

export default CarouselWithCustomDots;