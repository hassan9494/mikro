import React, { useState } from 'react';
import SwiperCore, { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import NextImage from 'next/image';

// install Swiper's Thumbs component
SwiperCore.use([Thumbs]);

export const ImageGallery = ({ data }) => {
    // store thumbs swiper instance
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    console.log(data, 'gallery');
    const slides = data?.map((current, idx) => (
        <SwiperSlide key={idx}>
            <NextImage
                src={current.url}
                alt={`Gallery Image ${idx}`}
                width={800}
                height={400}
                style={{ width: '100%', display: 'block', height: 'auto', objectFit: 'cover' }}
                priority={idx === 0}
            />
        </SwiperSlide>
    ));
    return (
        <>
            <Swiper thumbs={{ swiper: thumbsSwiper }}>{slides}</Swiper>
            <Swiper onSwiper={setThumbsSwiper} spaceBetween={5} slidesPerView={3}>
                {slides}
            </Swiper>
        </>
    );
};
