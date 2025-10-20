import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {
    ProductDetailsWrapper,
    ProductPreview,
    ProductInfo,
    ProductTitlePriceWrapper,
    ProductTitle,
    BackButton,
    ProductWeight,
    ProductDescription,
    ProductMeta,
    ProductCartWrapper,
    ProductPriceWrapper,
    ProductPrice,
    SalePrice,
    MetaSingle,
    RelatedItems,
    ReplacementWrapper,
    VariantSelector,
    VariantChip,
    VariantImage,
    SelectedVariantIndicator,
    OutOfStockOverlay
} from './product-details-one.style';
import CarouselWithCustomDots from 'components/multi-carousel/multi-carousel';
import {FormattedMessage} from 'react-intl';
import {useLocale} from 'contexts/language/language.provider';
import RelatedProducts from "../../product-grid/related-list/related-list";
import {Box, Button, Chip, Tab, Tabs, Typography} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import MoneyFormat from "../../money-format/money-format";
import {AddToCart} from "./add-to-cart";
import {ProductCardWrapper, ProductsCol, ProductsRow} from "../../product-grid/related-list/related-list.style";
import Fade from "react-reveal/Fade";
import {ProductCard} from "../../product-card/product-card-six";
import {ReplacementProductCard} from "../../product-card/replacement_product_card";
import useUser from "data/use-user";
import LogoImage from 'assets/images/default/default.png';
import { useCart } from 'contexts/cart/use-cart';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

// Add tooltip styles
const useStyles = makeStyles((theme) => ({
    tooltip: {
        backgroundColor: '#133595',
        color: '#fff',
        boxShadow: theme.shadows[3],
        fontSize: 14,
        maxWidth: 300,
        padding: '12px',
        borderRadius: '6px'
    },
    arrow: {
        color: '#133595',
    },
}));

