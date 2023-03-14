import React from 'react';
import { ProductCard } from 'components/product-card/product-card-six';
import styled from 'styled-components';
import css from '@styled-system/css';
import ErrorMessage from 'components/error-message/error-message';
import { useRouter } from 'next/router';
import useProducts from 'data/use-products';
import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const Grid = styled.div(
    css({
        display: 'grid',
        gridGap: '10px',
        gridTemplateColumns: 'repeat(1, minmax(180px, 1fr))',

        '@media screen and (min-width: 480px)': {
            gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))',
        },

        '@media screen and (min-width: 740px)': {
            gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
        },

        '@media screen and (min-width: 991px)': {
            gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))',
        },

        '@media screen and (min-width: 1200px)': {
            gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))',
        },

        '@media screen and (min-width: 1400px)': {
            gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))',
        },

        '@media screen and (min-width: 1700px)': {
            gridTemplateColumns: 'repeat(5, minmax(180px, 1fr))',
        },
    })
);

interface Props {
    type: string;
    loadMore?: boolean;
    fetchLimit?: number;
    style?: any;
}

export const ProductGrid = ({
    style,
    fetchLimit = 16,
}: Props) => {

    const router = useRouter();

    const { data, error, totalPages, currentPage } = useProducts({
        text: router.query.text,
        category: router.query.category,
        page: router.query.page,
        offset: 0,
        limit: fetchLimit,
    });

    if (error) return <ErrorMessage message={error.message}/>;
    if (!data) return null;

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
        <section>
            <Grid style={style}>
                {data.map((product, idx) => (
                    <ProductCard data={product} key={product.id}/>
                ))}
            </Grid>
            <Box display="flex" justifyContent="center" marginTop={2} p={1}>
                <Pagination count={totalPages} page={currentPage} color="primary" onChange={handlePaginate} />
            </Box>
        </section>
    );
};
