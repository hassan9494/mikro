import React from 'react';
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

const Banner = ({ data }: Props) => {
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
                        <img src={item.image} alt={item.alt}/>
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
