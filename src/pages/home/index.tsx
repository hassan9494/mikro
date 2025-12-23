import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Modal } from 'components/modal/modal-provider';
import Carousel from 'components/carousel/carousel';
// import { Banner } from 'components/banner/banner';
import Banner from 'components/banner/banner-two';
import { ProductGrid } from 'components/product-grid/product-grid-two';

import { MobileBanner } from 'components/banner/mobile-banner';
import {
    MainContentArea,
    SidebarSection,
    ContentSection,
    OfferSection,
    MobileCarouselDropdown,
    MainWrapper, ProductsWrapper,
} from 'assets/styles/pages.style';
// Static Data Import Here
import { SEO } from 'components/seo';
import { useRefScroll } from 'utils/use-ref-scroll';
import { ModalProvider } from 'contexts/modal/modal.provider';
import {useOffers, useSlides,useSocial} from "../../data/use-website";
import Footer from "../../layouts/footer";

const Sidebar = dynamic(() => import('layouts/sidebar/sidebar'));
const Products = dynamic(() =>
    import('components/product-grid/product-list/product-list')
);
const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
    ssr: false,
});

const CategoryPage: React.FC<any> = ({ deviceType }) => {

    const { data: offers } = useOffers();
    const { data: slides } = useSlides();
    const { data: social } = useSocial();

    const { query } = useRouter();
    const { elRef: targetRef, scroll } = useRefScroll({
        percentOfElement: 0,
        percentOfContainer: 0,
        offsetPX: -110,
    });
    React.useEffect(() => {
        if (query.text || query.category) {
            scroll();
        }
    }, [query.text, query.category]);
    const PAGE_TYPE: any = query.type;

    return (
        <>
            <SEO
                title="MikroElectron | Electronics store in Amman"
                description="MikroElectron is an electronics store in Amman, Jordan. We sell Arduino boards, Raspberry Pi, sensors, microcontrollers, and smart IoT devices. Supporting students, engineers, and makers with components for embedded systems, robotics, and graduation projects."
                canonical="https://mikroelectron.com/"
                image="https://mikroelectron.com/logo_mikro.svg"
            />
            <ModalProvider>
                <Modal>
                    <MainWrapper style={{ paddingTop: 0 }}>

                        {/*{*/}
                        {/*    !query.category &&*/}
                        {/*    <MobileBanner intlTitleId={page?.banner_title_id} type={PAGE_TYPE} />*/}
                        {/*}*/}
                        {
                            !query.category &&
                            <Banner data={slides} />
                        }
                        {
                            !query.category &&
                            <OfferSection>
                                <Carousel deviceType={deviceType} data={offers} />
                            </OfferSection>
                        }
                        <MobileCarouselDropdown>
                            <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
                        </MobileCarouselDropdown>
                        <MainContentArea>
                            <SidebarSection>
                                <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
                            </SidebarSection>
                            <ContentSection>
                                <ProductsWrapper>
                                    <div ref={targetRef}>
                                        <Products type={PAGE_TYPE} deviceType={deviceType} />
                                    </div>
                                </ProductsWrapper>
                                <Footer social={social} />
                            </ContentSection>

                        </MainContentArea>
                        <CartPopUp deviceType={deviceType} />
                    </MainWrapper>
                </Modal>
            </ModalProvider>
        </>
    );
};

export default CategoryPage;
