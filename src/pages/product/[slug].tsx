import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { SEO } from 'components/seo';
import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper, {
    ProductSingleContainer,
} from 'assets/styles/product-single.style';
import { getAllProducts, getProductBySlug } from 'utils/api/product';
import {Backdrop, CircularProgress} from "@material-ui/core";
import { useProduct } from "data/use-products";

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
};


function Loading() {
    return (
        <Backdrop open={true} >
            <CircularProgress />
        </Backdrop>
    );
}

const ProductPage: NextPage<Props> = ({ data, deviceType }) => {

    const router = useRouter();

    if (router.isFallback || !data?.slug) return <Loading />;

    const { data: product } = useProduct(data?.slug);

    return (

        <>
            <SEO
                title={`${data.title}`}
                description={`${data.title} Details`}
            />
            {
                product ?
                    <Modal>
                        <ProductSingleWrapper>
                            <ProductSingleContainer>
                                <ProductDetails product={product ||data} deviceType={deviceType}/>
                                <CartPopUp deviceType={deviceType}/>
                            </ProductSingleContainer>
                        </ProductSingleWrapper>
                    </Modal>
                    : <Loading />
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
  };
}
export async function getStaticPaths() {
  // const products = await getAllProducts();
  return {
    paths: [],
    fallback: true,
  };
}
export default ProductPage;