type ProductDetailsProps = {
    product: any;
    deviceType: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function tabProps(index: any) {
    return {
        id: `product-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ProductCategories({categories = []}) {
    return (
        <ProductMeta>
            <MetaSingle>
                {categories.map((item: any) => (
                    <Box m={0.3} key={item.id}>
                        <Link
                            href={`/?category=${item.slug}`}
                            key={`link-${item.id}`}
                        >
                            <a>
                                <Chip
                                    label={item.title}
                                    onClick={() => {
                                    }}
                                    variant="outlined"
                                    color={"secondary"}
                                />
                            </a>
                        </Link>
                    </Box>
                ))}
            </MetaSingle>
        </ProductMeta>
    )
}

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({
                                                                          product,
                                                                          deviceType,
                                                                      }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const { addItem } = useCart();
    const {isRtl} = useLocale();
    const data = product;
    const url = process.env.NEXT_PUBLIC_REST_ADMIN_ENDPOINT;
    const {user} = useUser();
    const allowedRoles = ['super', 'admin', 'Manager', 'Product Manager', 'Cashier', 'Distributer', 'Admin cash'];
    const adminRoles = ['super', 'admin', 'Manager', 'Product Manager', 'Admin cash'];
    const hasAccess = user?.roles?.some(role => allowedRoles.includes(role.name));
    const hasAdminAccess = user?.roles?.some(role => adminRoles.includes(role.name));

    // useEffect(() => {
    //     if (product?.hasVariants && product?.colors?.length) {
    //         // Select the first available variant, or the first one if none are available
    //         const availableVariant = product.colors.find(v => v.availableQty > 0) || product.colors[0];
    //         setSelectedVariant(availableVariant);
    //     }
    //     setTimeout(() => {
    //         window.scrollTo(0, 0);
    //     }, 500);
    // }, [product]);

    const handleVariantChange = (variant) => {
        // Allow selection even if out of stock, but show a message
        setSelectedVariant(variant);

        if (variant.availableQty === 0) {
            // You could show a toast notification here if desired
            console.log("This variant is out of stock");
        }
    };

    const handleAddToCart = () => {
        if (product.hasVariants && !selectedVariant) return;
        if (selectedVariant && selectedVariant.availableQty === 0) {
            // Show message that item is out of stock
            console.log("Cannot add out of stock item to cart");
            return;
        }

        const item = {
            ...product,
            ...(selectedVariant || {}),
            baseProductId: product.id,
            variantId: selectedVariant?.id || null,
            id: product.id,
            baseTitle: product.title,
            title: selectedVariant
                ? `${product.title} - ${selectedVariant.title}`
                : product.title,
        };

        console.log("Adding to cart:", item);
        addItem(item, 1);
    };

    const renderReplacementCard = (props) => (
        <ReplacementProductCard data={props} key={props.id}/>
    );

    // Create display product with variant data
    const displayProduct = selectedVariant
        ? { ...product, ...selectedVariant }
        : product;

    // Get variant image or default to first product image
    const getVariantImage = (variant) => {
        if (variant?.gallery?.length > 0) {
            return variant.gallery[0].url;
        }
        if (product?.gallery?.length > 0) {
            return product.gallery[0].url;
        }
        return LogoImage;
    };

    return (
        <>
            {data.deleted_at == null ? (
                data.is_available ? (
                    <div>
                        <ProductDetailsWrapper className="product-card" dir="ltr">
                            <ProductPreview>
                                <BackButton>
                                    <Button
                                        variant="contained"
                                        onClick={Router.back}
                                        disableElevation
                                        startIcon={<ArrowBack/>}
                                    >
                                        <FormattedMessage id="backBtn" defaultMessage="Back"/>
                                    </Button>
                                </BackButton>
                                <CarouselWithCustomDots
                                    items={selectedVariant?.gallery?.length > 0
                                        ? selectedVariant.gallery
                                        : product.gallery.length > 0
                                            ? product.gallery
                                            : [{
                                                'url': LogoImage,
                                                'id': 1,
                                                'name': 'default',
                                                'size': 56430
                                            }]
                                    }
                                    deviceType={deviceType}
                                />
                            </ProductPreview>

                            <ProductInfo>
                                <ProductTitlePriceWrapper>
                                    <ProductTitle>{product.title}</ProductTitle>
                                    {selectedVariant && (
                                        <Typography variant="h6" style={{ color: '#666', marginTop: '2px' }}>
                                           ({selectedVariant.title})
                                        </Typography>
                                    )}
                                </ProductTitlePriceWrapper>


                                {!data.is_retired ? (
                                    <div>
                                        <ProductPriceWrapper>
                                            <ProductPrice>
                                                <MoneyFormat
                                                    value={displayProduct.sale_price ? displayProduct.sale_price : displayProduct.price}
                                                />
                                                {displayProduct.sale_price ? (
                                                    <SalePrice>
                                                        <MoneyFormat value={displayProduct.price} />
                                                    </SalePrice>
                                                ) : null}
                                            </ProductPrice>
                                        </ProductPriceWrapper>

                                        <ProductCartWrapper>
                                            {displayProduct.availableQty ? (
                                                <AddToCart data={product} variant={selectedVariant} />
                                            ) : (
                                                <FormattedMessage id='outOfStock' defaultMessage='Out Of Stock' />
                                            )}
                                        </ProductCartWrapper>

                                        {hasAccess && (
                                            <div className={'mt-1'} style={{ marginTop: 5 }}>
                                                <Typography component="span" variant="body1" color="textPrimary"
                                                            style={{ marginRight: 50 }}>
                                                    Quantity: {displayProduct.availableQty}
                                                </Typography>
                                                <Typography component="span" variant="body1" color="textPrimary">
                                                    Location: {displayProduct.location} / {displayProduct.stock_location ?? '----'}
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <ReplacementWrapper>
                                        <span style={{color:'red'}}>
                                            <FormattedMessage id='retired'
                                                              defaultMessage="This product is retired now ,the replacement is :"/>
                                        </span>

                                        <ProductCardWrapper>
                                            <Fade
                                                duration={800}
                                                delay={10}
                                                style={{ height: '100%' }}
                                            >
                                                {product.replacement_item ?
                                                    renderReplacementCard(product.replacement_item) :
                                                    <FormattedMessage id='retired'
                                                                      defaultMessage="There is no replacement item"/>
                                                }
                                            </Fade>
                                        </ProductCardWrapper>
                                    </ReplacementWrapper>
                                )}

                                {/* Variant Selector - Only show if product has variants */}
                                {product.hasVariants && product.colors && product.colors.length > 0 ? (
                                    <VariantSelector>
                                        <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', marginBottom: '15px' }}>
                                            <FormattedMessage id="selectVariant" defaultMessage="Select Option" />
                                        </Typography>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                            {product.colors.map((variant) => {
                                                const isOutOfStock = variant.availableQty === 0;
                                                const isSelected = selectedVariant?.id === variant.id;

                                                return (

                                                    <VariantChip
                                                        data-selected={isSelected}
                                                        data-outofstock={isOutOfStock}
                                                        onClick={() => handleVariantChange(variant)}
                                                        style={{
                                                            opacity: isOutOfStock ? 0.7 : 1,
                                                            position: 'relative'
                                                        }}
                                                    >
                                                        <VariantImage
                                                            src={getVariantImage(variant)}
                                                            alt={variant.title}
                                                            style={{ opacity: isOutOfStock ? 0.5 : 1 }}
                                                        />
                                                        <span>{variant.title}</span>
                                                        {isSelected && (
                                                            <SelectedVariantIndicator>
                                                                ✓
                                                            </SelectedVariantIndicator>
                                                        )}
                                                        {isOutOfStock && (
                                                            <OutOfStockOverlay>
                                                                Out of Stock
                                                            </OutOfStockOverlay>
                                                        )}
                                                    </VariantChip>

                                                );
                                            })}
                                        </div>
                                    </VariantSelector>
                                ) : null}

                                <ProductWeight>{displayProduct.unit}</ProductWeight>

                                <ProductDescription>
                                    {/* English Description */}
                                    {displayProduct.short_description && (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: displayProduct.short_description }}
                                            style={{
                                                marginBottom: displayProduct.short_description_ar ? '28px' : '0',
                                                lineHeight: '1.7',
                                                fontSize: '15px',
                                                color: '#444',
                                                fontFeatureSettings: '"liga", "kern"'
                                            }}
                                        />
                                    )}

                                    {/* Arabic Description */}
                                    {displayProduct.short_description_ar && (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: displayProduct.short_description_ar }}
                                            style={{
                                                direction: 'rtl',
                                                textAlign: 'right',
                                                fontFamily: "'Tajawal', 'Noto Sans Arabic', sans-serif",
                                                lineHeight: '1.9',
                                                fontSize: '16px',
                                                color: '#444',
                                                letterSpacing: '-0.2px',
                                                fontFeatureSettings: '"ss01", "salt"'
                                            }}
                                        />
                                    )}

                                    {/* Fallback Description */}
                                    {!displayProduct.short_description && !displayProduct.short_description_ar && displayProduct.description && (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: displayProduct.description }}
                                            style={{
                                                lineHeight: '1.7',
                                                fontSize: '15px',
                                                color: '#444',
                                                fontFeatureSettings: '"liga", "kern"'
                                            }}
                                        />
                                    )}
                                </ProductDescription>

                                <ProductCategories categories={displayProduct?.categories}/>
                                {hasAdminAccess && (
                                    <div>
                                        <a href={`${url}/product/edit/${product?.id}`} target='_blank' rel="noreferrer">
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                disableElevation
                                                style={{borderRadius: 5, marginTop: 5}}
                                            >
                                                Edit
                                            </Button>
                                        </a>
                                    </div>
                                )}
                            </ProductInfo>

                            <div style={{flexGrow: 1}}>
                                <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} aria-label="product tabs">
                                    <Tab label="Details" {...tabProps(0)} />
                                    <Tab label="Features" {...tabProps(1)} />
                                    <Tab label="Documents" {...tabProps(2)} />
                                    <Tab label="Product Include" {...tabProps(3)} />
                                </Tabs>
                                <Box p={1}>
                                    <TabPanel value={value} index={0}>
                                        <div dangerouslySetInnerHTML={{__html: displayProduct.description}} />
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <div dangerouslySetInnerHTML={{__html: displayProduct.features}} />
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        {product.documents && (
                                            <Typography variant="h6" gutterBottom style={{ fontWeight: 600, marginBottom: '16px' }}>
                                                <FormattedMessage id="datasheets" defaultMessage="Documents" />
                                            </Typography>
                                        )}


                                        {/* Existing documents content */}
                                        {product.documents && (
                                            <div
                                                style={{
                                                    marginBottom: product.datasheets?.length > 0 ? '24px' : '0',
                                                    padding: '16px',
                                                    backgroundColor: '#f8f9fa',
                                                    borderRadius: '8px',
                                                    border: '1px solid #e9ecef'
                                                }}
                                                dangerouslySetInnerHTML={{ __html: product.documents }}
                                            />
                                        )}

                                        {/* Datasheets section */}
                                        {product.datasheets && product.datasheets.length > 0 && (
                                            <div style={{ marginTop: product.documents ? '24px' : '0' }}>
                                                <Typography variant="h6" gutterBottom style={{ fontWeight: 600, marginBottom: '16px' }}>
                                                    <FormattedMessage id="datasheets" defaultMessage="Datasheets & Files" />
                                                </Typography>

                                                <div style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                                    gap: '16px',
                                                    alignItems: 'stretch'
                                                }}>
                                                    {product.datasheets.map((datasheet: any, index: number) => (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                height: '60px',
                                                                padding: '8px 12px',
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: '6px',
                                                                backgroundColor: '#fff',
                                                                transition: 'all 0.2s ease',
                                                                cursor: 'pointer',
                                                                textDecoration: 'none',
                                                                color: 'inherit',
                                                                boxSizing: 'border-box'
                                                            }}
                                                            onClick={() => window.open(datasheet.value, '_blank')}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                                                                e.currentTarget.style.borderColor = '#0070f3';
                                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 112, 243, 0.15)';
                                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = '#fff';
                                                                e.currentTarget.style.borderColor = '#e0e0e0';
                                                                e.currentTarget.style.boxShadow = 'none';
                                                                e.currentTarget.style.transform = 'translateY(0)';
                                                            }}
                                                        >
                                                            {/* Download Icon */}
                                                            <div style={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                marginRight: '12px',
                                                                color: '#0070f3'
                                                            }}>
                                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                                                </svg>
                                                            </div>

                                                            {/* File Name */}
                                                            <div style={{ textAlign: 'center'  }}>
                                                                <Typography
                                                                    variant="subtitle1"
                                                                    style={{
                                                                        fontWeight: 500,
                                                                        wordBreak: 'break-word',
                                                                        display: '-webkit-box',
                                                                        WebkitLineClamp: 2,
                                                                        WebkitBoxOrient: 'vertical',
                                                                        overflow: 'hidden',
                                                                        lineHeight: '1.4'
                                                                    }}
                                                                >
                                                                    {datasheet.name}
                                                                </Typography>

                                                            </div>


                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Fallback message if no documents or datasheets */}
                                        {!product.documents && (!product.datasheets || product.datasheets.length === 0) && (
                                            <div style={{
                                                textAlign: 'center',
                                                padding: '40px 20px',
                                                border: '1px dashed #e0e0e0',
                                                borderRadius: '8px',
                                                backgroundColor: '#fafafa'
                                            }}>
                                                <Typography variant="body2" color="textSecondary" style={{ fontStyle: 'italic' }}>
                                                    <FormattedMessage id="noDocuments" defaultMessage="No documents or datasheets available for this product." />
                                                </Typography>
                                            </div>
                                        )}
                                    </TabPanel>

                                    <TabPanel value={value} index={3}>
                                        <div dangerouslySetInnerHTML={{__html: displayProduct.packageInclude}} />
                                    </TabPanel>
                                </Box>
                            </div>

                            {isRtl && (
                                <ProductPreview>
                                    <BackButton>
                                        <Button
                                            variant="outlined"
                                            onClick={Router.back}
                                            startIcon={<ArrowBack/>}
                                        >
                                            <FormattedMessage id="backBtn" defaultMessage="Back"/>
                                        </Button>
                                    </BackButton>
                                    <CarouselWithCustomDots
                                        items={selectedVariant?.gallery?.length > 0
                                            ? selectedVariant.gallery
                                            : product.gallery.length > 0
                                                ? product.gallery
                                                : [{
                                                    'url': LogoImage,
                                                    'id': 1,
                                                    'name': 'default',
                                                    'size': 56430
                                                }]
                                        }
                                        deviceType={deviceType}
                                    />
                                </ProductPreview>
                            )}
                        </ProductDetailsWrapper>

                        <RelatedItems>
                            <RelatedProducts
                                slug={displayProduct?.color_id ?? data?.id}
                                deviceType={deviceType}
                            />
                        </RelatedItems>
                    </div>
                ) : (
                    <ProductDetailsWrapper className="product-card" dir="ltr">
                        <ProductPreview>
                            <ProductTitle>
                                <FormattedMessage id="productNotAvailable" defaultMessage="This product is not available" />
                            </ProductTitle>
                        </ProductPreview>
                    </ProductDetailsWrapper>
                )
            ) : (
                <ProductDetailsWrapper className="product-card" dir="ltr">
                    <ProductPreview>
                        <ProductTitle>
                            <FormattedMessage id="productNotAvailable" defaultMessage="This product is not available" />
                        </ProductTitle>
                    </ProductPreview>
                </ProductDetailsWrapper>
            )}
        </>
    );
};

export default ProductDetails;