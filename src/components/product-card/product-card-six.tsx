import React, { useState } from 'react';
import Link from 'next/link';
import { AddItemToCart } from 'components/add-item-to-cart';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from 'components/box';
import { RadioButtonChecked, Check, Close, ExpandMore } from '@material-ui/icons';
import MoneyFormat from "../money-format/money-format";
import { FormattedMessage } from "react-intl";
import Image from "next/image";
import LogoImage from 'assets/images/default/default.png';
import ReactDOM from 'react-dom';
import { variant as _variant } from 'styled-system';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

// Tooltip styles
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

// Base Card Styles
const Card = styled.div`
  background-color: #fff;
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 0;
  cursor: pointer;
  transition: 0.25s ease-in-out;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div(
    css({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        height: ['190px', '210px'],
        img: {
            display: 'block',
            maxHeight: '100%',
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
        },
    })
);

const Discount = styled.div(
    css({
        position: 'absolute',
        zIndex: 1,
        top: '10px',
        right: '10px',
        backgroundColor: 'rgba(201,37,60,.5)',
        color: '#fff',
        overflow: 'hidden',
        padding: '0.25rem 0.5rem',
        fontSize: 12,
        borderRadius: 6,
        pointerEvents: 'none',
    })
);

const Stock = styled.div(
    css({
        position: 'absolute',
        zIndex: 1,
        top: '10px',
        left: '10px',
        overflow: 'hidden',
        padding: '0.25rem 0.5rem',
        fontSize: 12,
        borderRadius: 6,
        pointerEvents: 'none',
    })
);

const CounterWrapper = styled.div(
    css({
        position: 'absolute',
        zIndex: 1,
        right: '10px',
    })
);

const PriceWrapper = styled.div({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
});

const Price = styled.span(
    css({
        display: 'block',
        color: 'text.bold',
        fontSize: 16,
        fontWeight: 'semiBold',
    })
);

const SalePrice = styled.span(
    css({
        color: 'text.success',
        display: 'block',
        fontSize: 16,
        fontWeight: 'semiBold',
    })
);

const OldPrice = styled.span(
    css({
        color: 'text.red',
        fontSize: 13,
        lineHeight: 1,
        fontWeight: 'regular',
        padding: '0 5px',
        overflow: 'hidden',
        position: 'relative',
        marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        ':before': {
            content: '""',
            width: '100%',
            height: 1,
            display: 'inline-block',
            backgroundColor: 'text.regular',
            position: 'absolute',
            top: '50%',
            left: 0,
        },
    })
);

const Title = styled.h2(
    css({
        color: 'text.regular',
        fontSize: 'sm',
        fontWeight: 'regular',
        marginBottom: '20px',
        whiteSpace: 'nowrap'
    })
);

// Enhanced Modal Styles with Two Columns
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  overflow-y: auto;
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
  
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background-color: white;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transform: translateY(20px);
  animation: slideUp 0.3s ease-out forwards;
  position: relative;
  
  @keyframes slideUp {
    to { transform: translateY(0); }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-height: 95vh;
    overflow-y: auto;
  }
`;

const ModalLeftColumn = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f0f0f0;
  background: #fafafa;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-right: none;
    border-bottom: 1px solid #f0f0f0;
  }
`;

const ModalRightColumn = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(90vh - 120px);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    max-height: calc(95vh - 120px);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;
  grid-column: 1 / -1;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  
  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  img {
    object-fit: contain;
    max-width: 100%;
    maxHeight: 100%;
    transition: transform 0.3s ease;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ProductTitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ProductDescription = styled.div`
  margin: 10px 0;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const DescriptionLabel = styled.span`
  font-weight: 600;
  color: #333;
  margin-right: 5px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 10px;
  flex-wrap: wrap;
`;

const CurrentPrice = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fe5e00;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const OriginalPrice = styled.span`
  font-size: 1.2rem;
  color: #999;
  text-decoration: line-through;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const DiscountBadge = styled.span`
  background: linear-gradient(135deg, #fe5e00, #fe5e00);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 0.8rem;
  }
