import React, { useState, useEffect } from 'react';
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
import {Box, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox} from "@material-ui/core";

const ErrorMessage = dynamic(() =>
    import('components/error-message/error-message')
);
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
                                                      fetchLimit = 24,
                                                      type,
                                                  }) => {
    const router = useRouter();
    const [countPerPage, setCountPerPage] = useState(fetchLimit);
    const [filter, setFilter] = useState('');
    const [inStock, setInStock] = useState(false);

    // Sync state with query params on mount and when router.query changes
    useEffect(() => {
        if (router.isReady) {
            if (router.query.limit) setCountPerPage(Number(router.query.limit));
            if (router.query.filter) setFilter(router.query.filter as string);
            if (router.query.inStock) setInStock(router.query.inStock === 'true');
        }
    }, [router.isReady, router.query]);

    const { data, error, totalPages, currentPage, loading } = useProducts({
        text: router.query.search as string,
        category: router.query.category as string,
        page: Number(router.query.page) || 1,
        offset: 0,
        limit: countPerPage,
        filter: filter,
        inStock: inStock
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

    const updateQueryParams = (newParams) => {
        const updatedQuery = { ...router.query, ...newParams };
        router.replace(
            {
                pathname: router.pathname,
                query: updatedQuery,
            },
            undefined,
            { shallow: true }
        );
    };

    const handlePaginate = (event, value) => {
        updateQueryParams({ page: value });
    };

    const handleCountChange = (event) => {
        const newLimit = event.target.value;
        setCountPerPage(newLimit);
        updateQueryParams({ limit: newLimit, page: 1 });
    };

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        updateQueryParams({ filter: newFilter, page: 1 });
    };

    const handleInStockChange = (event) => {
        const inStockValue = event.target.checked;
        setInStock(inStockValue);
        updateQueryParams({ inStock: inStockValue, page: 1 });
    };

    return (
        <>
            <Box display="flex" justifyContent="center" m={1} p={1}>
                <FormControl variant="outlined" style={{ minWidth: 120, marginLeft: '1rem' }}>
                    <InputLabel>Count per page</InputLabel>
                    <Select
                        value={countPerPage}
                        onChange={handleCountChange}
                        label="Count per page"
                    >
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                        <MenuItem value={60}>60</MenuItem>
                        <MenuItem value={120}>120</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" style={{ minWidth: 120, marginLeft: '1rem' }}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                        value={filter}
                        onChange={handleFilterChange}
                        label="Filter"
                    >
                        <MenuItem value="sale">Sale</MenuItem>
                        <MenuItem value="new-item">Latest</MenuItem>
                        <MenuItem value="old-item">Oldest</MenuItem>
                        <MenuItem value="price-high">Price (High First)</MenuItem>
                        <MenuItem value="price-low">Price (Low First)</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={inStock}
                            onChange={handleInStockChange}
                            name="inStock"
                            color="primary"
                        />
                    }
                    label="In stock"
                    style={{ marginLeft: '1rem' }}
                />
            </Box>
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
            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        color="primary"
                        onChange={handlePaginate}
                    />
                </Box>
            )}
        </>
    );
};

export default Products;
