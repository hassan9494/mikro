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
    const [inStock, setInStock] = React.useState(false);


    const { data, error, totalPages, currentPage, loading } = useProducts({
        text: router.query.search,
        category: router.query.category,
        page: router.query.page,
        offset: 0,
        limit: countPerPage,
        filter: filter,
        inStock : inStock
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

    const handlePaginate = async (event, value) => {
        const { category, text } = router.query;
        const newProps = {};
        if (category) newProps['category'] = category
        if (text) newProps['text'] = text
        router.push({
            pathname: '/', query: { ...newProps, page: value, limit: countPerPage, filter: filter,inStock: inStock },
        });
    };

    const handleCountChange = (event) => {
        setCountPerPage(event.target.value);
        router.push({
            pathname: '/', query: { ...router.query, limit: event.target.value, page: 1 },
        });
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        router.push({
            pathname: '/', query: { ...router.query, filter: event.target.value, page: 1 },
        });
    };

    const handleInStockChange = (event) => {
        setInStock(event.target.checked);
        router.push({
            pathname: '/',
            query: { ...router.query, inStock: event.target.checked, page: 1 },
        });
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
                        {/*<MenuItem value="">None</MenuItem>*/}
                        {/*<MenuItem value="top-sale">Best Sales</MenuItem>*/}
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
            {
                totalPages > 1 &&
                    <div>

                        <Box display="flex" justifyContent="center" m={1} p={1}>
                            <Pagination count={totalPages} page={currentPage} color="primary" onChange={handlePaginate} />
                        </Box>

                    </div>

            }
        </>
    );
};
export default Products;
