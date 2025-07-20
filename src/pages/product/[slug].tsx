import React from 'react';
import {NextPage} from 'next';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {SEO} from 'components/seo';
import {Modal} from '@redq/reuse-modal';
import ProductSingleWrapper, {
    ProductSingleContainer,
} from 'assets/styles/product-single.style';
import {getAllProducts, getProductBySlug} from 'utils/api/product';
import {Backdrop, CircularProgress} from "@material-ui/core";
import {useProduct} from "data/use-products";
import Footer from "../../layouts/footer";
import {useSocial} from "../../data/use-website";
import {ContentSection, MainContentArea, MainWrapper} from "../../assets/styles/pages.style";
import {ModalProvider} from "../../contexts/modal/modal.provider";

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
    social: any;
};

// Helper to safely get meta fields
function getMetaField(obj, field, fallback) {
    return obj[`${field}`] ? obj[`${field}`] : fallback;
}

function Loading() {
    return (
        <Backdrop open={true}>
            <CircularProgress/>
        </Backdrop>
    );
}

const ProductPage: NextPage<Props> = ({data, deviceType, social}) => {
    // const {data: social} = useSocial();
    const router = useRouter();

    if (router.isFallback || !data?.slug) return <Loading/>;

    const { data: product } = useProduct(data?.slug || router.query.slug);
    // Prepare meta fields
    const title = getMetaField(data, 'meta_title', data.title);
    const description = getMetaField(data, 'meta_description', data.short_description || data.description);
    const keywords = getMetaField(data, 'meta_keyword', undefined);
    const canonical = `https://mikroelectron.com/product/${data.slug}`;
    const image = data.image;
    // Prepare concatenated name and description for JSON-LD
    const productName = (data.meta_title && data.meta_title !== data.title)
        ? `${data.title} | ${data.meta_title}`
        : data.title;
    const productDescription = (data.meta_description && data.meta_description !== data.description)
        ? `${data.description} ${data.meta_description}`
        : data.description;
    // Prepare JSON-LD structured data
    const productJsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productName,
        "description": productDescription,
        "disambiguatingDescription": data.short_description,
        "sku": data.sku,
        "mpn": data.sku, // If you have a separate MPN, use it
        "brand": {
            "@type": "Brand",
            "name": data.brand?.name || "Mikroelectron"
        },
        "category": data.categories?.map(cat => cat.title),
        "keywords": data.meta_keyword,
        "image": (data.gallery && data.gallery.length > 0)
            ? data.gallery.map(img => img.url)
            : [data.image],
        "offers": {
            "@type": "Offer",
            "url": `https://mikroelectron.com/product/${data.slug}`,
            "priceCurrency": "JOD",
            "price": data.sale_price || data.price,
            "priceSpecification": data.sale_price ? {
                "@type": "UnitPriceSpecification",
                "price": data.sale_price,
                "priceCurrency": "JOD"
            } : undefined,
            "availability": (data.availableQty > 0 && data.is_available)
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            "inventoryLevel": {
                "@type": "QuantitativeValue",
                "value": data.availableQty
            }
        },
        "manufacturer": data.source ? {
            "@type": "Organization",
            "name": data.source
        } : undefined,
        "additionalProperty": [
            data.features && {
                "@type": "PropertyValue",
                "name": "Features",
                "value": data.features
            },
            data.packageInclude && {
                "@type": "PropertyValue",
                "name": "Package Include",
                "value": data.packageInclude
            },
            data.documents && {
                "@type": "PropertyValue",
                "name": "Documents",
                "value": data.documents
            }
        ].filter(Boolean)
    };


    return (

        <>
            <SEO
                title={title}
                description={description}
                keywords={keywords}
                canonical={canonical}
                image={image}
                jsonLd={productJsonLd}
            />
            {
                product ?
                    <Modal>
                        <ProductSingleWrapper>
                            <ProductSingleContainer>

                                <ProductDetails product={product || data} deviceType={deviceType}/>
                                <CartPopUp deviceType={deviceType}/>
                            </ProductSingleContainer>
                        </ProductSingleWrapper>
                        <Footer social={social}/>
                    </Modal>
                    : <Loading/>
            }

        </>

    );
};

// export async function getServerSideProps({ params }) {
//     const data = await getProductBySlug(params.slug);
//     return {
//         props: {
//             data,
//         },
//     };
// }

export async function getStaticProps({ params }) {
    const data = await getProductBySlug(params.slug);
    return {
        props: {
            data,
        },
        revalidate: 10, // Revalidate every 10 seconds
    };
}


export async function getStaticPaths() {
    const products = await getAllProducts();
    const paths = products.map(product => ({
        params: { slug: product.slug.toLowerCase() },
    }));

    return {
        paths,
        fallback: 'blocking', // Use blocking mode for SSR
    };
}


export default ProductPage;
