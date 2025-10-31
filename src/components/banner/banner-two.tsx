import React, { useEffect } from 'react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderNav } from './banner.style';
import { ArrowNext } from 'assets/icons/ArrowNext';
import { ArrowPrev } from 'assets/icons/ArrowPrev';
import styled from 'styled-components';

interface Props {
    data: any[] | undefined;
}

SwiperCore.use([Navigation]);
SwiperCore.use([Autoplay]);

const ImageWrapper = styled.div({
    position: 'relative',
    marginTop: '10px',
    width: '100%',
    height: 'auto',

    img: {
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
    },

    '@media (max-width: 575px)': {
        minHeight: 180,
        img: {
            height: 180,
            objectPosition: 'left',
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
    if (!data || data.length === 0) return null;

    // Preload first banner image for fastest LCP
    useEffect(() => {
        if (data && data[0]?.image) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = data[0].image;
            document.head.appendChild(link);

            // Cleanup
            return () => {
                document.head.removeChild(link);
            };
        }
    }, [data]);

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
                        <OptimizedImg
                            src={item.image}
                            alt={item.alt || `Banner ${idx + 1}`}
                            loading={idx === 0 ? "eager" : "lazy"}
                            decoding="async"
                            fetchPriority={idx === 0 ? "high" : "low"}
                            width="1200"
                            height="400"
                        />
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