`;

const ColorOption = styled.div<{ selected: boolean, outofstock: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: ${props => props.outofstock ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.outofstock ? 0.6 : 1};
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  border: 3px solid ${props => props.selected ? '#133595' : 'transparent'};
  
  &:hover:not(:disabled) {
    transform: ${props => !props.outofstock ? 'translateY(-3px)' : 'none'};
    box-shadow: ${props => !props.outofstock ? '0 5px 10px rgba(0, 0, 0, 0.15)' : 'none'};
  }
  
  // Add out of stock indicator
  &::after {
    ${props => props.outofstock ? `
      content: "Out of Stock";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      background: rgba(255, 0, 0, 0.7);
      color: white;
      font-size: 8px;
      padding: 2px 4px;
      border-radius: 3px;
      white-space: nowrap;
    ` : ''}
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const ColorImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: #f5f5f5;
  
  img {
    object-fit: cover;
  }
`;

const ColorName = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #133595;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover:not(:disabled) {
    background-color: #133595;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.9rem;
    font-size: 0.95rem;
  }
`;

const SelectedOptionsCard = styled.div`
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  margin-top: auto;
  border: 1px solid #e2e8f0;
`;

const SelectedVariantText = styled.p`
  margin: 0 0 0.8rem 0;
  font-size: 0.95rem;
  color: #555;
  font-weight: 500;
  
  strong {
    color: #333;
  }
`;

const SelectedPrice = styled.p`
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const OriginalSelectedPrice = styled.span`
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
  margin-left: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StockIndicator = styled.div<{ inStock: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  background: ${props => props.inStock ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.inStock ? '#2e7d32' : '#c62828'};
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.inStock ? '#4caf50' : '#f44336'};
  }
`;

const AddToCartIcon = styled.span(
    _variant({
        variants: {
            lightHorizontal: {
                px: 3,
                height: 36,
                backgroundColor: '#e6e6e6',
                transition: '0.35s ease-in-out',
                display: 'flex',
                alignItems: 'center',
            },
        },
    })
);

const ActionButton = styled.button<{ primary?: boolean }>`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${props => props.primary ? `
    background-color: #133595;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #133595;
      transform: translateY(-2px);
    }
  ` : `
    background-color: white;
    color: #133595;
    border: 1px solid #133595;
    
    &:hover {
      background-color: #f5f7fa;
    }
  `}
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none !important;
  }
  
  @media (max-width: 768px) {
    padding: 0.9rem;
    font-size: 0.95rem;
  }
`;

const VariantDescription = styled.div`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
  font-style: italic;
`;

// Variant Selector Components
const VariantSelector = styled.div`
  margin-bottom: 16px;
`;

const VariantLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
`;

const VariantGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const VariantOption = styled.div<{ selected: boolean, available: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: ${props => props.available ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.available ? 1 : 0.5};
  position: relative;
  overflow: hidden;
  border: 2px solid ${props => props.selected ? '#133595' : 'transparent'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  ${props => props.available && `
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }
  `}
`;

const VariantImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  background: #f0f0f0;
  
  img {
    object-fit: cover;
  }
`;

const SelectedIndicator = styled.div<{ selected: boolean }>`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #133595;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 8px;
  opacity: ${props => props.selected ? 1 : 0};
  transform: ${props => props.selected ? 'scale(1)' : 'scale(0)'};
  transition: all 0.2s ease;
  z-index: 2;
`;

const MoreVariantsButton = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e6eeff;
    color: #133595;
  }
`;

interface Props {
    data: any;
}

interface Variant {
    id: string | number;
    title: string;
    price?: number | string;
    sale_price?: number | string;
    availableQty?: number;
    image?: string;
    gallery?: any[];
    short_description?: string | { en?: string; ar?: string };
    color_code?: string;
    [key: string]: any;
}

