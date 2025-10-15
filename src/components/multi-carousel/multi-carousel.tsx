import React, { useState, useEffect, useRef } from 'react';
import { themeGet } from '@styled-system/theme-get';
import Carousel from 'react-multi-carousel';
import styled from 'styled-components';

// Styled Components
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 550px;
`;

const ZoomableImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: zoom-in;
`;

// const ZoomOverlay = styled.div<{ show: boolean; position: { x: number; y: number } }>`
//   position: fixed;
//   display: ${({ show }) => (show ? 'block' : 'none')};
//   width: 200px;
//   height: 200px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   background-repeat: no-repeat;
//   background-color: white;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
//   z-index: 1000;
//   pointer-events: none;
//   left: ${({ position }) => position.x}px;
//   top: ${({ position }) => position.y}px;
//   transform: translate(-50%, -50%);
//   background-size: 400% 400%;
// `;

const ImagePopup = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.97);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: zoom-out;
`;

const PopupImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const PopupImageWrapper = styled.div<{ scale: number; translateX: number; translateY: number }>`
  transform: scale(${({ scale }) => scale}) translate(${({ translateX }) => translateX}px, ${({ translateY }) => translateY}px);
  transform-origin: center;
  transition: transform 0.2s ease-out;
  cursor: grab;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    cursor: grabbing;
  }
`;

const PopupImage = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2001;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const NavigationButton = styled.button<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ position }) => position}: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2001;
  transform: translateY(-50%);

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 768px) {
    ${({ position }) => position}: 10px;
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
`;

