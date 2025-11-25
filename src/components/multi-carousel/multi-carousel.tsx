import React, { useState, useEffect, useRef } from 'react';
import { themeGet } from '@styled-system/theme-get';
import styled from 'styled-components';

// Styled Components
const CarouselAlignmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden; 
  
  .carousel-with-custom-dots {
    width: 100% !important;
    max-width: 100%;
  }
  
  .react-multi-carousel-list {
    width: 100% !important;
    max-width: 100%;
  }
`;

const ScrollableGallery = styled.div<{ isScrollable: boolean }>`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  width: 100%;
  gap: 10px;
  // margin-top: -50px;
  padding-bottom: 10px ;
  scrollbar-width: thin;
  scrollbar-color: ${themeGet('colors.primary.regular', '#009E7F')} transparent;
  
  /* Center content when not scrollable */
  justify-content: ${props => props.isScrollable ? 'flex-start' : 'center'};

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${themeGet('colors.primary.regular', '#009E7F')};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${themeGet('colors.primary.dark', '#007a63')};
  }
`;

const GalleryItem = styled.div<{ isActive: boolean }>`
  flex: 0 0 auto;
  width: 50px;
  height: 50px;
  border: 2px solid ${props => props.isActive ? themeGet('colors.primary.regular', '#009E7F') : themeGet('colors.gray.500', '#f1f1f1')};
  border-radius: ${themeGet('radii.base', '6px')};
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${themeGet('colors.primary.regular', '#009E7F')};
    transform: scale(1.05);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ZoomContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  width: 100%;
  height: fit-content;

  // @media (max-width: 1224px) {
  //   height: 570px;
  // }
  // @media (max-width: 1114px) {
  //   height: 510px;
  // }
  // @media (max-width: 770px) {
  //   height: 620px;
  // }
  // @media (max-width: 600px) {
  //   height: 610px;
  // }
  // @media (max-width: 400px) {
  //   height: 500px;
  // }
`;

const ZoomableImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: zoom-in;
`;

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

const PopupNavigationButton  = styled.button<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ position }) => position}: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  // z-index: 1001;
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
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  z-index: 2001;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ScrollButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
  width: 100%;
`;

const ScrollButton = styled.button`
  background: ${themeGet('colors.primary.regular', '#009E7F')};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 80px;

  &:hover {
    background: ${themeGet('colors.primary.dark', '#007a63')};
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${themeGet('colors.gray.400', '#ccc')};
    cursor: not-allowed;
    transform: none;
  }

  &:active {
    transform: translateY(0);
  }
