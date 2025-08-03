import React, { useEffect, useState, useMemo } from 'react';
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
  MetaSingle,
  RelatedItems,
  ReplacementWrapper,
} from './product-details-one.style';
import CarouselWithCustomDots from 'components/multi-carousel/multi-carousel';
import { FormattedMessage } from 'react-intl';
import { useLocale } from 'contexts/language/language.provider';
import RelatedProducts from "../../product-grid/related-list/related-list";
import { Box, Button, Chip, Tab, Tabs, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { AddToCart } from "./add-to-cart";
import { ProductCardWrapper } from "../../product-grid/related-list/related-list.style";
import Fade from "react-reveal/Fade";
import { ProductCard } from "../../product-card/product-card-six";
import { ReplacementProductCard } from "../../product-card/replacement_product_card";
import useUser from "data/use-user";
import LogoImage from 'assets/images/default/default.png';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';

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

interface Variant {
  id: string | number;
  title: string;
  price?: number | string;
  sale_price?: number | string;
  availableQty?: number;
  image?: string;
  gallery?: any[];
  short_description?: string;
  color_code?: string;
  [key: string]: any;
}

interface VariantGroup {
  name: string;
  displayName: string;
  variants: Variant[];
  type?: 'color' | 'text' | 'image';
}

const useStyles = makeStyles((theme) => ({
  variantSection: {
    margin: '20px 0',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  variantHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  },
  variantTitle: {
    fontWeight: 600,
    fontSize: '16px',
    marginRight: '12px',
  },
  variantSwatches: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '8px',
  },
  colorSwatch: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'all 0.2s ease',
    position: 'relative',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  textSwatch: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  selectedSwatch: {
    borderColor: theme.palette.primary.main,
    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.3)',
    transform: 'scale(1.1)',
    '&::after': {
      content: '"✓"',
      position: 'absolute',
      top: '-6px',
      right: '-6px',
      width: '20px',
      height: '20px',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
    },
  },
  selectedTextSwatch: {
    borderColor: theme.palette.primary.main,
    backgroundColor: '#e3f2fd',
  },
  priceDisplay: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    fontFamily: 'monospace',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '8px 0',
  },
  currentPrice: {
    color: '#000',
  },
  originalPrice: {
    textDecoration: 'line-through',
    color: '#999',
    fontSize: '14px',
  },
  discountBadge: {
    backgroundColor: '#d32f2f',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '12px',
  },
  stockStatus: {
    fontWeight: 'bold',
    '&.inStock': {
      color: '#4caf50',
    },
    '&.lowStock': {
      color: '#ff9800',
    },
    '&.outOfStock': {
      color: '#f44336',
    },
  },
  variantDescription: {
    padding: '12px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    borderLeft: '3px solid #3f51b5',
    fontSize: '14px',
    lineHeight: '1.5',
    marginTop: '12px',
    marginBottom: '12px',
  },
  swatchContainer: {
    marginBottom: '12px',
  },
}));

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

function ProductCategories({ categories = [] }) {
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
                  onClick={() => { }}
                  variant="outlined"
                  color={"secondary"}
                />
              </a>
            </Link>
          </Box>
        ))}
      </MetaSingle>
    </ProductMeta>
  );
}

const getVariantTypeFromTitle = (title: string): 'color' | 'size' | 'width' | 'height' | 'length' | 'weight' | 'capacity' | 'version' | 'volume' | 'material' | 'voltage' | 'pincount' | 'current' | 'power' | 'resistance' | 'frequency' | 'sensitivity'=> {
  const lowerTitle = title.toLowerCase().trim();
  if (lowerTitle.startsWith('size:')) return 'size';
  if (lowerTitle.startsWith('color:')) return 'color';
  if (lowerTitle.startsWith('width:')) return 'width';
  if (lowerTitle.startsWith('height:')) return 'height';
  if (lowerTitle.startsWith('length:')) return 'length';
  if (lowerTitle.startsWith('weight:')) return 'weight';
  if (lowerTitle.startsWith('capacity:')) return 'capacity';
  if (lowerTitle.startsWith('version:')) return 'version';
  if (lowerTitle.startsWith('volume:')) return 'volume';
  if (lowerTitle.startsWith('material:')) return 'material';
  if (lowerTitle.startsWith('voltage:')) return 'voltage';
  if (lowerTitle.startsWith('pincount:')) return 'pincount';
  if (lowerTitle.startsWith('current:')) return 'current';
  if (lowerTitle.startsWith('power:')) return 'power';
  if (lowerTitle.startsWith('resistance:')) return 'resistance';
  if (lowerTitle.startsWith('frequency:')) return 'frequency';
  if (lowerTitle.startsWith('sensitivity:')) return 'sensitivity';


  

  return 'color';
};

