import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SEO } from 'components/seo';
import { Modal } from 'components/modal/modal-provider';

import ProductSingleWrapper, {
    ProductSingleContainer,
} from 'assets/styles/product-single.style';
import { getProductBySlug } from 'utils/api/product';

import { Backdrop, CircularProgress } from "@mui/material";
import { useProduct } from "data/use-products";
import Footer from "../../layouts/footer";
import { useSocial } from "../../data/use-website";
import { ContentSection, MainContentArea, MainWrapper } from "../../assets/styles/pages.style";

const stripHtml = (html) => {
    if (typeof window !== 'undefined') {
        // Client-side
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    } else {
        // Server-side
        return html.replace(/<[^>]*>?/gm, '');
    }
};

const ProductDetails = dynamic(() =>
    import('components/product-details/product-details-one/product-details-one')
);
const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
    ssr: false,
});

type Props = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    data: any;
    [key: string]: any;
    social?: any;
};

// Helper to safely get meta fields
function getMetaField(obj, field, fallback) {
    return obj[`${field}`] ? obj[`${field}`] : fallback;
}

function Loading() {
    return (
        <Backdrop open={true}>
            <CircularProgress />
        </Backdrop>
    );
}

const ProductPage: NextPage<Props> = ({ data, deviceType, social }) => {
    // const {data: social} = useSocial();
    const router = useRouter();
    const productSlug = data?.slug ?? router.query.slug;
    const { data: swrProduct, loading: productLoading } = useProduct(productSlug);

    const resolvedProduct = swrProduct ?? data;
    const isLoading = productLoading && !resolvedProduct;

    if (!resolvedProduct?.slug) {
        return <Loading />;
    }

    // Prepare meta fields
    const cleanShortDescription = resolvedProduct.short_description ? stripHtml(resolvedProduct.short_description) : '';
    const cleanDescription = resolvedProduct.description ? stripHtml(resolvedProduct.description) : '';
    const title = getMetaField(resolvedProduct, 'meta_title', resolvedProduct.title);
    const description = getMetaField(resolvedProduct, 'meta_description', cleanShortDescription || cleanDescription);
    const keywords = getMetaField(resolvedProduct, 'meta_keyword', undefined);
    const productTitle = resolvedProduct.title;
    const productShortDescription = cleanShortDescription;
    const canonical = `https://mikroelectron.com/product/${resolvedProduct.slug}`;
    const image = resolvedProduct.image;

    // Prepare concatenated name and description for JSON-LD
    const productName = (resolvedProduct.meta_title && resolvedProduct.meta_title !== resolvedProduct.title)
        ? `${resolvedProduct.title} | ${resolvedProduct.meta_title}`
        : resolvedProduct.title;
    const productDescriptionText = (resolvedProduct.meta_description && resolvedProduct.meta_description !== cleanDescription)
        ? `${cleanDescription} ${resolvedProduct.meta_description}`
        : cleanDescription;
    // Prepare JSON-LD structured data
    const productJsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productName,
        "description": productDescriptionText,
        "disambiguatingDescription": cleanShortDescription,
        "sku": resolvedProduct.sku,
        "mpn": resolvedProduct.sku, // If you have a separate MPN, use it
        "brand": {
            "@type": "Brand",
            "name": resolvedProduct.brand?.name || "Mikroelectron"
        },
        "category": resolvedProduct.categories?.map(cat => cat.title),
        "keywords": resolvedProduct.meta_keyword,
        "image": (resolvedProduct.gallery && resolvedProduct.gallery.length > 0)
            ? resolvedProduct.gallery.map(img => img.url)
            : [resolvedProduct.image],
        "offers": {
            "@type": "Offer",
            "url": `https://mikroelectron.com/product/${resolvedProduct.slug}`,
            "priceCurrency": "JOD",
            "price": resolvedProduct.sale_price || resolvedProduct.price,
            "priceSpecification": resolvedProduct.sale_price ? {
                "@type": "UnitPriceSpecification",
                "price": resolvedProduct.sale_price,
                "priceCurrency": "JOD"
            } : undefined,
            "availability": (resolvedProduct.availableQty > 0 && resolvedProduct.is_available)
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            "inventoryLevel": {
                "@type": "QuantitativeValue",
                "value": resolvedProduct.availableQty
            }
        },
        "manufacturer": resolvedProduct.source ? {
            "@type": "Organization",
            "name": resolvedProduct.source
        } : undefined,
        "additionalProperty": [
            resolvedProduct.features && {
                "@type": "PropertyValue",
                "name": "Features",
                "value": resolvedProduct.features
            },
            resolvedProduct.packageInclude && {
                "@type": "PropertyValue",
                "name": "Package Include",
                "value": resolvedProduct.packageInclude
            },
            resolvedProduct.documents && {
                "@type": "PropertyValue",
                "name": "Documents",
                "value": resolvedProduct.documents
            }
        ].filter(Boolean)
    };


    return (

        <>
            <SEO
                title={title}
                description={description}
                itemTitle={productTitle}
                itemDescription={productShortDescription}
                keywords={keywords}
                canonical={canonical}
                image={image}
                jsonLd={productJsonLd}
            />
            {
                resolvedProduct ?
                    <Modal>
                        <ProductSingleWrapper>
                            <ProductSingleContainer>

                                <ProductDetails product={resolvedProduct} deviceType={deviceType} />
                                <CartPopUp deviceType={deviceType} />
                            </ProductSingleContainer>
                        </ProductSingleWrapper>
                        <Footer social={social} />
                    </Modal>
                    : isLoading ? <Loading /> : null
            }


        </>

    );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    const slugParam = params?.slug;

    if (!slugParam || Array.isArray(slugParam)) {
        return {
            notFound: true,
        };
    }

    try {
        const data = await getProductBySlug(slugParam);

        if (!data) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                data,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

export default ProductPage;