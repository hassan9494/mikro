import React from 'react';
import { NextPage } from 'next';
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
import { useSocial } from "../../data/use-website";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { getAllCategories, getCategoryBySlug } from 'utils/api/category';

const Sidebar = dynamic(() => import('layouts/sidebar/sidebar'));
const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
    ssr: false,
});

type Props = {
    deviceType?: any;
    data: any;
    social: any;
};

function Loading() {
    return (
        <Backdrop open={true}>
            <CircularProgress/>
        </Backdrop>
    );
}

const CategoryPage: NextPage<Props> = ({ data, deviceType, social }) => {
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
    const selectedCategory = data;

    // Use router fallback for loading state
    if (useRouter().isFallback || !selectedCategory?.slug) {
        return <Loading />;
    }

    const baseUrl = "http://127.0.0.1:8000";

    const categoryName = selectedCategory?.meta_title && selectedCategory?.meta_title !== selectedCategory?.title
        ? `${selectedCategory?.title} | ${selectedCategory?.meta_title}`
        : selectedCategory?.title;

    const categoryDescription = selectedCategory?.meta_description && selectedCategory?.meta_description !== selectedCategory?.description
        ? `${selectedCategory?.description} ${selectedCategory?.meta_description}`
        : selectedCategory?.description || `Browse products in ${selectedCategory?.title}.`;

    const canonicalUrl = `${baseUrl}/category/${selectedCategory?.slug}`;
    const categoryImage = selectedCategory?.image || "https://mikroelectron.com/assets/img/logo-1.png";

    const categoryJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": categoryName,
        "description": categoryDescription,
        "url": canonicalUrl,
        "image": categoryImage,
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
            <SEO
                title={categoryName}
                description={categoryDescription}
                keywords={selectedCategory?.title}
                canonical={canonicalUrl}
                image={categoryImage}
                jsonLd={categoryJsonLd}
            />
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

export async function getStaticProps({ params }) {
    const data = await getCategoryBySlug(params.category);

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            data,
        },
        revalidate: 10, // Revalidate every 10 seconds
    };
}

export async function getStaticPaths() {
    const categories = await getAllCategories();

    // If no categories found, return empty paths
    if (!categories || categories.length === 0) {
        return {
            paths: [],
            fallback: 'blocking',
        };
    }

    const paths = categories.map((category) => ({
        params: { category: category.slug.toLowerCase() },
    }));

    return {
        paths,
        fallback: 'blocking', // Use blocking mode for SSR
    };
}

export default CategoryPage;






















// import React from 'react';
// import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';
// import { Modal } from '@redq/reuse-modal';
//
// const Products = dynamic(() =>
//     import('components/product-grid/product-list/product-list')
// );
// import {
//     MainContentArea,
//     SidebarSection,
//     ContentSection,
//     MobileCarouselDropdown,
//     MainWrapper, ProductsWrapper,
// } from 'assets/styles/pages.style';
// import { SEO } from 'components/seo';
// import { useRefScroll } from 'utils/use-ref-scroll';
// import { ModalProvider } from 'contexts/modal/modal.provider';
// import Footer from "../../layouts/footer";
// import {useSocial} from "../../data/use-website";
// import useCategory from "../../data/use-category";
//
// const Sidebar = dynamic(() => import('layouts/sidebar/sidebar'));
// const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
//     ssr: false,
// });
//
// const CategoryPage: React.FC<any> = ({ deviceType }) => {
//     const { data: social } = useSocial();
//     const { data: categories, loading } = useCategory(); // Change isLoading to loading
//     const { query } = useRouter();
//     const { elRef: targetRef, scroll } = useRefScroll({
//         percentOfElement: 0,
//         percentOfContainer: 0,
//         offsetPX: -110,
//     });
//
//     React.useEffect(() => {
//         if (query?.text || query?.category) {
//             scroll();
//         }
//     }, [query?.text, query?.category]);
//
//     const PAGE_TYPE: any = query?.type;
//     const selectedCategory = categories?.find((item) => item?.slug === query?.category);
//
//     // Use query.category as fallback since it's available immediately
//     const categorySlug = query?.category as string;
//     const fallbackTitle = categorySlug ?
//         `${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} | Mikroelectron` :
//         'Mikroelectron';
//
//     const baseUrl = "https://mikroelectron.com";
//     const categoryName = selectedCategory?.meta_title && selectedCategory?.meta_title !== selectedCategory?.title
//         ? `${selectedCategory?.title} | ${selectedCategory?.meta_title}`
//         : selectedCategory?.title || fallbackTitle;
//
//     const categoryDescription = selectedCategory?.meta_description && selectedCategory?.meta_description !== selectedCategory?.description
//         ? `${selectedCategory?.description} ${selectedCategory?.meta_description}`
//         : selectedCategory?.description || `Browse products in ${selectedCategory?.title || categorySlug || 'our category'}.`;
//
//     const canonicalUrl = `${baseUrl}/category/${selectedCategory?.slug || categorySlug}`;
//     const categoryImage = selectedCategory?.image || "https://mikroelectron.com/assets/img/logo-1.png";
//
//     const categoryJsonLd = selectedCategory ? {
//         "@context": "https://schema.org",
//         "@type": "ItemList",
//         "name": categoryName,
//         "description": categoryDescription,
//         "url": canonicalUrl,
//         "image": categoryImage,
//         "itemListElement": selectedCategory?.children?.map((child, idx) => ({
//             "@type": "ListItem",
//             "position": idx + 1,
//             "name": child.title,
//             "url": `${baseUrl}/category/${child.slug}`,
//             "image": child.image
//         }))
//     } : undefined;
//
//     // Show loading state if categories are still loading
//     if (loading && !selectedCategory) {
//         return (
//             <>
//                 <SEO
//                     title={fallbackTitle}
//                     description={`Browse products in ${categorySlug || 'our category'}.`}
//                     keywords={categorySlug}
//                     canonical={canonicalUrl}
//                     image={categoryImage}
//                 />
//                 <div>Loading...</div>
//             </>
//         );
//     }
//
//     return (
//         <>
//             {/* REMOVE THE CONDITIONAL - Always render SEO */}
//             <SEO
//                 title={categoryName}
//                 description={categoryDescription}
//                 keywords={selectedCategory?.title || categorySlug}
//                 canonical={canonicalUrl}
//                 image={categoryImage}
//                 jsonLd={categoryJsonLd}
//             />
//
//             <ModalProvider>
//                 <Modal>
//                     <MainWrapper>
//                         <MobileCarouselDropdown>
//                             <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
//                         </MobileCarouselDropdown>
//                         <MainContentArea>
//                             <SidebarSection>
//                                 <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
//                             </SidebarSection>
//                             <ContentSection>
//                                 <ProductsWrapper>
//                                     <div ref={targetRef}>
//                                         <Products type={PAGE_TYPE} deviceType={deviceType} />
//                                     </div>
//                                 </ProductsWrapper>
//                                 <Footer social={social}/>
//                             </ContentSection>
//                         </MainContentArea>
//                         <CartPopUp deviceType={deviceType} />
//                     </MainWrapper>
//                 </Modal>
//             </ModalProvider>
//         </>
//     );
// };
//
// export default CategoryPage;