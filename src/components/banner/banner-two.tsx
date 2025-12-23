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

const ImageWrapper = styled.div({
    position: 'relative',
    marginTop: '10px',
    width: '100%',
    minHeight: 180,
    height: 650, // desktop height
    overflow: 'hidden',

    // Ensure NextImage fill or img elements fill the container
    '& > span, & > img': {
        width: '100%',
        height: '100% !important',
        display: 'block',
    },

    '@media (max-width: 575px)': {
        minHeight: 180,
        height: 320, // increase mobile height to avoid clipping
        '& > span, & > img': {
            height: '100% !important',
            objectPosition: 'center',
            objectFit: 'cover',
        },
    },
});

const OptimizedImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  
  @media (max-width: 575px) {
    height: 180px;
    object-position: left;
    object-fit: cover;
  }
`;

const Banner = ({ data }: Props) => {
    useEffect(() => {
        if (!data || !data[0]?.image) {
            return;
        }

        const firstImage = data[0]?.image;
        if (!firstImage) {
            return;
        }

        // Resolve imported image objects to their URL (.src) to avoid creating a link.href of [object Object]
        const resolveSrc = (src: any) => (typeof src === 'object' && src?.src) ? src.src : src;
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
        <Swiper
            id='banner'
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            loop={true}
            navigation={{
                nextEl: '.banner-slider-next',
                prevEl: '.banner-slider-prev',
            }}
            style={{ marginBottom: 20, minHeight: 180 }}
        >
            {data.map((item, idx) => (
                <SwiperSlide key={idx}>
                    <ImageWrapper>
                        {(() => {
                            const src = item.image || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="650"><rect width="100%" height="100%" fill="#f6f6f6" /></svg>';
                            return (
                                <NextImage
                                    src={src}
                                    alt={item.alt || `Banner ${idx + 1}`}
                                    priority={idx === 0}
                                    fill
                                    sizes="(max-width: 575px) 100vw, 1200px"
                                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                                    unoptimized={typeof src === 'string' && src.startsWith('data:image')}
                                />
                            );
                        })()}
                    </ImageWrapper>
                </SwiperSlide>
            ))} 
            <SliderNav className='banner-slider-next'>
                <ArrowNext/>
            </SliderNav>
            <SliderNav className='banner-slider-prev'>
                <ArrowPrev/>
            </SliderNav>
        </Swiper>
    );
};

export default Banner;