const ZoomControls = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 2001;
  background: rgba(0, 0, 0, 0.7);
  padding: 12px;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    bottom: 20px;
    padding: 10px;
    gap: 12px;
  }
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  // padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 2001;
`;

// Carousel responsive settings
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 200 },
    items: 1,
  },
};

interface CustomDotProps {
  index: number;
  onClick: () => void;
  active: boolean;
  imageUrl: string;
  title: string;
}

const CustomDot: React.FC<CustomDotProps> = ({
                                               index,
                                               onClick,
                                               active,
                                               imageUrl,
                                               title
                                             }) => {
  return (
      <SingleItem
          data-index={index}
          onClick={onClick}
          className={`custom-dot ${active ? 'custom-dot--active' : ''}`}
      >
        <img
            src={imageUrl}
            alt={`${title} - Thumbnail ${index + 1}`}
            style={{ width: '100%', height: '100%', position: 'relative', cursor: 'pointer' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/default-product.png';
            }}
        />
      </SingleItem>
  );
};

interface CarouselWithCustomDotsProps {
  items: Array<{ url: string; id?: number; name?: string; size?: number }>;
  deviceType: { mobile: boolean; tablet: boolean; desktop: boolean };
  title?: string;
  selectedColor?: any;
}

const CarouselWithCustomDots: React.FC<CarouselWithCustomDotsProps> = ({
                                                                         items = [],
                                                                         deviceType: { mobile, tablet, desktop },
                                                                         title = '',
                                                                         selectedColor,
                                                                         ...rest
                                                                       }) => {
  const [zoom, setZoom] = useState({
    active: false,
    img: '',
    position: { x: 0, y: 0 },
    backgroundPosition: '0% 0%'
  });

  const [popup, setPopup] = useState({
    show: false,
    currentIndex: 0,
    scale: 1.2, // Increased default scale to make image larger initially
    translateX: 0,
    translateY: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
  });

  const imageRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastTouchDistance = useRef<number>(0);

  // Get the correct set of images to display
  const displayItems = selectedColor?.gallery?.length > 0
      ? selectedColor.gallery
      : selectedColor?.image
          ? [{ url: selectedColor.image }]
          : items;

  const imageUrls = displayItems.map(item => item.url);

  // Handle mouse movement for zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>, imgUrl: string) => {
    if (!zoom.active) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;

    setZoom(prev => ({
      ...prev,
      img: imgUrl,
      position: { x: e.clientX, y: e.clientY },
      backgroundPosition: `${bgX}% ${bgY}%`
    }));
  };

  // Handle opening popup
  const handleThumbnailClick = (index: number) => {
    setPopup({
      show: true,
      currentIndex: index,
      scale: 1.2, // Start with a slightly zoomed-in view
      translateX: 0,
      translateY: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
    });
  };

  // Handle closing popup
  const closePopup = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPopup(prev => ({
      ...prev,
      show: false
    }));
  };

  // Navigate to next image
  const nextImage = () => {
    setPopup(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % displayItems.length,
      scale: 1.2, // Reset to slightly zoomed-in view when changing images
      translateX: 0,
      translateY: 0
    }));
  };

  // Navigate to previous image
  const prevImage = () => {
    setPopup(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + displayItems.length) % displayItems.length,
      scale: 1.2, // Reset to slightly zoomed-in view when changing images
      translateX: 0,
      translateY: 0
    }));
  };

  // Zoom in/out
  const zoomImage = (factor: number) => {
    setPopup(prev => ({
      ...prev,
      scale: Math.max(0.8, Math.min(8, prev.scale + factor)), // Increased max zoom to 8x
      translateX: 0,
      translateY: 0
    }));
  };

  // Reset zoom
  const resetZoom = () => {
    setPopup(prev => ({
      ...prev,
      scale: 1.2, // Reset to slightly zoomed-in view instead of 1:1
      translateX: 0,
      translateY: 0
    }));
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (popup.scale <= 1.2) return;

    setPopup(prev => ({
      ...prev,
      isDragging: true,
      startX: e.clientX - prev.translateX,
      startY: e.clientY - prev.translateY
    }));
  };

  // Handle mouse move for dragging
  const handleMouseMovePopup = (e: React.MouseEvent) => {
    if (!popup.isDragging || popup.scale <= 1.2) return;

    e.preventDefault();

    const translateX = e.clientX - popup.startX;
    const translateY = e.clientY - popup.startY;

    // Calculate maximum translation based on zoom level
    const maxTranslate = (popup.scale - 1) * 300; // Increased panning range

    setPopup(prev => ({
      ...prev,
      translateX: Math.min(Math.max(translateX, -maxTranslate), maxTranslate),
      translateY: Math.min(Math.max(translateY, -maxTranslate), maxTranslate)
    }));
  };

  // Handle mouse up for dragging
  const handleMouseUp = () => {
    setPopup(prev => ({
      ...prev,
      isDragging: false
    }));
  };

  // Handle touch events for pinch-to-zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
      );

      lastTouchDistance.current = distance;
    } else if (e.touches.length === 1 && popup.scale > 1.2) {
      // Single touch for panning
      const touch = e.touches[0];
      setPopup(prev => ({
        ...prev,
        isDragging: true,
        startX: touch.clientX - prev.translateX,
        startY: touch.clientY - prev.translateY
      }));
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();

      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
      );

      if (lastTouchDistance.current > 0) {
        const scaleChange = distance / lastTouchDistance.current;
        const newScale = Math.max(0.8, Math.min(8, popup.scale * scaleChange));

        setPopup(prev => ({
          ...prev,
          scale: newScale
        }));

        lastTouchDistance.current = distance;
      }
    } else if (e.touches.length === 1 && popup.isDragging && popup.scale > 1.2) {
      // Single touch drag when zoomed
      e.preventDefault();
      const touch = e.touches[0];

      const translateX = touch.clientX - popup.startX;
      const translateY = touch.clientY - popup.startY;

      // Calculate maximum translation based on zoom level
      const maxTranslate = (popup.scale - 1) * 300; // Increased panning range

      setPopup(prev => ({
        ...prev,
        translateX: Math.min(Math.max(translateX, -maxTranslate), maxTranslate),
        translateY: Math.min(Math.max(translateY, -maxTranslate), maxTranslate)
      }));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      lastTouchDistance.current = 0;
    }

    if (e.touches.length === 0) {
      setPopup(prev => ({
        ...prev,
        isDragging: false
      }));
    }
  };

  // Handle wheel event for zooming with mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (e.deltaY < 0) {
      // Zoom in
      zoomImage(0.3);
    } else {
      // Zoom out
      zoomImage(-0.3);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!popup.show) return;

      switch(e.key) {
        case 'Escape':
          closePopup();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case '+':
        case '=':
          zoomImage(0.5);
          break;
        case '-':
          zoomImage(-0.5);
          break;
        case '0':
          resetZoom();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [popup.show]);

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (popup.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [popup.show]);

  // Main carousel slides
  const children = displayItems.slice(0, 6).map((item: any, index: number) => (
      <ZoomContainer
          key={index}
          onMouseEnter={() => setZoom(prev => ({ ...prev, active: true, img: item.url }))}
          onMouseLeave={() => setZoom(prev => ({ ...prev, active: false }))}
      >
        <ZoomableImage
            src={item.url}
            alt={title}
            onMouseMove={(e) => handleMouseMove(e, item.url)}
            onClick={() => handleThumbnailClick(index)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/default-product.png';
            }}
        />
      </ZoomContainer>
  ));

  // Create a wrapper component for custom dots
  const CustomDotWrapper = (props: any) => (
      <CustomDot
          {...props}
          imageUrl={imageUrls[props.index] || '/default-product.png'}
          title={title}
      />
  );

  // Determine device type
  const deviceType = mobile ? 'mobile' : tablet ? 'tablet' : 'desktop';

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
            customDot={<CustomDotWrapper />}
            {...rest}
        >
          {children.length > 0 ? children : (
              <ZoomContainer>
                <ZoomableImage
                    src="/default-product.png"
                    alt="Default product image"
                />
              </ZoomContainer>
          )}
        </Carousel>

        {/* Zoom overlay */}
        {/* <ZoomOverlay
        show={zoom.active}
        position={zoom.position}
        style={{
          backgroundImage: `url(${zoom.img})`,
          backgroundPosition: zoom.backgroundPosition
        }}
      /> */}

        {/* Image popup */}
        <ImagePopup show={popup.show} onClick={closePopup}>
          <CloseButton onClick={(e) => {
            e.stopPropagation();
            closePopup();
          }}>
            ×
          </CloseButton>

          <ImageCounter>
            {popup.currentIndex + 1} / {displayItems.length}
          </ImageCounter>

          {displayItems.length > 1 && (
              <>
                <NavigationButton position="left" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                  &#10094;
                </NavigationButton>
                <NavigationButton position="right" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                  &#10095;
                </NavigationButton>
              </>
          )}

          <ZoomControls>
            <ControlButton onClick={(e) => { e.stopPropagation(); zoomImage(-0.5); }}>
              −
            </ControlButton>
            <ControlButton onClick={(e) => { e.stopPropagation(); resetZoom(); }}>
              Fit
            </ControlButton>
            <ControlButton onClick={(e) => { e.stopPropagation(); zoomImage(0.5); }}>
              +
            </ControlButton>
          </ZoomControls>

          <PopupImageContainer>
            <PopupImageWrapper
                ref={wrapperRef}
                scale={popup.scale}
                translateX={popup.translateX}
                translateY={popup.translateY}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMovePopup}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  cursor: popup.scale > 1.2 ? (popup.isDragging ? 'grabbing' : 'grab') : 'zoom-out'
                }}
            >
              <PopupImage
                  ref={imageRef}
                  src={displayItems[popup.currentIndex]?.url || '/default-product.png'}
                  alt={title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/default-product.png';
                  }}
              />
            </PopupImageWrapper>
          </PopupImageContainer>
        </ImagePopup>
      </>
  );
};

export default CarouselWithCustomDots;
