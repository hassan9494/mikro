import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { AddItemToCart } from 'components/add-item-to-cart';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from 'components/box';
import { RadioButtonChecked } from '@material-ui/icons';
import MoneyFormat from "../money-format/money-format";
import { FormattedMessage } from "react-intl";
import Image from "next/image";
import LogoImage from 'assets/images/default/default.png';
import { variant as _variant } from 'styled-system';
import ReactDOM from 'react-dom';
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

// Enhanced Modal Styles
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
  max-height: calc(90vh - 120px); // Adjust based on your header height
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    max-height: calc(95vh - 120px);
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
    max-height: 100%;
    transition: transform 0.3s ease;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;
const ModalScrollWrapper = styled.div`
  @media (max-width: 768px) {
    overflow-y: auto;
    width: 100%;
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

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  padding: 0;
  line-height: 1;
  transition: all 0.2s ease;
  &:hover {
    color: #333;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const ProductPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.03);
    }
  }
  
  @media (max-width: 768px) {
    height: 250px;
    margin-bottom: 15px;
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

const ColorOption = styled.div<{ color: string, selected: boolean, disabled: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.color};
  border: 3px solid ${props => props.selected ? '#133595' : 'transparent'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  
  &:hover:not(:disabled) {
    transform: ${props => !props.disabled ? 'translateY(-3px)' : 'none'};
    box-shadow: ${props => !props.disabled ? '0 5px 10px rgba(0, 0, 0, 0.15)' : 'none'};
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
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

const SizeOption = styled.div<{ selected: boolean, disabled: boolean }>`
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  background-color: ${props => props.selected ? '#133595' : '#f5f5f5'};
  color: ${props => props.selected ? 'white' : '#555'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  font-size: 0.95rem;
  font-weight: ${props => props.selected ? '600' : '500'};
  transition: all 0.2s ease;
  min-width: 50px;
  text-align: center;
  
  &:hover:not(:disabled) {
    transform: ${props => !props.disabled ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => !props.disabled ? '0 5px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
  }
`;


const SizeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
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

const VariantDescription = styled.div`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
`;
const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: inherit;
`;
const AddToCartButtonLarge = styled.button`
  width: 100%;
  padding: 10px 16px;
  background-color: #133695;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover:not(:disabled) {
    background-color: #133595;
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 16px;
  }
`;

const ViewDetailsButton = styled.button`
  width: 100%;
  padding: 10px 16px;
  background-color: white;
  color: #133695;
  border: 1px solid #133695;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    background-color: #f5f7fa;
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 16px;
  }
`;

const VariantBadge = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: #133695;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.25);
  }
`;

const BadgeText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
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

const AddToCartButton = styled.button(
  css({
    width: 36,
    height: 36,
    borderRadius: 6,
    transition: '0.35s ease-in-out',
    backgroundColor: '#fff',
    border: '1px solid #e6e6e6',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'primary.regular',
      borderColor: 'primary.regular',
      color: '#fff',
    },
  }),
);

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

 const variantCombinations = useMemo(() => {
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

  colors.forEach(variant => {
    const type = getVariantTypeFromTitle(variant.title);
    if (variantsByType[type]) {
      variantsByType[type].push({
        ...variant,
        title: cleanVariantTitle(variant.title),
        type
      });
    }
  });

  
  const combinations: any[] = [];
    const types = ['size', 'width', 'height', 'length', 'color', 'weight' , 'capacity' , 'version' , 'volume' , 'material', 'voltage' , 'pincount' , 'current' , 'power' , 'resistance' , 'frequency' , 'sensitivity'].filter(t => variantsByType[t].length > 0);

  function generateCombinations(current: any, index: number) {
    if (index === types.length) {
      const variantValues: Record<string, string> = {};
      types.forEach(t => { variantValues[t] = current[t]; });
      
      // Start with variant prices (if any variant has prices)
      let finalPrice = 0;
      let finalSalePrice = 0;
      let hasVariantPrices = false;

      // Get prices from variants only
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

      // If no variant prices, use base product prices
      if (!hasVariantPrices) {
        finalPrice = parseFloat(price?.toString() || '0');
        finalSalePrice = parseFloat(sale_price?.toString() || '0');
      }

      combinations.push({
        ...data,
        id: `${id}-${Object.values(variantValues).join('-')}`,
        variants: variantValues,
        price: finalPrice,
        sale_price: finalSalePrice,
        availableQty: current.availableQty || availableQty,
        image: current.image || image,
        gallery: current.gallery || data.gallery,
        short_description: current.short_description || short_description
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
        gallery: variant.gallery || current.gallery,
        short_description: variant.short_description || current.short_description
      }, index + 1);
    });
  }

  generateCombinations({}, 0);

  return combinations.length === 0 ? [data] : combinations;
}, [colors, data, id, price, sale_price, availableQty, image, short_description]);

  const [selectedCombination, setSelectedCombination] = useState({
    ...data,
    variants: {},
    id: data.id
  });

  const getAvailableOptions = (type: string) => {
    if (Object.keys(selectedCombination.variants || {}).length === 0) {
      return [...new Set(colors
        .filter(v => getVariantTypeFromTitle(v.title) === type)
        .map(v => cleanVariantTitle(v.title)))];
    }

    return variantCombinations
      .filter(comb => {
        return Object.entries(selectedCombination.variants || {})
          .every(([t, val]) => t === type || comb.variants[t] === val);
      })
      .map(comb => comb.variants[type])
      .filter((v, i, arr) => arr.indexOf(v) === i);
  };

  const handleVariantSelect = (type: string, value: string) => {
    const newVariants = {
      ...selectedCombination.variants,
      [type]: value
    };

    const newCombination = variantCombinations.find(comb => 
      Object.entries(newVariants).every(([t, val]) => 
        comb.variants[t] === val
      )
    ) || {
      ...data,
      variants: newVariants,
      id: `${id}-${Object.values(newVariants).join('-')}`
    };

    setSelectedCombination(newCombination);
    setCartKey(prev => prev + 1);
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
    const colorVariant = selectedCombination.variants?.color;
    if (colorVariant) {
      const variant = colors.find(c => 
        cleanVariantTitle(c.title) === colorVariant
      );
      if (variant?.image) {
        const variantImg = getImageUrl(variant.image);
        if (variantImg) return variantImg;
      }
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

  const getCartData = () => {
    if (Object.keys(selectedCombination.variants || {}).length === 0) {
      return data;
    }
    return selectedCombination;
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

  const renderVariantBadge = () => {
    const variants = selectedCombination.variants || {};
    const parts = [];
    
    if (variants.size) parts.push(`Size: ${variants.size}`);
    if (variants.width) parts.push(`Width: ${variants.width}`);
    if (variants.height) parts.push(`Height: ${variants.height}`);
    if (variants.color) parts.push(`Color: ${variants.color}`);
    if (variants.length) parts.push(`length: ${variants.length}`);
    if (variants.weight) parts.push(`weight: ${variants.weight}`);
    if (variants.capacity) parts.push(`capacity: ${variants.capacity}`);
    if (variants.version) parts.push(`version: ${variants.version}`);
    if (variants.volume) parts.push(`volume: ${variants.volume}`);
    if (variants.material) parts.push(`material: ${variants.material}`);
    if (variants.voltage) parts.push(`voltage: ${variants.voltage}`);
    if (variants.pincount) parts.push(`pincount: ${variants.pincount}`);
    if (variants.current) parts.push(`current: ${variants.current}`);
    if (variants.power) parts.push(`power: ${variants.power}`);
    if (variants.resistance) parts.push(`resistance: ${variants.resistance }`);
    if (variants.frequency) parts.push(`frequency: ${variants.frequency }`);
    if (variants.sensitivity) parts.push(`sensitivity: ${variants.sensitivity }`);






    return parts.length === 0 ? 'Select Options' : parts.join(', ');
  };

  const getEffectivePrice = () => {
    if (selectedCombination.variants && Object.keys(selectedCombination.variants).length > 0) {
      return parseFloat(selectedCombination.sale_price?.toString() || selectedCombination.price?.toString() || '0');
    }
    return parseFloat(data.sale_price?.toString() || data.price?.toString() || '0');
  };

  const getEffectiveOriginalPrice = () => {
    if (selectedCombination.variants && Object.keys(selectedCombination.variants).length > 0) {
      return parseFloat(selectedCombination.price?.toString() || '0');
    }
    return parseFloat(data.price?.toString() || '0');
  };

  const getAvailableQty = () => {
    if (selectedCombination.variants && Object.keys(selectedCombination.variants).length > 0) {
      return selectedCombination.availableQty || 0;
    }
    return data.availableQty || 0;
  };

  const calculateDiscount = (original: number, sale: number) => {
    if (!original || !sale || original <= sale) return 0;
    return Math.round((1 - sale / original) * 100);
  };

  const availableVariantTypes = useMemo(() => {
    const types = new Set<string>();
    colors.forEach(variant => {
      const type = getVariantTypeFromTitle(variant.title);
      types.add(type);
    });
    return Array.from(types);
  }, [colors]);

  const isSelectionComplete = Object.keys(selectedCombination.variants || {}).length === 
    availableVariantTypes.length;

  const getVariantDescription = (type: string, value: string) => {
    const variant = colors.find(c => 
      getVariantTypeFromTitle(c.title) === type && 
      cleanVariantTitle(c.title) === value
    );
    
    if (!variant?.short_description) return null;
    
    return typeof variant.short_description === 'object' 
      ? variant.short_description.en || variant.short_description
      : variant.short_description;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (hasVariants && Object.keys(selectedCombination.variants || {}).length === 0) {
      setShowVariantDialog(true);
      return;
    }
  };

  const handleCloseModal = () => {
    setShowVariantDialog(false);
  };

  const handleCompleteSelection = () => {
    setShowVariantDialog(false);
  };

  return (
    <Card>
      {showVariantDialog && variantCombinations.length > 0 &&
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

              <ModalScrollWrapper>
              <ModalLeftColumn>
                <ProductPreview>
                   <ProductImageContainer>
          <Image
            src={displayImage.src}
            alt={title}
            layout="fill"
            objectFit="contain"
            unoptimized={true}
          />
        </ProductImageContainer>
                  <ProductTitle>{title}</ProductTitle>
                  
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
                </ProductPreview>

                {short_description && (
                  <div>
                    <SectionTitle>
                      <FormattedMessage id="productDetails" defaultMessage="Product Details" />
                    </SectionTitle>
                    <ProductDescription>
                      {typeof short_description === 'object' 
                        ? short_description.en || Object.values(short_description)[0] 
                        : short_description}
                    </ProductDescription>
                  </div>
                )}

              </ModalLeftColumn>
              </ModalScrollWrapper>

              <ModalRightColumn>
                {availableVariantTypes.map(type => {
                  const options = getAvailableOptions(type);
                  return options.length > 0 && (
                    <div key={type}>
                      <SectionTitle>
                        {type === 'color' ? (
                          <FormattedMessage id="selectColor" defaultMessage="Select Color" />
                        ) : type === 'size' ? (
                          <FormattedMessage id="selectSize" defaultMessage="Select Size" />
                        ) : (
                          <FormattedMessage 
                            id={`select${type.charAt(0).toUpperCase() + type.slice(1)}`} 
                            defaultMessage={`Select ${type.charAt(0).toUpperCase() + type.slice(1)}`} 
                          />
                        )}
                      </SectionTitle>
                      
                      {type === 'color' ? (
                        <ColorGrid>
                          {options.map(option => {
                            const variant = colors.find(c => 
                              getVariantTypeFromTitle(c.title) === type && 
                              cleanVariantTitle(c.title) === option
                            );
                            const isSelected = selectedCombination.variants?.[type] === option;
                            const isOutOfStock = variantCombinations.every(comb => 
                              comb.variants[type] === option && comb.availableQty === 0
                            );
                            const colorCode = variant?.color_code || getColorHexCode(option);
                            const description = variant?.short_description || '';


                    return (
                      <Tooltip 
                        key={option}
                        title={
                          <div>
                            <div style={{ fontWeight: 'bold' }}>{option}</div>
                            {description && (
                              <div style={{ marginTop: '0.3rem' }}>
                                {typeof description === 'object' 
                                  ? description.en || Object.values(description)[0]
                                  : description}
                              </div>
                            )}
                          </div>
                        }
                        arrow
                      >
                        <div style={{ position: 'relative' }}>
                          <ColorOption
                            color={colorCode}
                            selected={isSelected}
                            disabled={isOutOfStock}
                            onClick={() => !isOutOfStock && handleVariantSelect(type, option)}
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
                          </ColorOption>
                          {isSelected && (
                            <div style={{
                              position: 'absolute',
                              top: -5,
                              right: -5,
                              width: 20,
                              height: 20,
                              background: '#133595',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: 10,
                              fontWeight: 'bold'
                            }}>
                              ✓
                            </div>
                          )}
                          {isOutOfStock && (
                            <div style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              textAlign: 'center',
                              background: 'rgba(0,0,0,0.5)',
                              color: 'white',
                              fontSize: '10px',
                              padding: '2px'
                            }}>
                              Sold Out
                            </div>
                          )}
                        </div>
                      </Tooltip>
                    );
                  })}
                </ColorGrid>
              ) : (
                <SizeGrid>
                  {options.map(option => {
                    const variant = colors.find(c => 
                      getVariantTypeFromTitle(c.title) === type && 
                      cleanVariantTitle(c.title) === option
                    );
                    const isSelected = selectedCombination.variants?.[type] === option;
                    const isOutOfStock = variantCombinations.every(comb => 
                      comb.variants[type] === option && comb.availableQty === 0
                    );
                    const description = variant?.short_description || '';

                    return (
                      <Tooltip 
                        key={option}
                        title={
                          <div>
                            <div style={{ fontWeight: 'bold' }}>{option}</div>
                            {description && (
                              <div style={{ marginTop: '0.3rem' }}>
                                {typeof description === 'object' 
                                  ? description.en || Object.values(description)[0]
                                  : description}
                              </div>
                            )}
                          </div>
                        }
                        arrow
                      >
                        <SizeOption
                          selected={isSelected}
                          disabled={isOutOfStock}
                          onClick={() => !isOutOfStock && handleVariantSelect(type, option)}
                        >
                          {option}
                          {isOutOfStock && (
                            <div style={{
                              position: 'absolute',
                              bottom: 2,
                              left: 0,
                              right: 0,
                              textAlign: 'center',
                              color: '#ff4444',
                              fontSize: '10px'
                            }}>
                              X
                            </div>
                          )}
                        </SizeOption>
                      </Tooltip>
                    );
                  })}
                </SizeGrid>
              )}
            </div>
          );
        })}

                 <SelectedOptionsCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <SelectedVariantText>
              <strong>Your Selection:</strong> {renderVariantBadge() || 'No options selected'}
            </SelectedVariantText>
            <StockIndicator inStock={getAvailableQty() > 0}>
              {getAvailableQty() > 0 ? 'In Stock' : 'Out of Stock'}
            </StockIndicator>
          </div>
          
          {Object.entries(selectedCombination.variants || {}).map(([type, value]) => {
            const variant = colors.find(c => 
              getVariantTypeFromTitle(c.title) === type && 
              cleanVariantTitle(c.title) === value
            );
            const description = variant?.short_description;
            
            return description && (
              <VariantDescription key={type}>
                <strong>{type}:</strong> {typeof description === 'object' 
                  ? description.en || Object.values(description)[0]
                  : description}
              </VariantDescription>
            );
          })}
          
          <SelectedPrice style={{ marginTop: '1rem' }}>
            <MoneyFormat value={getEffectivePrice()} />
            {getEffectivePrice() < getEffectiveOriginalPrice() && (
              <OriginalSelectedPrice>
                <MoneyFormat value={getEffectiveOriginalPrice()} />
              </OriginalSelectedPrice>
            )}
          </SelectedPrice>
        </SelectedOptionsCard>

        <ActionButton 
          primary 
          onClick={handleCompleteSelection}
          disabled={!isSelectionComplete || getAvailableQty() <= 0}
        >
          {getAvailableQty() <= 0 ? 
            'Out of Stock' : 
            !isSelectionComplete ?
            'Please select options' :
            <>
              Add to Cart - <MoneyFormat value={getEffectivePrice()} />
            </>
          }
        </ActionButton>

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
  </ModalOverlay>
,
          document.getElementById('modal-root')!
        )as React.ReactNode)}
      

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
            {variantCombinations.length > 1 && (
              <VariantBadge
                onClick={(e) => {
                  e.preventDefault();
                  setShowVariantDialog(true);
                }}
              >
                <BadgeText>{renderVariantBadge()}</BadgeText>
              </VariantBadge>
            )}
          </Box>
        </a>
      </Link>

      <Box padding={20}>
        <Title>
          {title.substring(0,32) + (title.length > 32 ? '...' : '')}
        </Title>
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
                    variantCombinations.length > 1 ? (
                      <>
                        {Object.keys(selectedCombination.variants || {}).length > 0 ? (
                          <AddItemToCart 
                            key={`${id}-${cartKey}`}
                            data={getCartData()}
                            variant={'lightHorizontal'}
                          />
                        ) : (
                          <AddToCartButton onClick={handleAddToCart}>
                            <Box flexGrow={1}></Box>
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
                          </AddToCartButton>
                        )}
                      </>
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