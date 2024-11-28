import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Modal } from '@redq/reuse-modal';
const Products = dynamic(() =>
    import('components/product-grid/product-list/product-list')
);
import {
    MainContentArea,
    SidebarSection,
    ContentSection,
    MobileCarouselDropdown,
    MainWrapper, ProductsWrapper,
} from 'assets/styles/pages.style';
import { SEO } from 'components/seo';
import { useRefScroll } from 'utils/use-ref-scroll';
import { ModalProvider } from 'contexts/modal/modal.provider';
import Footer from "../../layouts/footer";
import {useSocial} from "../../data/use-website";

const Sidebar = dynamic(() => import('layouts/sidebar/sidebar'));
const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
    ssr: false,
});

const CategoryPage: React.FC<any> = ({ deviceType }) => {
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
            <SEO  />
            <ModalProvider>
                <Modal>
                    <MainWrapper>
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
                                <Footer social={social}/>
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
