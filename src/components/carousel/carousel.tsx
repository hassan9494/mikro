import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
// Styles required by react-multi-carousel (was missing, causing slides to stack)
import 'react-multi-carousel/lib/styles.css';

const Carousel = dynamic(() => import('react-multi-carousel'), { ssr: false });
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { ArrowNext } from 'assets/icons/ArrowNext';
import { ArrowPrev } from 'assets/icons/ArrowPrev';
import { useLocale } from 'contexts/language/language.provider';

const ButtonPrev = styled('button')`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeGet('colors.white', '#ffffff')};
  color: ${themeGet('colors.primary.regular', '#009E7F')};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet('shadows.base', '0 3px 6px rgba(0, 0, 0, 0.16)')};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const ButtonNext = styled('button')`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: ${themeGet('colors.primary.regular', '#009E7F')};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet('shadows.base', '0 3px 6px rgba(0, 0, 0, 0.16)')};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const ButtonGroupWrapper = styled('div')``;

// Optimized image component
const OptimizedImg = styled.img`
  width: 100%;
  min-height: 200px; /* ensure visible area even if image missing */
  height: 100%;
  display: block;
  position: relative;
  object-fit: cover;
  background-color: #f6f6f6; /* light placeholder */
`;

const SlideContainer = styled.div`
  padding: 0 15px;
  overflow: hidden;
  min-height: 200px;

  @media (max-width: 575px) {
    min-height: 140px;
  }
`;

const LinkWrapper = styled.a`
  display: block; /* ensure the link takes the full slide */
  cursor: pointer;
  text-decoration: none;
  height: 100%;
`;

const PrevButton = ({ onClick, children }: any) => {
    return (
        <ButtonPrev
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className='prevButton'
        >
            {children}
        </ButtonPrev>
    );
};

const NextButton = ({ onClick, children }: any) => {
    return (
        <ButtonNext
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className='nextButton'
        >
            {children}
        </ButtonNext>
    );
};

const ButtonGroup = ({ next, previous }: any) => {
    const { isRtl }: any = useLocale();

    return (
        <ButtonGroupWrapper>
            {isRtl ? (
                <>
                    <NextButton onClick={() => next()} className='rtl'>
                        <ArrowPrev/>
                    </NextButton>
                    <PrevButton onClick={() => previous()}>
                        <ArrowNext/>
                    </PrevButton>
                </>
            ) : (
                <>
                    <PrevButton onClick={() => previous()}>
                        <ArrowPrev/>
                    </PrevButton>
                    <NextButton onClick={() => next()}>
                        <ArrowNext/>
                    </NextButton>
                </>
            )}
        </ButtonGroupWrapper>
    );
};

type Props = {
    data: any[] | undefined;
    deviceType: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    props?: any;
    component?: any;
    autoPlay?: boolean;
    infinite?: boolean;
    isRtl?: boolean;
    customLeftArrow?: React.ReactElement;
    customRightArrow?: React.ReactElement;
    itemClass?: string;
};

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export default function CustomCarousel({
                                           data,
                                           deviceType: { mobile, tablet, desktop },
                                           component,
                                           autoPlay = false,
                                           infinite = true,
                                           customLeftArrow,
                                           customRightArrow,
                                           itemClass,
                                           isRtl,
                                           ...props
                                       }: Props) {
    useEffect(() => {
        if (!data || data.length === 0) {
            return;
        }

        const resolveSrc = (src: any) => (typeof src === 'object' && src?.src) ? src.src : src;
        const links: HTMLLinkElement[] = [];
        data.slice(0, 3).forEach((item) => {
            const src = resolveSrc(item?.image);
            if (src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
                links.push(link);
            }
        });

        return () => {
            links.forEach((link) => {
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
            });
        };
    }, [data]);

    if (!data || data.length === 0) return null;

    return (
        <div dir='ltr'>
            <Carousel
                arrows={false}
                responsive={responsive}
                showDots={false}
                slidesToSlide={1}
                infinite={infinite}
                containerClass='container-with-dots'
                itemClass={itemClass}
                autoPlay={autoPlay}
                autoPlaySpeed={3000}
                renderButtonGroupOutside={true}
                additionalTransfrom={0}
                customButtonGroup={<ButtonGroup/>}
                {...props}
            >
                {data.map((item: any, index: number) => {
                    const key = item?.id ?? item?.slug ?? index;

                    const resolveSrc = (src: any) => (typeof src === 'object' && src?.src) ? src.src : src;
                    const imgSrc = resolveSrc(item.image) || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400"><rect width="100%" height="100%" fill="#f6f6f6" /></svg>';

                    if (component) {
                        return (
                            <SlideContainer key={key}>
                                {component(item)}
                            </SlideContainer>
                        );
                    }

                    return (
                        <SlideContainer key={key}>
                            {typeof item.link === 'string' ? (
                                <LinkWrapper
                                    href={item.link}
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    <OptimizedImg
                                        src={imgSrc}
                                        alt={item?.alt || `Carousel item ${index + 1}`}
                                        loading={index < 3 ? "eager" : "lazy"} // Load first 3 immediately
                                        decoding="async"
                                        onError={(e: any) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400"><rect width="100%" height="100%" fill="#f6f6f6" /></svg>';
                                        }}
                                    />
                                </LinkWrapper>
                            ) : (
                                <div>
                                    <OptimizedImg
                                        src={imgSrc}
                                        alt={item?.alt || `Carousel item ${index + 1}`}
                                        loading={index < 3 ? "eager" : "lazy"}
                                        decoding="async"
                                        onError={(e: any) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400"><rect width="100%" height="100%" fill="#f6f6f6" /></svg>';
                                        }}
                                    />
                                </div>
                            )} 
                        </SlideContainer>
                    );
                })}
            </Carousel>
        </div>
    );
}