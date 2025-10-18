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
                                        <div dangerouslySetInnerHTML={{__html: displayProduct.documents}} />
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