const cleanVariantTitle = (title: string): string => {
  return title.replace(/^(size|color|width|height|length|weight|capacity|version|volume|material|voltage|pincount|current|power|resistance|frequency|sensitivity):\s*/i, '').trim();
};


const generateProductId = (baseId: string, variants: Record<string, string>) => {
  return `${baseId}-${Object.values(variants).join('-')}`;
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({
  product,
  deviceType,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { isRtl } = useLocale();
  const { user } = useUser();

  // Create all possible product combinations
  const productCombinations = useMemo(() => {
    const variantsByType: Record<string, Variant[]> = {
      size: [],
      width: [],
      height: [],
      length: [],
      color: [],
      weight: [],
      capacity: [],
      version: [],
      volume: [],
      material: [],
      voltage: [],
      pincount: [],
      current: [],
      power: [],
      resistance: [],
      frequency: [],
      sensitivity: [],

    };

    product.colors?.forEach(variant => {
      const type = getVariantTypeFromTitle(variant.title);
      if (variantsByType[type]) {
        variantsByType[type].push({
          ...variant,
          title: cleanVariantTitle(variant.title)
        });
      }
    });

    const combinations: any[] = [];
    const types = ['size', 'width', 'height', 'length', 'color', 'weight' , 'capacity' , 'version' , 'volume' , 'material', 'voltage' , 'pincount' , 'current' , 'power' , 'resistance' , 'frequency' , 'sensitivity'].filter(t => variantsByType[t].length > 0);

    function generateCombinations(current: any, index: number) {
      if (index === types.length) {
        const variantValues = {};
        types.forEach(t => { variantValues[t] = current[t]; });
        
        let finalPrice = 0;
        let finalSalePrice = 0;
        let hasVariantPrices = false;

        types.forEach(type => {
          if (current[type]) {
            const variant = variantsByType[type].find(v => cleanVariantTitle(v.title) === current[type]);
            if (variant?.price) {
              const variantPrice = parseFloat(variant.price.toString());
              finalPrice = Math.max(finalPrice, variantPrice);
              hasVariantPrices = true;
            }
            if (variant?.sale_price) {
              const variantSalePrice = parseFloat(variant.sale_price.toString());
              finalSalePrice = Math.max(finalSalePrice, variantSalePrice);
              hasVariantPrices = true;
            }
          }
        });

        if (!hasVariantPrices) {
          finalPrice = parseFloat(product.price?.toString() || '0');
          finalSalePrice = parseFloat(product.sale_price?.toString() || '0');
        }

        combinations.push({
          ...product,
          id: generateProductId(product.id, variantValues),
          variants: variantValues,
          price: finalPrice,
          sale_price: finalSalePrice,
          availableQty: current.availableQty || product.availableQty,
          image: current.image || product.image,
          gallery: current.gallery || product.gallery
        });
        return;
      }

      const currentType = types[index];
      variantsByType[currentType].forEach(variant => {
        generateCombinations({
          ...current,
          [currentType]: variant.title,
          price: variant.price || current.price,
          sale_price: variant.sale_price || current.sale_price,
          availableQty: variant.availableQty || current.availableQty,
          image: variant.image || current.image,
          gallery: variant.gallery || current.gallery
        }, index + 1);
      });
    }

    generateCombinations({}, 0);

    if (combinations.length === 0) {
      return [product];
    }

    return combinations;
  }, [product]);

  const [selectedProduct, setSelectedProduct] = useState(productCombinations[0]);

  const availableVariantTypes = useMemo(() => {
    const types = new Set<string>();
    product.colors?.forEach(variant => {
      const type = getVariantTypeFromTitle(variant.title);
      types.add(type);
    });
    return Array.from(types);
  }, [product]);

  const getAvailableOptions = (type: string) => {
    return productCombinations
      .filter(p => {
        return Object.entries(selectedProduct.variants || {})
          .every(([t, val]) => t === type || p.variants[t] === val);
      })
      .map(p => p.variants[type])
      .filter((v, i, arr) => arr.indexOf(v) === i);
  };

  const handleVariantSelect = (type: string, value: string) => {
    const newProduct = productCombinations.find(p => 
      Object.entries(p.variants || {}).every(([t, val]) => 
        t === type ? val === value : val === selectedProduct.variants?.[t]
      )
    );
    if (newProduct) {
      setSelectedProduct(newProduct);
    }
  };

  const getImageUrl = (imgUrl: string | undefined) => {
    if (!imgUrl) return null;
    let cleanedUrl = imgUrl.replace(/\\/g, '');
    if (cleanedUrl.includes('storage/app/public')) {
      cleanedUrl = cleanedUrl.replace('storage/app/public', 'storage');
    }
    return {
      src: cleanedUrl,
      unoptimized: true
    };
  };

  const getDisplayImage = () => {
    const colorVariant = selectedProduct.variants?.color;
    if (colorVariant) {
      const variant = product.colors?.find(c => 
        cleanVariantTitle(c.title) === colorVariant
      );
      if (variant?.image) {
        const variantImg = getImageUrl(variant.image);
        if (variantImg) return variantImg;
      }
    }
    if (selectedProduct.image) {
      const mainImg = getImageUrl(selectedProduct.image);
      if (mainImg) return mainImg;
    }
    return {
      src: LogoImage,
      unoptimized: true
    };
  };

  const displayImage = getDisplayImage();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  const renderCard = (props) => <ProductCard data={props} key={props.id} />;
  const renderReplacementCard = (props) => <ReplacementProductCard data={props} key={props.id} />;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const calculateDiscount = (price, salePrice) => {
    if (!price || !salePrice || price <= salePrice) return 0;
    return Math.round((1 - salePrice / price) * 100);
  };

  const getEffectivePrice = () => {
    return parseFloat(selectedProduct.sale_price?.toString() || selectedProduct.price?.toString() || '0');
  };

  const getEffectiveOriginalPrice = () => {
    return parseFloat(selectedProduct.price?.toString() || '0');
  };

  const getAvailableQty = () => {
    return selectedProduct.availableQty || 0;
  };

  const getVariantDescription = () => {
    const descriptions = [];
    
    // Check all possible variant types
    const variantTypes = ['color', 'size', 'width', 'height', 'length', 'weight' , 'capacity' , 'version' , 'volume' , 'material', 'voltage' , 'pincount' , 'current' , 'power' , 'resistance' , 'frequency' , 'sensitivity'];
    
    variantTypes.forEach(type => {
      if (selectedProduct.variants?.[type]) {
        const variant = product.colors?.find(c => {
          const variantType = getVariantTypeFromTitle(c.title);
          return variantType === type && cleanVariantTitle(c.title) === selectedProduct.variants[type];
        });
        
        if (variant?.short_description) {
          descriptions.push({
            type,
            value: selectedProduct.variants[type],
            description: variant.short_description
          });
        }
      }
    });

    return descriptions.length > 0 ? descriptions : null;
  };

  const productData = {
    ...selectedProduct,
    price: getEffectiveOriginalPrice(),
    sale_price: getEffectivePrice(),
    availableQty: getAvailableQty(),
    image: displayImage.src,
    gallery: selectedProduct.gallery?.length > 0 ? selectedProduct.gallery : [{
      url: displayImage.src,
      id: 1,
      name: 'default',
      size: 56430
    }]
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      price = parseFloat(price);
    }
    return price.toFixed(2);
  };

  const renderVariantSwatch = (type: string) => {
    const options = getAvailableOptions(type);
    const currentValue = selectedProduct.variants?.[type];

    return (
      <div className={classes.variantSwatches}>
        {options.map(option => {
          const variant = product.colors?.find(c => 
            getVariantTypeFromTitle(c.title) === type && 
            cleanVariantTitle(c.title) === option
          );
          const isSelected = currentValue === option;
          const isOutOfStock = productCombinations.every(p => 
            p.variants[type] === option && p.availableQty === 0
          );

          if (type === 'color') {
            return (
              <div
                key={option}
                className={`${classes.colorSwatch} ${isSelected ? classes.selectedSwatch : ''}`}
                style={{
                  backgroundColor: variant?.color_code || '#cccccc',
                  opacity: isOutOfStock ? 0.5 : 1
                }}
                onClick={() => !isOutOfStock && handleVariantSelect(type, option)}
                title={option}
              >
                {variant?.image && (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <Image
                      src={getImageUrl(variant.image).src}
                      alt={option}
                      layout="fill"
                      objectFit="cover"
                      unoptimized={true}
                    />
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div key={option} className={classes.swatchContainer}>
                <div
                  className={`${classes.textSwatch} ${isSelected ? classes.selectedTextSwatch : ''}`}
                  style={{
                    opacity: isOutOfStock ? 0.5 : 1,
                    position: 'relative'
                  }}
                  onClick={() => !isOutOfStock && handleVariantSelect(type, option)}
                >
                  {option}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };

  const allowedRoles = ['super', 'admin', 'Manager', 'Product Manager', 'Cashier', 'Distributer', 'Admin cash'];
  const hasAccess = user?.roles?.some(role => allowedRoles.includes(role.name));
  const hasAdminAccess = user?.roles?.some(role => allowedRoles.includes(role.name));

  return (
    <>
      {product.deleted_at == null ? (
        product.is_available ? (
          <div>
            <ProductDetailsWrapper className="product-card" dir="ltr">
              <ProductPreview>
                <BackButton>
                  <Button
                    variant="contained"
                    onClick={Router.back}
                    disableElevation
                    startIcon={<ArrowBack />}
                  >
                    <FormattedMessage id="backBtn" defaultMessage="Back" />
                  </Button>
                </BackButton>

                <CarouselWithCustomDots
                  items={selectedProduct.gallery?.length > 0 ? selectedProduct.gallery : [{
                    url: displayImage.src,
                    id: 1,
                    name: 'default',
                    size: 56430
                  }]}
                  deviceType={deviceType}
                  title={selectedProduct.title}
                />
              </ProductPreview>

              <ProductInfo>
                <ProductTitlePriceWrapper>
                  <ProductTitle>{selectedProduct.title}</ProductTitle>
                </ProductTitlePriceWrapper>

                {!selectedProduct.is_retired ? (
                  <div>
                    {/* Render each variant group in its own section */}
                    {availableVariantTypes.map(type => {
                      const options = getAvailableOptions(type);
                      if (options.length === 0) return null;
                      
                        const displayNames: Record<string, string> = {
                             pincount: 'Pin Count',
    voltage: 'Voltage',
    current: 'Current',
   
  };

                      return (
                        <div key={type} className={classes.variantSection}>
                          <div className={classes.variantHeader}>
                            <Typography className={classes.variantTitle}>
          {displayNames[type] || type.charAt(0).toUpperCase() + type.slice(1)}
                            </Typography>
                            <Typography variant="body2">
                              {selectedProduct.variants?.[type] ? (
                                <FormattedMessage
                                  id="selectedVariant"
                                  defaultMessage="Selected: {variant}"
                                  values={{ variant: selectedProduct.variants[type] }}
                                />
                              ) : (
                                <FormattedMessage
                                  id="selectVariant"
                                  defaultMessage="Please select an option"
                                />
                              )}
                            </Typography>
                          </div>
                          {renderVariantSwatch(type)}
                        </div>
                      );
                    })}

                    {/* Variant Descriptions */}
                    {getVariantDescription()?.map((desc, index) => (
                      <div key={index} className={classes.variantDescription}>
                        <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                          {desc.type.charAt(0).toUpperCase() + desc.type.slice(1)}: {desc.value}
                        </Typography>
                        <Typography variant="body2">
                          {desc.description}
                        </Typography>
                      </div>
                    ))}

                    <div className={classes.priceDisplay}>
                      <span className={classes.currentPrice}>
                        JD{formatPrice(getEffectivePrice())}
                      </span>
                      {getEffectivePrice() < getEffectiveOriginalPrice() && (
                        <>
                          <span className={classes.originalPrice}>
                            JD{formatPrice(getEffectiveOriginalPrice())}
                          </span>
                          <span className={classes.discountBadge}>
                            {calculateDiscount(getEffectiveOriginalPrice(), getEffectivePrice())}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    <Typography
                      className={`${classes.stockStatus} ${
                        getAvailableQty() > 0 ?
                          (getAvailableQty() < 5 ? 'lowStock' : 'inStock') :
                          'outOfStock'
                        }`}
                    >
                      {getAvailableQty() > 0 ? (
                        getAvailableQty() < 5 ? (
                          <FormattedMessage
                            id="lowStock"
                            defaultMessage="{quantity} left - Hurry! "
                            values={{
                              quantity: getAvailableQty(),
                              discount: calculateDiscount(getEffectiveOriginalPrice(), getEffectivePrice())
                            }}
                          />
                        ) : (
                          <FormattedMessage
                            id="inStock"
                            defaultMessage="Available "
                            values={{
                              discount: calculateDiscount(getEffectiveOriginalPrice(), getEffectivePrice())
                            }}
                          />
                        )
                      ) : (
                        <FormattedMessage id="outOfStock" defaultMessage="Out of stock" />
                      )}
                    </Typography>

                    <ProductCartWrapper>
                      {getAvailableQty() ? (
                        <AddToCart data={productData} />
                      ) : (
                        <FormattedMessage id='outOfStock' defaultMessage='Out Of Stock' />
                      )}
                    </ProductCartWrapper>

                    {hasAccess && (
                      <div className={'mt-1'} style={{ marginTop: 5 }}>
                        <Typography component="span" variant="body1" color="textPrimary"
                          style={{ marginRight: 50 }}>
                          <FormattedMessage id="quantity" defaultMessage="Quantity" />: {getAvailableQty()}
                        </Typography>
                        <Typography component="span" variant="body1" color="textPrimary">
                          <FormattedMessage id="location" defaultMessage="Location" />: {selectedProduct.location} / {selectedProduct.stock_location ?? '----'}
                        </Typography>
                      </div>
                    )}
                  </div>
                ) : (
                  <ReplacementWrapper>
                    <FormattedMessage id='retired'
                      defaultMessage="This product is retired now, the replacement is:" />
                    <ProductCardWrapper>
                      <Fade duration={800} delay={10} style={{ height: '100%' }}>
                        {selectedProduct.replacement_item ? (
                          renderReplacementCard(selectedProduct.replacement_item)
                        ) : (
                          <FormattedMessage id='retired'
                            defaultMessage="There is no replacement item" />
                        )}
                      </Fade>
                    </ProductCardWrapper>
                  </ReplacementWrapper>
                )}

                <ProductWeight>{selectedProduct.unit}</ProductWeight>

                <ProductDescription>
                  {selectedProduct.short_description && (
                    <div
                      className="product-description-english"
                      dangerouslySetInnerHTML={{ __html: selectedProduct.short_description }}
                      style={{
                        marginBottom: selectedProduct.short_description_ar ? '28px' : '0',
                        lineHeight: '1.7',
                        fontSize: '15px',
                        color: '#444',
                        fontFeatureSettings: '"liga", "kern"'
                      }}
                    />
                  )}

                  {selectedProduct.short_description_ar && (
                    <div
                      className="product-description-arabic"
                      dangerouslySetInnerHTML={{ __html: selectedProduct.short_description_ar }}
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

                  {!selectedProduct.short_description && !selectedProduct.short_description_ar && selectedProduct.description && (
                    <div
                      className="product-description-fallback"
                      dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
                      style={{
                        lineHeight: '1.7',
                        fontSize: '15px',
                        color: '#444',
                        fontFeatureSettings: '"liga", "kern"'
                      }}
                    />
                  )}
                </ProductDescription>

                <ProductCategories categories={selectedProduct?.categories} />
                {hasAdminAccess && (
                  <div>
                    <a href={`${process.env.NEXT_PUBLIC_REST_ADMIN_ENDPOINT}/product/edit/${selectedProduct?.id}`} target={'_blank'} rel="noopener noreferrer">
                      <Button
                        variant='contained'
                        color='secondary'
                        disableElevation
                        style={{ borderRadius: 5, marginTop: 5 }}
                      >
                        <FormattedMessage id="edit" defaultMessage="Edit" />
                      </Button>
                    </a>
                  </div>
                )}
              </ProductInfo>

              <div style={{ flexGrow: 1 }}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label={<FormattedMessage id="details" defaultMessage="Details" />} {...tabProps(0)} />
                  <Tab label={<FormattedMessage id="features" defaultMessage="Features" />} {...tabProps(1)} />
                  <Tab label={<FormattedMessage id="documents" defaultMessage="Documents" />} {...tabProps(2)} />
                  <Tab label={<FormattedMessage id="productInclude" defaultMessage="Product Include" />} {...tabProps(3)} />
                </Tabs>
                <Box p={1}>
                  <TabPanel value={value} index={0}>
                    <div dangerouslySetInnerHTML={{ __html: selectedProduct.description }} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div dangerouslySetInnerHTML={{ __html: selectedProduct.features }} />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <div dangerouslySetInnerHTML={{ __html: selectedProduct.documents }} />
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <div dangerouslySetInnerHTML={{ __html: selectedProduct.packageInclude }} />
                  </TabPanel>
                </Box>
              </div>
            </ProductDetailsWrapper>

            <RelatedItems>
              <RelatedProducts
                slug={selectedProduct?.id}
                deviceType={deviceType}
              />
            </RelatedItems>
          </div>
        ) : (
          <ProductDetailsWrapper className="product-card" dir="ltr">
            <ProductPreview>
              <ProductTitle><FormattedMessage id="productNotAvailable" defaultMessage="This product is not available" /></ProductTitle>
            </ProductPreview>
          </ProductDetailsWrapper>
        )
      ) : (
        <ProductDetailsWrapper className="product-card" dir="ltr">
          <ProductPreview>
            <ProductTitle><FormattedMessage id="productNotAvailable" defaultMessage="This product is not available" /></ProductTitle>
          </ProductPreview>
        </ProductDetailsWrapper>
      )}
    </>
  );
};

export default ProductDetails;