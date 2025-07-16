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
    RelatedItems, ReplacementWrapper,
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
import {Minus} from "../../../assets/icons/PlusMinus";
import LogoImage from 'assets/images/default/default.png';

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

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    const url = process.env.NEXT_PUBLIC_REST_ADMIN_ENDPOINT;

    const {isRtl} = useLocale();
    const data = product;

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 500);
    }, []);

    const renderCard = (props) => (
        <ProductCard data={props} key={props.id}/>
    );

    const renderReplacementCard = (props) => (
        <ReplacementProductCard data={props} key={props.id}/>
    );

    const [colorIndex, setColorIndex] = useState([0])
    const {user} = useUser();
    const allowedRoles = ['super', 'admin', 'Manager', 'Product Manager', 'Cashier', 'Distributer', 'Admin cash'];
    const adminRoles = ['super', 'admin', 'Manager', 'Product Manager', 'Admin cash'];

    // Check if user has any of the allowed roles
    const hasAccess = user?.roles?.some(role => allowedRoles.includes(role.name));
    const hasAdminAccess = user?.roles?.some(role => allowedRoles.includes(role.name));
    // console.log(data.deleted_at == null)
    return (
        <>
            {
                data.deleted_at == null ?
                    data.is_available ?
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
                                        items={product.gallery.length > 0 ? product.gallery : [{
                                            'url': LogoImage,
                                            'id': 1,
                                            'name': 'default',
                                            'size': 56430
                                        }]}
                                        deviceType={deviceType}
                                    />

                                </ProductPreview>

                                <ProductInfo>

                                    <ProductTitlePriceWrapper>
                                        <ProductTitle>{product.title}</ProductTitle>
                                    </ProductTitlePriceWrapper>


                                    {
                                        !data.is_retired ?
                                            <div>
                                                <ProductPriceWrapper>

                                                    <ProductPrice>
                                                        <MoneyFormat
                                                            value={product.sale_price ? product.sale_price : product.price}/>
                                                        {
                                                            product.sale_price ? (
                                                                <SalePrice>
                                                                    <MoneyFormat value={product.price}/>
                                                                </SalePrice>
                                                            ) : null
                                                        }
                                                    </ProductPrice>


                                                </ProductPriceWrapper>

                                                <ProductCartWrapper>
                                                    {
                                                        data.availableQty ?
                                                            <AddToCart data={data}/> :
                                                            <FormattedMessage id='outOfStock'
                                                                              defaultMessage='Out Of Stock'/>
                                                    }
                                                </ProductCartWrapper>
                                                {hasAccess && (
                                                    <div className={'mt-1'} style={{marginTop: 5}}>
                                                        <Typography component="span" variant="body1" color="textPrimary"
                                                                    style={{marginRight: 50}}>
                                                            Quantity: {data.availableQty}
                                                        </Typography>
                                                        <Typography component="span" variant="body1"
                                                                    color="textPrimary">
                                                            Location: {data.location} / {data.stock_location ?? '----'}
                                                        </Typography>
                                                    </div>
                                                )}

                                            </div>
                                            :
                                            <ReplacementWrapper>
                                                <FormattedMessage id='retired'
                                                                  defaultMessage="This product is retired now ,the replacement is :"/>
                                                <ProductCardWrapper>
                                                    <Fade
                                                        duration={800}
                                                        delay={10}
                                                        style={{height: '100%'}}
                                                    >
                                                        {product.replacement_item ?
                                                            renderReplacementCard(product.replacement_item) :
                                                            <FormattedMessage id='retired'
                                                                              defaultMessage="There is no replacement item"/>
                                                        }
                                                    </Fade>
                                                </ProductCardWrapper>
                                            </ReplacementWrapper>


                                    }


                                    <ProductWeight>{product.unit}</ProductWeight>


                                    {/*<ProductDescription>*/}
                                    {/*    {*/}
                                    {/*        product.short_description ?*/}
                                    {/*            product.short_description :*/}
                                    {/*            <p>*/}
                                    {/*                <div dangerouslySetInnerHTML={{__html: product.description}}/>*/}
                                    {/*            </p>*/}
                                    {/*    }*/}
                                    {/*</ProductDescription>*/}
                                    <ProductDescription>
                                        {/* English Description - No Label */}
                                        {product.short_description && (
                                            <div
                                                className="product-description-english"
                                                dangerouslySetInnerHTML={{ __html: product.short_description }}
                                                style={{
                                                    marginBottom: product.short_description_ar ? '28px' : '0',
                                                    lineHeight: '1.7',
                                                    fontSize: '15px',
                                                    color: '#444',
                                                    fontFeatureSettings: '"liga", "kern"'
                                                }}
                                            />
                                        )}

                                        {/* Arabic Description - No Label */}
                                        {product.short_description_ar && (
                                            <div
                                                className="product-description-arabic"
                                                dangerouslySetInnerHTML={{ __html: product.short_description_ar }}
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

                                        {/* Fallback Description - No Label */}
                                        {!product.short_description && !product.short_description_ar && product.description && (
                                            <div
                                                className="product-description-fallback"
                                                dangerouslySetInnerHTML={{ __html: product.description }}
                                                style={{
                                                    lineHeight: '1.7',
                                                    fontSize: '15px',
                                                    color: '#444',
                                                    fontFeatureSettings: '"liga", "kern"'
                                                }}
                                            />
                                        )}
                                    </ProductDescription>


                                    <ProductCategories categories={product?.categories}/>
                                    {hasAdminAccess && (
                                        <div>
                                            <a href={`${url}/product/edit/${product?.id}`} target={'blank'}>
                                                <Button
                                                    variant='contained'
                                                    color='secondary'
                                                    disableElevation
                                                    style={{borderRadius: 5, marginTop: 5}}
                                                    onClick={null}
                                                >
                                                    Edit
                                                </Button>
                                            </a>
                                        </div>
                                    )}

                                </ProductInfo>

                                <div style={{flexGrow: 1}}>
                                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                        <Tab label="Details" {...tabProps(0)} />
                                        <Tab label="Features" {...tabProps(1)} />
                                        <Tab label="Documents" {...tabProps(2)} />
                                        <Tab label="Product Include" {...tabProps(3)} />
                                    </Tabs>
                                    <Box p={1}>
                                        <TabPanel value={value} index={0}>
                                            <p>
                                                <div dangerouslySetInnerHTML={{__html: product.description}}/>
                                            </p>
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <p>
                                                <div dangerouslySetInnerHTML={{__html: product.features}}/>
                                            </p>
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            <p>
                                                <div dangerouslySetInnerHTML={{__html: product.documents}}/>
                                            </p>
                                        </TabPanel>
                                        <TabPanel value={value} index={3}>
                                            <p>
                                                <div dangerouslySetInnerHTML={{__html: product.packageInclude}}/>
                                            </p>
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
                                            items={product.gallery.length > 0 ? product.gallery : [{
                                                'url': LogoImage,
                                                'id': 1,
                                                'name': 'default',
                                                'size': 56430
                                            }]}
                                            deviceType={deviceType}
                                        />
                                    </ProductPreview>
                                )}

                            </ProductDetailsWrapper>
                            <ProductDetailsWrapper className="product-card" dir="ltr">

                            </ProductDetailsWrapper>

                            <RelatedItems>
                                <RelatedProducts
                                    slug={data?.id}
                                    deviceType={deviceType}
                                />
                            </RelatedItems>
                        </div>
                        :
                        <ProductDetailsWrapper className="product-card" dir="ltr">
                            <ProductPreview>
                                <ProductTitle>This product is not available</ProductTitle>
                            </ProductPreview>

                        </ProductDetailsWrapper> :
                    <ProductDetailsWrapper className="product-card" dir="ltr">
                        <ProductPreview>
                            <ProductTitle>This product is not available </ProductTitle>
                        </ProductPreview>

                    </ProductDetailsWrapper>


            }


        </>
    );
};


export default ProductDetails;