export const ProductCard = ({ data }: Props) => {
    const classes = useStyles();

    const {
        id,
        title,
        image,
        price,
        sale_price,
        slug,
        availableQty,
        is_available,
        is_retired,
        hasVariants,
        colors = [],
        short_description
    } = data;

    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
    const [showVariantDialog, setShowVariantDialog] = useState(false);
    const [cartKey, setCartKey] = useState(0);

    const stockColor = availableQty > 10 ? 'green' : (availableQty < 1 ? 'red' : 'orange');

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
        if (selectedVariant?.image) {
            const variantImg = getImageUrl(selectedVariant.image);
            if (variantImg) return variantImg;
        }
        if (data.image) {
            const mainImg = getImageUrl(data.image);
            if (mainImg) return mainImg;
        }
        return {
            src: LogoImage,
            unoptimized: true
        };
    };

    const displayImage = getDisplayImage();

    const getAvailableQty = () => {
        if (selectedVariant) {
            return selectedVariant.availableQty || 0;
        }
        return data.availableQty || 0;
    };

    const isInStock = getAvailableQty() > 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();

        if (hasVariants && colors.length > 0 && !selectedVariant) {
            setShowVariantDialog(true);
            return;
        }
    };

    const getCartData = () => {
        if (!selectedVariant) return data;

        return {
            ...data,
            ...selectedVariant,
            baseProductId: data.id,
            variantId: selectedVariant.id,
            id: data.id,
            baseTitle: data.title,
            title: selectedVariant
                ? `${data.title} - ${selectedVariant.title}`
                : data.title,
        };
    };

    const getEffectivePrice = () => {
        if (selectedVariant) {
            return parseFloat(selectedVariant.sale_price?.toString() || selectedVariant.price?.toString() || '0');
        }
        return parseFloat(data.sale_price?.toString() || data.price?.toString() || '0');
    };

    const getEffectiveOriginalPrice = () => {
        if (selectedVariant) {
            return parseFloat(selectedVariant.price?.toString() || '0');
        }
        return parseFloat(data.price?.toString() || '0');
    };

    const calculateDiscount = (original: number, sale: number) => {
        if (!original || !sale || original <= sale) return 0;
        return Math.round((1 - sale / original) * 100);
    };

    const handleVariantChange = (variant: Variant) => {
        setSelectedVariant(variant);
        setCartKey(prev => prev + 1);
    };

    const handleCloseModal = () => {
        setShowVariantDialog(false);
    };

    const handleCompleteSelection = () => {
        setShowVariantDialog(false);
    };

    const getColorHexCode = (colorName: string) => {
        const colorMap: Record<string, string> = {
            red: '#ff0000',
            blue: '#0000ff',
            green: '#008000',
            yellow: '#ffff00',
            black: '#000000',
            white: '#ffffff',
            purple: '#800080',
            pink: '#ffc0cb',
            orange: '#ffa500',
            gray: '#808080',
            brown: '#6d3f03ff',
        };
        return colorMap[colorName.toLowerCase()] || '#cccccc';
    };

    return (
        <Card>
            {showVariantDialog && colors.length > 0 &&
            (ReactDOM.createPortal(
                <ModalOverlay onClick={handleCloseModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <ModalTitle>
                                <FormattedMessage id="selectOptions" defaultMessage="Customize Your Selection" />
                            </ModalTitle>
                            <ModalCloseButton onClick={handleCloseModal}>
                                &times;
                            </ModalCloseButton>
                        </ModalHeader>

                        <ModalLeftColumn>
                            <ProductImageContainer>
                                <Image
                                    src={displayImage.src}
                                    alt={title}
                                    layout="fill"
                                    objectFit="contain"
                                    unoptimized={true}
                                />
                            </ProductImageContainer>
                            <ProductTitle>{title} {selectedVariant ? `- ${selectedVariant.title}` : ''} </ProductTitle>

                            <PriceContainer>
                                <CurrentPrice>
                                    <MoneyFormat value={getEffectivePrice()} />
                                </CurrentPrice>
                                {getEffectivePrice() < getEffectiveOriginalPrice() && (
                                    <>
                                        <OriginalPrice>
                                            <MoneyFormat value={getEffectiveOriginalPrice()} />
                                        </OriginalPrice>
                                        <DiscountBadge>
                                            {calculateDiscount(getEffectiveOriginalPrice(), getEffectivePrice())}% OFF
                                        </DiscountBadge>
                                    </>
                                )}
                            </PriceContainer>

                            {short_description && (
                                <div>
                                    <SectionTitle>
                                        <FormattedMessage id="productDetails" defaultMessage="Product Details" />
                                    </SectionTitle>
                                    <ProductDescription>
                                        <DescriptionLabel>Description:</DescriptionLabel>
                                        {typeof short_description === 'object'
                                            ? short_description.en || Object.values(short_description)[0]
                                            : short_description}
                                    </ProductDescription>
                                </div>
                            )}
                        </ModalLeftColumn>

                        <ModalRightColumn>
                            <SectionTitle>
                                <FormattedMessage id="selectColor" defaultMessage="Select option" />
                            </SectionTitle>

                            <ColorGrid>
                                {colors.map((variant: Variant) => {
                                    const isSelected = selectedVariant?.id === variant.id;
                                    const isOutOfStock = variant.availableQty === 0;
                                    const colorCode = getColorHexCode(variant.title);
                                    const variantImage = variant.image ? getImageUrl(variant.image) : null;

                                    // @ts-ignore
                                    return (
                                        <div key={variant.id} style={{ textAlign: 'center', position: 'relative' }}>
                                            <Tooltip
                                                title={
                                                    <div>
                                                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{variant.title}</div>
                                                        {isOutOfStock && <div style={{ color: '#f44336' }}>Out of Stock</div>}
                                                        {variant.short_description && (
                                                            <div>{variant.short_description}</div>
                                                        )}
                                                    </div>
                                                }
                                                arrow
                                                classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
                                            >
                                                <ColorOption
                                                    selected={isSelected}
                                                    outofstock={isOutOfStock}
                                                    onClick={() => handleVariantChange(variant)}
                                                >
                                                    <ColorImage>
                                                        {variantImage ? (
                                                            <Image
                                                                src={variantImage.src}
                                                                alt={variant.title}
                                                                layout="fill"
                                                                unoptimized={true}
                                                            />
                                                        ) : (
                                                            <div style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                backgroundColor: colorCode,
                                                                borderRadius: '50%'
                                                            }} />
                                                        )}
                                                    </ColorImage>
                                                </ColorOption>
                                            </Tooltip>
                                            <ColorName>{variant.title}</ColorName>
                                        </div>
                                    );
                                })}
                            </ColorGrid>

                            <SelectedOptionsCard>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <SelectedVariantText>
                                        <strong>Your Selection:</strong> {selectedVariant?.title || 'No color selected'}
                                    </SelectedVariantText>
                                    <StockIndicator inStock={getAvailableQty() > 0}>
                                        {getAvailableQty() > 0 ? 'In Stock' : 'Out of Stock'}
                                    </StockIndicator>
                                </div>

                                {selectedVariant?.short_description && (
                                    <VariantDescription>
                                        {selectedVariant?.short_description}
                                    </VariantDescription>
                                )}

                                <SelectedPrice style={{ marginTop: '1rem' }}>
                                    <MoneyFormat value={getEffectivePrice()} />
                                    {getEffectivePrice() < getEffectiveOriginalPrice() && (
                                        <OriginalSelectedPrice>
                                            <MoneyFormat value={getEffectiveOriginalPrice()} />
                                        </OriginalSelectedPrice>
                                    )}
                                </SelectedPrice>
                            </SelectedOptionsCard>

                            <AddToCartButton
                                onClick={handleCompleteSelection}
                                disabled={!selectedVariant || getAvailableQty() === 0}
                            >
                                {!selectedVariant ?
                                    'Please select option' :
                                    getAvailableQty() === 0 ?
                                        'Out of Stock' :
                                        <>
                                            Add to Cart - <MoneyFormat value={getEffectivePrice()} />
                                        </>
                                }
                            </AddToCartButton>

                            <ActionButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = `/product/${slug}`;
                                }}
                            >
                                View Product Details
                            </ActionButton>

                        </ModalRightColumn>
                    </ModalContent>
                </ModalOverlay>,
                document.getElementById('modal-root')!
            ) as React.ReactNode)}


            <Link href="/product/[slug]" as={`/product/${slug}`}>
                <a>
                    <Box position="relative">
                        <Stock>
                            <RadioButtonChecked style={{width: 16, color: stockColor }} />
                        </Stock>
                        <ImageWrapper>
                            <Image
                                src={displayImage.src}
                                alt={title}
                                width={200}
                                height={200}
                                unoptimized={true}
                                onError={(e) => {
                                    e.currentTarget.src = LogoImage;
                                    e.currentTarget.onerror = null;
                                }}
                                loader={({ src }) => src}
                            />
                        </ImageWrapper>
                        {getEffectivePrice() < getEffectiveOriginalPrice() && (
                            <Discount>On Sale</Discount>
                        )}
                    </Box>
                </a>
            </Link>

            <Box padding={20}>
                <Title>
                    {title.substring(0,32) + (title.length > 32 ? '...' : '')}
                </Title>

                {/* Variant Selector Section */}
                {hasVariants && colors.length > 0 ? (
                    <VariantSelector>
                        <VariantLabel>
                            <span>Options</span>
                        </VariantLabel>

                        <VariantGrid>
                            {colors.slice(0, 5).map((variant: Variant) => {
                                const isSelected = selectedVariant?.id === variant.id;
                                const isAvailable = variant.availableQty !== 0;
                                const variantImage = variant.image ? getImageUrl(variant.image) : null;

                                return (
                                    <VariantOption
                                        key={variant.id}
                                        selected={isSelected}
                                        available={isAvailable}
                                        onClick={() => isAvailable && handleVariantChange(variant)}
                                    >
                                        <VariantImage>
                                            {variantImage ? (
                                                <Image
                                                    src={variantImage.src}
                                                    alt={variant.title}
                                                    width={32}
                                                    height={32}
                                                    unoptimized={true}
                                                />
                                            ) : (
                                                <div style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor: '#f0f0f0',
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#999',
                                                    fontSize: '8px'
                                                }}>
                                                    {variant.title.charAt(0)}
                                                </div>
                                            )}
                                        </VariantImage>
                                        <SelectedIndicator selected={isSelected}>
                                            <Check style={{ fontSize: 8 }} />
                                        </SelectedIndicator>
                                    </VariantOption>
                                );
                            })}

                            {colors.length > 5 && (
                                <MoreVariantsButton onClick={() => setShowVariantDialog(true)}>
                                    +{colors.length - 5}
                                </MoreVariantsButton>
                            )}
                        </VariantGrid>
                    </VariantSelector>
                ):null}

                {is_available ? (
                    !is_retired ? (
                        <PriceWrapper>
                            {getEffectivePrice() < getEffectiveOriginalPrice() ? (
                                <>
                                    <SalePrice>
                                        <MoneyFormat value={getEffectivePrice()} />
                                    </SalePrice>
                                    <OldPrice>
                                        <MoneyFormat value={getEffectiveOriginalPrice()} />
                                    </OldPrice>
                                </>
                            ) : (
                                <Price>
                                    <MoneyFormat value={getEffectiveOriginalPrice()} />
                                </Price>
                            )}
                            <CounterWrapper>
                                {getAvailableQty() ? (
                                    hasVariants && colors.length > 0 ? (
                                        selectedVariant ? (
                                            <AddItemToCart
                                                key={`${id}-${cartKey}`}
                                                data={getCartData()}
                                                variant={'lightHorizontal'}
                                            />
                                        ) : (
                                            <button
                                                onClick={handleAddToCart}
                                                style={{
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: 6,
                                                    transition: '0.35s ease-in-out',
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #e6e6e6',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <AddToCartIcon>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="10"
                                                        height="10"
                                                        viewBox="0 0 10 10"
                                                    >
                                                        <path
                                                            data-name="Path 9"
                                                            d="M143.407,137.783h-1.25v4.375h-4.375v1.25h4.375v4.375h1.25v-4.375h4.375v-1.25h-4.375Z"
                                                            transform="translate(-137.782 -137.783)"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </AddToCartIcon>
                                            </button>
                                        )
                                    ) : (
                                        <AddItemToCart
                                            data={data}
                                            variant={'lightHorizontal'}
                                        />
                                    )
                                ) : (
                                    <FormattedMessage id='outOfStock' defaultMessage='Out Of Stock' />
                                )}
                            </CounterWrapper>
                        </PriceWrapper>
                    ) : (
                        <FormattedMessage id='retired' defaultMessage="This product is retired now" />
                    )
                ) : (
                    <FormattedMessage id='available' defaultMessage="This product isn't available now" />
                )}
            </Box>
        </Card>
    );
};