import React, { useEffect } from 'react';
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
} from './product-details-one.style';
import CarouselWithCustomDots from 'components/multi-carousel/multi-carousel';
import { FormattedMessage } from 'react-intl';
import { useLocale } from 'contexts/language/language.provider';
import RelatedProducts from "../../product-grid/related-list/related-list";
import { Box, Button, Chip, Tab, Tabs, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import MoneyFormat from "../../money-format/money-format";
import {AddToCart} from "./add-to-cart";

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
    const { children, value, index, ...other } = props;

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

function ProductCategories ({ categories = []}) {
    return (
        <ProductMeta>
            <MetaSingle>
                {categories.map((item: any) => (
                    <Box m={0.3}>
                        <Link
                            href={`/?category=${item.slug}`}
                            key={`link-${item.id}`}
                        >
                            <a>
                                <Chip
                                    label={item.title}
                                    onClick={() => {}}
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

    const { isRtl } = useLocale();
    const data = product;

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 500);
    }, []);

    return (
        <>
            <ProductDetailsWrapper className="product-card" dir="ltr">
                <ProductPreview>
                    <BackButton>
                        <Button
                            variant="contained"
                            onClick={Router.back}
                            disableElevation
                            startIcon={<ArrowBack />}
                        >
                            <FormattedMessage id="backBtn" defaultMessage="Back"/>
                        </Button>
                    </BackButton>

                    <CarouselWithCustomDots
                        items={product.gallery}
                        deviceType={deviceType}
                    />
                </ProductPreview>

                <ProductInfo >

                    <ProductTitlePriceWrapper>
                        <ProductTitle>{product.title}</ProductTitle>
                    </ProductTitlePriceWrapper>

                    <ProductPriceWrapper>
                        <ProductPrice>
                            <MoneyFormat value={product.sale_price ? product.sale_price : product.price} />
                            {
                                product.sale_price ? (
                                <SalePrice>
                                    <MoneyFormat value={product.price} />
                                </SalePrice>
                                ) : null
                            }
                        </ProductPrice>
                    </ProductPriceWrapper>

                    <ProductCartWrapper>
                        {
                            data.availableQty ?
                                <AddToCart data={data} />:
                                <FormattedMessage id='outOfStock' defaultMessage='Out Of Stock' />
                        }
                    </ProductCartWrapper>

                    <ProductWeight>{product.unit}</ProductWeight>
                    <ProductDescription>
                        {
                            product.short_description ?
                                product.short_description :
                                <p>
                                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                </p>
                        }
                    </ProductDescription>

                    <ProductCategories categories={product?.categories} />

                </ProductInfo>

                <div style={{flexGrow: 1}}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Details" {...tabProps(0)} />
                        <Tab label="Features" {...tabProps(1)} />
                        <Tab label="Documents" {...tabProps(2)} />
                    </Tabs>
                    <Box p={1}>
                        <TabPanel value={value} index={0}>
                            <p>
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            </p>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <p>
                                <div dangerouslySetInnerHTML={{ __html: product.features }} />
                            </p>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <p>
                                <div dangerouslySetInnerHTML={{ __html: product.documents }} />
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
                                startIcon={<ArrowBack />}
                            >
                                <FormattedMessage id="backBtn" defaultMessage="Back"/>
                            </Button>
                        </BackButton>

                        <CarouselWithCustomDots
                            items={product.gallery}
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
        </>
    );
};



export default ProductDetails;
