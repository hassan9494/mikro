import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
    ProductsRow,
    ProductsCol,
    LoaderWrapper,
    LoaderItem,
    ProductCardWrapper,
} from './product-list.style';
import { CURRENCY } from 'utils/constant';
import Placeholder from 'components/placeholder/placeholder';
import Fade from 'react-reveal/Fade';
import NoResultFound from 'components/no-result/no-result';
import useProducts from 'data/use-products';
import { Pagination } from "@material-ui/lab";
import { Box } from "@material-ui/core";

const ErrorMessage = dynamic(() =>
    import('components/error-message/error-message')
);
// const GeneralCard = dynamic(
//     import('components/product-card/product-card-six/product-card-six')
// );
import { ProductCard } from 'components/product-card/product-card-six';

type ProductsProps = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    fetchLimit?: number;
    type?: string;
};
export const Products: React.FC<ProductsProps> = ({
    deviceType,
    fetchLimit = 20,
    type,
}) => {

    const router = useRouter();

    const { data, error, totalPages, currentPage, loading } = useProducts({
        text: router.query.search,
        category: router.query.category,
        page: router.query.page,
        offset: 0,
        limit: fetchLimit,
    });

    if (error) return <ErrorMessage message={error.message}/>;

    if (loading) {
        return (
            <LoaderWrapper>
                <LoaderItem>
                    <Placeholder uniqueKey="1"/>
                </LoaderItem>
                <LoaderItem>
                    <Placeholder uniqueKey="2"/>
                </LoaderItem>
                {/*<LoaderItem>*/}
                {/*    <Placeholder uniqueKey="3"/>*/}
                {/*</LoaderItem>*/}
                {/*<LoaderItem>*/}
                {/*    <Placeholder uniqueKey="4"/>*/}
                {/*</LoaderItem>*/}
            </LoaderWrapper>
        );
    }

    if (data.length === 0) {
        return <NoResultFound/>;
    }

    const renderCard = (productType, props) => (
        <ProductCard
            data={props}
        />
    );


    const handlePaginate = async (event, value) => {
        const { category, text } = router.query;
        const newProps = {};
        if (category) newProps['category'] = category
        if (text) newProps['text'] = text
        router.push({
            pathname: '/', query: { ...newProps, page: value },
        });
    };

    return (
        <>
            <ProductsRow>
                {data.map((item: any, index: number) => (
                    <ProductsCol
                        key={index}
                        style={type === 'book' ? { paddingLeft: 0, paddingRight: 1 } : {}}
                    >
                        <ProductCardWrapper>
                            <Fade
                                duration={800}
                                delay={index * 10}
                                style={{ height: '100%' }}
                            >
                                {renderCard(type, item)}
                            </Fade>
                        </ProductCardWrapper>
                    </ProductsCol>
                ))}
            </ProductsRow>
            {
                totalPages > 1 &&
                <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Pagination count={totalPages} page={currentPage} color="primary" onChange={handlePaginate} />
                </Box>
            }
        </>
    );
};
export default Products;