`;

const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [popup, setPopup] = useState({
    show: false,
    currentIndex: 0,
    scale: 1.2,
    translateX: 0,
    translateY: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
  });
  const [isGalleryScrollable, setIsGalleryScrollable] = useState(false);

  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const lastTouchDistance = useRef<number>(0);

  // Get the correct set of images to display
  const displayItems = selectedColor?.gallery?.length > 0
      ? selectedColor.gallery
      : selectedColor?.image
          ? [{ url: selectedColor.image }]
          : items;

  const imageUrls = displayItems.map(item => item.url);

  // Check if gallery is scrollable
  const checkIfGalleryIsScrollable = () => {
    if (galleryScrollRef.current) {
      const { scrollWidth, clientWidth } = galleryScrollRef.current;
      setIsGalleryScrollable(scrollWidth > clientWidth);
    }
  };

  // Check scrollability on mount and when items change
  useEffect(() => {
    checkIfGalleryIsScrollable();

    // Also check after a small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(checkIfGalleryIsScrollable, 100);

    return () => clearTimeout(timeoutId);
  }, [displayItems]);

  // Check scrollability on window resize
  useEffect(() => {
    const handleResize = () => {
      checkIfGalleryIsScrollable();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll gallery functions
  const scrollGallery = (direction: 'left' | 'right') => {
    if (!galleryScrollRef.current) return;

    const scrollAmount = 150;
    const newScrollLeft = galleryScrollRef.current.scrollLeft +
        (direction === 'right' ? scrollAmount : -scrollAmount);

    galleryScrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const canScrollLeft = () => {
    if (!galleryScrollRef.current) return false;
    return galleryScrollRef.current.scrollLeft > 0;
  };

  const canScrollRight = () => {
    if (!galleryScrollRef.current) return false;
    return galleryScrollRef.current.scrollLeft <
        (galleryScrollRef.current.scrollWidth - galleryScrollRef.current.clientWidth);
  };

  // Handle opening popup
  const handleThumbnailClick = (index: number) => {
    setPopup({
      show: true,
      currentIndex: index,
      scale: 1.2,
      translateX: 0,
      translateY: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
    });
  };

  // Handle main image click
  const handleMainImageClick = () => {
    handleThumbnailClick(currentImageIndex);
  };

  // Navigate to next image in main view
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % displayItems.length);
  };

  // Navigate to previous image in main view
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + displayItems.length) % displayItems.length);
  };

  // Popup navigation
  const nextImagePopup = () => {
    setPopup(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % displayItems.length,
      scale: 1.2,
      translateX: 0,
      translateY: 0
    }));
  };

  const prevImagePopup = () => {
    setPopup(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + displayItems.length) % displayItems.length,
      scale: 1.2,
      translateX: 0,
      translateY: 0
    }));
  };

  // Close popup
  const closePopup = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPopup(prev => ({
      ...prev,
      show: false
    }));
  };

  // Zoom functions
  const zoomImage = (factor: number) => {
    setPopup(prev => ({
      ...prev,
      scale: Math.max(0.8, Math.min(8, prev.scale + factor)),
      translateX: 0,
      translateY: 0
    }));
  };

  const resetZoom = () => {
    setPopup(prev => ({
      ...prev,
      scale: 1.2,
      translateX: 0,
      translateY: 0
    }));
  };

  // Dragging functions for popup
  const handleMouseDown = (e: React.MouseEvent) => {
    if (popup.scale <= 1.2) return;

    setPopup(prev => ({
      ...prev,
      isDragging: true,
      startX: e.clientX - prev.translateX,
      startY: e.clientY - prev.translateY
    }));
  };

  const handleMouseMovePopup = (e: React.MouseEvent) => {
    if (!popup.isDragging || popup.scale <= 1.2) return;

    e.preventDefault();

    const translateX = e.clientX - popup.startX;
    const translateY = e.clientY - popup.startY;

    const maxTranslate = (popup.scale - 1) * 300;

    setPopup(prev => ({
      ...prev,
      translateX: Math.min(Math.max(translateX, -maxTranslate), maxTranslate),
      translateY: Math.min(Math.max(translateY, -maxTranslate), maxTranslate)
    }));
  };

  const handleMouseUp = () => {
    setPopup(prev => ({
      ...prev,
      isDragging: false
    }));
  };

  // Touch events for mobile
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
      e.preventDefault();
      const touch = e.touches[0];

      const translateX = touch.clientX - popup.startX;
      const translateY = touch.clientY - popup.startY;

      const maxTranslate = (popup.scale - 1) * 300;

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

  // Wheel event for zooming
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (e.deltaY < 0) {
      zoomImage(0.3);
    } else {
      zoomImage(-0.3);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (popup.show) {
        // Popup keyboard controls
        switch(e.key) {
          case 'Escape':
            closePopup();
            break;
          case 'ArrowRight':
            nextImagePopup();
            break;
          case 'ArrowLeft':
            prevImagePopup();
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
      } else {
        // Main view keyboard controls
        switch(e.key) {
          case 'ArrowRight':
            nextImage();
            break;
          case 'ArrowLeft':
            prevImage();
            break;
          default:
            break;
        }
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

  return (
      <>
        <CarouselAlignmentWrapper>
          {/* Main Image Display */}
          <MainImageContainer>
            <ZoomContainer>
              <ZoomableImage
                  src={displayItems[currentImageIndex]?.url || '/default-product.png'}
                  alt={title}
                  onClick={handleMainImageClick}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/default-product.png';
                  }}
              />
            </ZoomContainer>

            {/* Navigation Arrows for Main Image */}
            {/* {displayItems.length > 1 && (
            <>
              <NavigationButton
                position="left"
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
              >
                &#10094;
              </NavigationButton>
              <NavigationButton
                position="right"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
              >
                &#10095;
              </NavigationButton>
            </>
          )} */}
          </MainImageContainer>

          {/* Scrollable Gallery */}
          <div style={{ width: '100%' }}>
            <ScrollableGallery
                ref={galleryScrollRef}
                isScrollable={isGalleryScrollable}
                onScroll={checkIfGalleryIsScrollable}
            >
              {displayItems.map((item, index) => (
                  <GalleryItem
                      key={index}
                      isActive={index === currentImageIndex}
                      onClick={() => setCurrentImageIndex(index)}
                  >
                    <GalleryImage
                        src={item.url}
                        alt={`${title} - Thumbnail ${index + 1}`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/default-product.png';
                        }}
                    />
                  </GalleryItem>
              ))}
            </ScrollableGallery>

          </div>
        </CarouselAlignmentWrapper>

        {/* Image Popup */}
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
                <PopupNavigationButton  position="left" onClick={(e) => { e.stopPropagation(); prevImagePopup(); }}>
                  &#10094;
                </PopupNavigationButton>
                <PopupNavigationButton  position="right" onClick={(e) => { e.stopPropagation(); nextImagePopup(); }}>
                  &#10095;
                </PopupNavigationButton>
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