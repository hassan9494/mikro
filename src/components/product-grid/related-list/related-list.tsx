import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import {
    LoaderWrapper,
    LoaderItem,
    ProductCardWrapper,
    SliderStyles
} from './related-list.style';
import { CURRENCY } from 'utils/constant';
import Placeholder from 'components/placeholder/placeholder';
import { motion } from 'framer-motion';
import useRelatedProducts from "../../../data/use-related-products";
import { FormattedMessage } from "react-intl";
import { ProductCard } from 'components/product-card/product-card-six';
import { Button } from "../../button/button";

const ErrorMessage = dynamic(() =>
    import('components/error-message/error-message')
);

type ProductsProps = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    slug?: any;
};

export const RelatedProducts: React.FC<ProductsProps> = ({
    deviceType,
    slug
}) => {
    // const [showAll, setShowAll] = useState(false);
    const { data, error } = useRelatedProducts({
        sku: slug
    });

    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={onClick}
                aria-hidden="true"
            />
        );
    };

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={onClick}
                aria-hidden="true"
            />
        );
    };

    const sliderSettings = {
        dots: true,
        infinite: data && data.length > 4,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        adaptiveHeight: true,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    infinite: data && data.length > 3,
                    autoplay: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    arrows: true,
                    infinite:  data && data.length > 3,
                    autoplay: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    arrows: true,
                    infinite:  data && data.length > 2,
                    autoplay: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    arrows: true,
                    infinite:  data && data.length > 1,
                    autoplay: true
                }
            }
        ]
    };

    if (error) return <ErrorMessage message={error.message} />;

    if (!data) {
        return (
            <LoaderWrapper>
                <LoaderItem>
                    <Placeholder uniqueKey="1" />
                </LoaderItem>
                <LoaderItem>
                    <Placeholder uniqueKey="2" />
                </LoaderItem>
                <LoaderItem>
                    <Placeholder uniqueKey="3" />
                </LoaderItem>
                <LoaderItem>
                    <Placeholder uniqueKey="4" />
                </LoaderItem>
            </LoaderWrapper>
        );
    }

    if (data.length === 0) {
        return <></>;
    }

    // const displayCount = showAll ? data.length : Math.min(8, data.length);
    // const hasMore = data.length > 8;

    const renderCard = (props, index) => (
        <ProductCardWrapper className="product-card-wrapper" key={`${props.id}-${index}`}>
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                style={{ height: '100%' }}
            >
                <ProductCard data={props} />
            </motion.div>
        </ProductCardWrapper>
    );

    return (
        <SliderStyles>
            <div className="slider-container">
                <div className="slider-inner">
                    <h2 className="slider-title">
                        <FormattedMessage
                            id="intlReletedItems"
                            defaultMessage="Related Items"
                        />
                    </h2>
                    
                    <Slider {...sliderSettings}>
                        {data.map((item, index) => (
                            <div key={`slide-${item.id}-${index}`} className="slide-item">
                                {renderCard(item, index)}
                            </div>
                        ))}
                    </Slider>

                    {/*{!showAll && hasMore && (*/}
                    {/*    <div className="show-more-container">*/}
                    {/*        <Button*/}
                    {/*            onClick={() => setShowAll(true)}*/}
                    {/*            className="show-more-button"*/}
                    {/*            title="Show more related products"*/}
                    {/*        >*/}
                    {/*            + {data.length - 8} More*/}
                    {/*        </Button>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
        </SliderStyles>
    );
};

export default RelatedProducts;