import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
    ProductsRow,
    ProductsCol,
    ButtonWrapper,
    LoaderWrapper,
    LoaderItem,
    ProductCardWrapper,
} from './product-list.style';
import { CURRENCY } from 'utils/constant';
import Placeholder from 'components/placeholder/placeholder';
import { motion } from 'framer-motion';
import NoResultFound from 'components/no-result/no-result';
import { FormattedMessage } from 'react-intl';
import { Button } from 'components/button/button';
import useProducts from 'data/use-products';
import { Pagination } from '@mui/material';
import { Box } from "@mui/material";

const ErrorMessage = dynamic(() =>
    import('components/error-message/error-message')
);
const GeneralCard = dynamic(
    import('components/product-card/product-card-one/product-card-one')
);

type ProductsProps = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    fetchLimit?: number;
    loadMore?: boolean;
    type?: string;
};
export const Products: React.FC<ProductsProps> = ({
    deviceType,
    fetchLimit = 20,
    loadMore = true,
    type,
}) => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const { data, error, totalPages, currentPage } = useProducts({
        // type,
        text: router.query.text,
        category: router.query.category,
        page: router.query.page,
        offset: 0,
        limit: fetchLimit,
    });

    if (error) return <ErrorMessage message={error.message}/>;
    if (!data) {
        return (
            <LoaderWrapper>
                <LoaderItem>
                    <Placeholder uniqueKey="1"/>
                </LoaderItem>
                <LoaderItem>
                    <Placeholder uniqueKey="2"/>
                </LoaderItem>
                <LoaderItem>
                    <Placeholder uniqueKey="3"/>
                </LoaderItem>
                <LoaderItem>
                    <Placeholder uniqueKey="4"/>
                </LoaderItem>
            </LoaderWrapper>
        );
    }

    if (data.length === 0) {
        return <NoResultFound/>;
    }

    const renderCard = (productType, props) => (
        <GeneralCard
            title={props.title}
            description={props.description}
            image={props.image}
            weight={props.unit}
            currency={CURRENCY}
            price={props.price}
            salePrice={props.sale_price}
            discountInPercent={props.discountInPercent}
            data={props}
            deviceType={deviceType}
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
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                style={{ height: '100%' }}
                            >
                                {renderCard(type, item)}
                            </motion.div>
                        </ProductCardWrapper>
                    </ProductsCol>
                ))}
            </ProductsRow>
            <Box display="flex" justifyContent="center">
                <Pagination count={totalPages} page={currentPage} color="primary" onChange={handlePaginate} />
            </Box>
            {/*{loadMore && hasMore && <LoadMore/>}*/}
        </>
    );
};
export default Products;
