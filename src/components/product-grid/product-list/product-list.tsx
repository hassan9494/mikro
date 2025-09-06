import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  ProductsRow,
  ProductsCol,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
  FilterContainer,
  FilterGroup,
  FilterItem,
  FilterLabel,
  FilterSelect,
  CheckboxLabel,
  MobileFilterWrapper,
  MobileFilterSection,
} from './product-list.style';
import Placeholder from 'components/placeholder/placeholder';
import Fade from 'react-reveal/Fade';
import NoResultFound from 'components/no-result/no-result';
import useProducts from 'data/use-products';
import { Pagination } from "@material-ui/lab";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Divider,
  IconButton,
  Chip
} from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TuneIcon from '@material-ui/icons/Tune';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

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
                                                    fetchLimit = 24,
                                                    type,
                                                  }) => {
  const router = useRouter();
  const [countPerPage, setCountPerPage] = useState(fetchLimit);
  const [filter, setFilter] = useState('');
  const [inStock, setInStock] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isHomePage = router.pathname === '/';

  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) {
    return (
        <LoaderWrapper>
          <LoaderItem><Placeholder uniqueKey="1" /></LoaderItem>
          <LoaderItem><Placeholder uniqueKey="2" /></LoaderItem>
        </LoaderWrapper>
    );
  }
  if (data.length === 0) return <NoResultFound />;

  const renderCard = (productType, props) => <ProductCard data={props} />;

  const updateQueryParams = (newParams) => {
    const updatedQuery = { ...router.query, ...newParams };
    router.replace({ pathname: router.pathname, query: updatedQuery }, undefined, { shallow: true });
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

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const applyFilters = () => {
    setExpanded(false);
  };

  function clearFilters() {
    setFilter('');
    setInStock(false);
    setCountPerPage(fetchLimit);
    updateQueryParams({ filter: '', inStock: false, limit: fetchLimit, page: 1 });
  }

  const getFilterText = (value) => {
    switch(value) {
      case 'sale': return 'Sale';
      case 'new-item': return 'Latest';
      case 'old-item': return 'Oldest';
      case 'price-high': return 'Price: High to Low';
      case 'price-low': return 'Price: Low to High';
      default: return 'Default';
    }
  };

  return (
      <>
        {isMobileOrTablet ? (
            <MobileFilterWrapper>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" style={{ fontWeight: 600, color: '#333' }}>
                  Filters
                </Typography>
                {(filter || inStock || countPerPage !== fetchLimit) && (
                    <Button
                        onClick={clearFilters}
                        size="small"
                        style={{ color: '#666', textTransform: 'none' }}
                        startIcon={<CloseIcon style={{ fontSize: 16 }} />}
                    >
                      Clear all
                    </Button>
                )}
              </Box>

              <Accordion
                  expanded={expanded}
                  onChange={handleAccordionChange}
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    marginBottom: '16px'
                  }}
              >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="filter-content"
                    id="filter-header"
                    style={{
                      backgroundColor: expanded ? '#f8f9fa' : '#fff',
                      minHeight: '56px',
                      borderRadius: expanded ? '12px 12px 0 0' : '12px'
                    }}
                >
                  <Box display="flex" alignItems="center" justifyContent="center" width="100%" >
                    <TuneIcon  style={{ marginRight: '16px', color: '#133695', fontSize: 20 }} />
                    <Box flexGrow={1}>
                      <Typography variant="subtitle1" style={{  fontWeight: 600, fontSize: '1.25rem'}}>
                        Filter & Sort
                      </Typography>
                      <Box display="flex" flexWrap="wrap" mt={0.5}>
                        {filter && (
                            <Chip
                                label={`Sort: ${getFilterText(filter)}`}
                                size="small"
                                style={{ marginRight: 6, marginBottom: 4, backgroundColor: '#5567ff', color: 'white' }}
                            />
                        )}
                        {inStock && (
                            <Chip
                                label="In stock"
                                size="small"
                                style={{ marginRight: 6, marginBottom: 4, backgroundColor: '#4caf50', color: 'white' }}
                            />
                        )}
                        {countPerPage !== fetchLimit && (
                            <Chip
                                label={`Show: ${countPerPage}`}
                                size="small"
                                style={{ marginRight: 6, marginBottom: 4, backgroundColor: '#ff9800', color: 'white' }}
                            />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails style={{ padding: '16px', flexDirection: 'column' }}>
                  <MobileFilterSection
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '16px',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}
                  >
                    <Box flex="1 1 auto" minWidth="150px" maxWidth="100%" mb={2}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel
                            id="sort-by-label"
                            style={{ backgroundColor: '#fff', padding: '0 4px' }}
                            shrink={true}
                        >
                          Sort options
                        </InputLabel>
                        <Select
                            value={filter}
                            onChange={handleFilterChange}
                            label="Sort options"
                            labelId="sort-by-label"
                            style={{ borderRadius: '8px' }}
                            displayEmpty
                        >
                          <MenuItem value="">Default</MenuItem>
                          <MenuItem value="sale">Sale</MenuItem>
                          <MenuItem value="new-item">Latest</MenuItem>
                          <MenuItem value="old-item">Oldest</MenuItem>
                          <MenuItem value="price-high">Price (High First)</MenuItem>
                          <MenuItem value="price-low">Price (Low First)</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box flex="1 1 auto" minWidth="150px" maxWidth="100%" mb={2}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel style={{ backgroundColor: '#fff', padding: '0 4px' }}>Items per page</InputLabel>
                        <Select
                            value={countPerPage}
                            onChange={handleCountChange}
                            label="Items per page"
                            style={{ borderRadius: '8px' }}
                        >
                          <MenuItem value={12}>12</MenuItem>
                          <MenuItem value={24}>24</MenuItem>
                          <MenuItem value={60}>60</MenuItem>
                          <MenuItem value={120}>120</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box
                        flex="1 1 auto"
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        minWidth="150px"
                        maxWidth="100%"
                        mb={2}
                    >
                      <FormControlLabel
                          control={
                            <Checkbox
                                checked={inStock}
                                onChange={handleInStockChange}
                                name="inStock"
                                color="primary"
                                icon={
                                  // Empty square when not checked
                                  <span
                                      style={{
                                        display: 'inline-block',
                                        width: 18,
                                        height: 18,
                                        border: '2px solid #ccc',
                                        borderRadius: 4,
                                        background: '#fff',
                                      }}
                                  />
                                }
                                checkedIcon={
                                  // Filled square with check when checked, check centered
                                  <span
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 18,
                                        height: 18,
                                        border: '2px solid #4caf50',
                                        borderRadius: 4,
                                        background: '#4caf50',
                                        color: '#fff',
                                        position: 'relative',
                                      }}
                                  >
                      <CheckIcon style={{ fontSize: 16 }} />
                      </span>
                                }
                                style={{
                                  marginRight: '8px',
                                  padding: 4
                                }}
                            />
                          }
                          label={
                            <Typography variant="body1" style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                              In stock only
                            </Typography>
                          }
                          style={{ width: '100%', marginLeft: 0, alignItems: 'center' }}
                      />
                    </Box>
                  </MobileFilterSection>

                  <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={applyFilters}
                      style={{
                        marginTop: '16px',
                        padding: '12px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        backgroundColor: '#133695',
                        fontSize: '1rem',
                        boxShadow: '0 4px 12px rgba(85, 103, 255, 0.3)'
                      }}
                  >
                    Apply Filters
                  </Button>
                </AccordionDetails>
              </Accordion>
            </MobileFilterWrapper>
        ) : (
            <FilterContainer isHomePage={isHomePage}>
              <FilterGroup style={{ marginLeft: '20px' }}>
                <FilterItem>
                  <FilterLabel>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M3 7H21" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M6 12H18" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M10 17H14" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Sort By:
                  </FilterLabel>
                  <FormControl variant="outlined" style={{ minWidth: 120 }}>
                    <Select
                        value={filter}
                        onChange={handleFilterChange}
                        displayEmpty
                    >
                      <MenuItem value="">
                        <em>Default</em>
                      </MenuItem>
                      <MenuItem value="sale">Sale</MenuItem>
                      <MenuItem value="new-item">Latest</MenuItem>
                      <MenuItem value="old-item">Oldest</MenuItem>
                      <MenuItem value="price-high">Price (High First)</MenuItem>
                      <MenuItem value="price-low">Price (Low First)</MenuItem>
                    </Select>
                  </FormControl>
                </FilterItem>

                <FilterItem>
                  <CheckboxLabel checked={inStock}>
                    <input
                        type="checkbox"
                        checked={inStock}
                        onChange={handleInStockChange}
                    />
                    In stock only
                  </CheckboxLabel>
                </FilterItem>
              </FilterGroup>

              <FilterGroup>
                <FilterItem style={{ marginRight: '90px' }}>
                  <FilterLabel>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M8 6H21" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M8 12H21" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M8 18H21" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3 6H3.01" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3 12H3.01" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3 18H3.01" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Items per page:
                  </FilterLabel>
                  <FormControl variant="outlined" style={{ minWidth: 120 }}>
                    <Select
                        value={countPerPage}
                        onChange={handleCountChange}
                    >
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={24}>24</MenuItem>
                      <MenuItem value={60}>60</MenuItem>
                      <MenuItem value={120}>120</MenuItem>
                    </Select>
                  </FormControl>
                </FilterItem>
              </FilterGroup>
            </FilterContainer>
        )}

        <ProductsRow>
          {data.map((item: any, index: number) => (
              <ProductsCol key={index} style={type === 'book' ? { paddingLeft: 0, paddingRight: 1 } : {}}>
                <ProductCardWrapper>
                  <Fade duration={800} delay={index * 10} style={{ height: '100%' }}>
                    {renderCard(type, item)}
                  </Fade>
                </ProductCardWrapper>
              </ProductsCol>
          ))}
        </ProductsRow>

        {totalPages > 1 && (
            <Box display="flex" justifyContent="center" m={0} p={0}>
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
