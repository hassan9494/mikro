import React, { useEffect } from 'react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { SliderNav } from './banner.style';
import { ArrowNext } from 'assets/icons/ArrowNext';
import { ArrowPrev } from 'assets/icons/ArrowPrev';
import styled from 'styled-components';
import NextImage from 'next/image';

interface Props {
    data: any[] | undefined;
}

SwiperCore.use([Navigation]);
SwiperCore.use([Autoplay]);

// Full width container with top padding
const FullWidthContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px; 
  
  @media (max-width: 768px) {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    margin-top: 30px; 
  }
`;

// Image container with top padding
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  
  // Desktop responsive heights
  @media (max-width: 1400px) { 
    height: 550px; 
  }
  @media (max-width: 1200px) { 
    height: 500px; 
  }
  @media (max-width: 992px) { 
    height: 450px; 
  }
  
  // Mobile: adjust height but keep full width
  @media (max-width: 768px) {
    height: 300px;
    width: 100vw;
  }
  
  @media (max-width: 480px) {
    height: 250px;
  }
  
  @media (max-width: 375px) {
    height: 200px;
  }

  // Ensure NextImage fills container
  & > span {
    width: 100% !important;
    height: 100% !important;
    
    @media (max-width: 768px) {
      width: 100vw !important;
    }
  }
`;

// Use the original SliderNav without any mobile modifications
const StyledSliderNav = styled(SliderNav)`
  z-index: 10;
  cursor: pointer;
`;

const Banner = ({ data }: Props) => {
    // Image preloading for better performance
    useEffect(() => {
        if (!data || !data[0]?.image) return;

        const firstImage = data[0].image;
        const resolveSrc = (src: any) =>
            (typeof src === 'object' && src?.src) ? src.src : src;

        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resolveSrc(firstImage);

        document.head.appendChild(link);

        return () => {
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
        };
    }, [data]);

    if (!data || data.length === 0) return null;

    return (
        <FullWidthContainer>
            <Swiper
                id='banner'
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                loop={true}
                navigation={{
                    nextEl: '.banner-slider-next',
                    prevEl: '.banner-slider-prev',
                }}
                observer={true}
                observeParents={true}
                style={{
                    width: '100%',
                    marginBottom: 20,
                    // Ensure Swiper container is full width on mobile
                    '@media (max-width: 768px)': {
                        width: '100vw'
                    }
                }}
            >
                {data.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <ImageContainer>
                            <NextImage
                                src={item.image || '/default-banner.jpg'}
                                alt={item.alt || `Banner ${idx + 1}`}
                                priority={idx < 2}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1920px"                                quality={100}
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    imageRendering: 'crisp-edges',
                                    WebkitFontSmoothing: 'antialiased',
                                    MozOsxFontSmoothing: 'grayscale',
                                }}
                            />
                        </ImageContainer>
                    </SwiperSlide>
                ))}
                <StyledSliderNav className='banner-slider-next'>
                    <ArrowNext/>
                </StyledSliderNav>
                <StyledSliderNav className='banner-slider-prev'>
                    <ArrowPrev/>
                </StyledSliderNav>
            </Swiper>
        </FullWidthContainer>
    );
};

export default Banner;