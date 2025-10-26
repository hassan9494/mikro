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
import useCategory from "../../data/use-category";

const Sidebar = dynamic(() => import('layouts/sidebar/sidebar'));
const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
    ssr: false,
});

const CategoryPage: React.FC<any> = ({ deviceType }) => {
    const { data: social } = useSocial();
    const { data:categories } = useCategory();
    const { query } = useRouter();
    const { elRef: targetRef, scroll } = useRefScroll({
        percentOfElement: 0,
        percentOfContainer: 0,
        offsetPX: -110,
    });
    React.useEffect(() => {
        if (query?.text || query?.category) {
            scroll();
        }
    }, [query?.text, query?.category]);
    const PAGE_TYPE: any = query?.type;
    const canonical = `https://mikroelectron.com/category/${query?.category}`;
    const selectedCategory = categories?.find((item) => item?.slug === query?.category);
    const baseUrl = "https://mikroelectron.com";
    const categoryName = selectedCategory?.meta_title && selectedCategory?.meta_title !== selectedCategory?.title
        ? `${selectedCategory?.title} | ${selectedCategory?.meta_title}`
        : selectedCategory?.title;
    const categoryDescription = selectedCategory?.meta_description && selectedCategory?.meta_description !== selectedCategory?.description
        ? `${selectedCategory?.description} ${selectedCategory?.meta_description}`
        : selectedCategory?.description || `Browse products in ${selectedCategory?.title}.`;
    const categoryJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": categoryName,
        "description": categoryDescription,
        "url": `${baseUrl}/category/${selectedCategory?.slug}`,
        "image": selectedCategory?.image,
        "itemListElement": selectedCategory?.children?.map((child, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": child.title,
            "url": `${baseUrl}/category/${child.slug}`,
            "image": child.image
        }))
    };

    return (
        <>
            {categories &&
            <SEO
                title={categoryName}
                description={categoryDescription}
                keywords={selectedCategory?.title}
                canonical={`${baseUrl}/category/${selectedCategory?.slug}`}
                image={selectedCategory?.image}
                jsonLd={categoryJsonLd}
            />
            }

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