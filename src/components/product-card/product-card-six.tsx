import React, { useState } from 'react';
import Link from 'next/link';
import { AddItemToCart } from 'components/add-item-to-cart';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from 'components/box';
import { RadioButtonChecked, Check, Close, ExpandMore } from '@mui/icons-material';
import MoneyFormat from "../money-format/money-format";
import { FormattedMessage } from "react-intl";
import Image from "next/image";
import LogoImage from 'assets/images/default/default.png';
import ReactDOM from 'react-dom';
import { variant as _variant } from 'styled-system';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';

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
  width: 100%;
  height: 325px;
  padding-bottom: 15px; 
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 210px;
  width: 100%;
  
  img {
    display: block;
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
  }
`;

const VariantSelectorOverlay = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  width: 40px;
  height: 210px;
  z-index: 2;
  display: flex;
  flex-direction: column;

  /* Tablet styles */
  @media (max-width: 1024px) {
    top: 40px;
    right: 8px;
    width: 40px;
    height: 210px;
  }
  @media (max-width: 958px) {
    width: 70px !important;
  }

  /* Mobile Landscape */
  @media (max-width: 768px) {
    top: 35px;
    right: 20px;
    width: 40px;
    height: 220px;
  }

  /* Mobile Portrait */
  @media (max-width: 480px) {
    top: 40px;
    right: 10px;
    width: 40px !important;
    height: 210px;
  }

  /* Small Mobile */
  @media (max-width: 360px) {
    top: 40px;
    right: 5px;
    width: 30px !important;
    height: 200px;
  }

  @media (max-width: 337px) {
    top: 40px;
    right: 5px;
    width: 30px;
    height: 180px !important;
  }

  /* Large Desktop */
  @media (min-width: 1440px) {
    top: 45px;
    right: 12px;
    width: 44px;
    height: 230px;
  }
  @media (max-width: 1645px) {
    top: 40px;
    right: 5px;
    width: 44px;
    height: 210px;
  }

  @media (max-width: 958px) and (min-width: 768px) {
    width: 50px;
    right: 10px;
  }

  /* Extra Large Desktop */
  @media (min-width: 1920px) {
    top: 50px;
    right: 15px;
    width: 48px;
    height: 200px;
  }
      @media (min-width: 1640px) {
    top: 40px;
    right: 7px;
    width: 48px;
    height: 210px;
  }
`;

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
  max-height: calc(90vh - 120px);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-right: none;
    border-bottom: 1px solid #f0f0f0;
    max-height: none;
    overflow-y: visible;
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
    max-height: none;
    overflow-y: visible;
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
  min-height: 250px;
  max-height: 350px;
  position: relative;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  
  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    transition: transform 0.3s ease;
  }
  
  @media (max-width: 768px) {
    max-height: 250px;
    min-height: 200px;
  }
`;

const ProductTitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  line-height: 1.3;
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

// Add a scrollable content area for the description
const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 5px;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  
  @media (max-width: 768px) {
    overflow-y: visible;
    padding-right: 0;
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
  flex-shrink: 0;
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

// Updated ColorOption with status badges for all states - ALL CLICKABLE IN MODAL
const ColorOption = styled.div<{ selected: boolean, status: string }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer; /* Always clickable in modal */
  opacity: ${props => props.status === 'available' ? 1 : 0.6};
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  border: 3px solid ${props => props.selected ? '#133595' : 'transparent'};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  }
  
  // Status badge indicator
  &::after {
    ${props => {
    switch(props.status) {
        case 'outOfStock':
            return `
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
            font-weight: bold;
            z-index: 2;
          `;
        case 'retired':
            return `
            content: "Retired";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            background: rgba(255, 165, 0, 0.8);
            color: white;
            font-size: 8px;
            padding: 2px 4px;
            border-radius: 3px;
            white-space: nowrap;
            font-weight: bold;
            z-index: 2;
          `;
        case 'notAvailable':
            return `
            content: "Not Available";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            background: rgba(128, 128, 128, 0.8);
            color: white;
            font-size: 7px;
            padding: 2px 3px;
            border-radius: 3px;
            white-space: nowrap;
            font-weight: bold;
            z-index: 2;
          `;
        default:
            return '';
    }
}}
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    
    &::after {
      ${props => {
    switch(props.status) {
        case 'outOfStock':
            return `font-size: 7px;`;
        case 'retired':
            return `font-size: 7px;`;
        case 'notAvailable':
            return `font-size: 6px; padding: 1px 2px;`;
        default:
            return '';
    }
}}
    }
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
`;

const VariantSelector = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const VariantGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  overflow-y: auto;
  padding-right: 2px;
  align-items: center;
  
  /* Enhanced scrollbar styling */
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  
  /* Hide scrollbar when not needed */
  &:not(:hover)::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

// Updated VariantOption with FULL BADGES for vertical selector - NO TOOLTIPS/HOVER EFFECTS
const VariantOption = styled.div<{ selected: boolean, status: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: ${props => props.status === 'available' ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.status === 'available' ? 1 : 0.5};
  position: relative;
  overflow: hidden;
  border: 2px solid ${props => props.selected ? '#133595' : 'transparent'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  flex-shrink: 0;

  ${props => props.status === 'available' && `
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    }
  `}

  // Full badges for vertical variant selector - NO HOVER TOOLTIPS
  &::after {
    ${props => {
    switch(props.status) {
        case 'outOfStock':
            return `
            content: "Out";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            background: rgba(255, 0, 0, 0.7);
            color: white;
            font-size: 6px;
            padding: 1px 2px;
            border-radius: 2px;
            white-space: nowrap;
            font-weight: bold;
            z-index: 2;
            line-height: 1;
          `;
        case 'retired':
            return `
            content: "Retired";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            background: rgba(255, 165, 0, 0.8);
            color: white;
            font-size: 5px;
            padding: 1px 2px;
            border-radius: 2px;
            white-space: nowrap;
            font-weight: bold;
            z-index: 2;
            line-height: 1;
          `;
        case 'notAvailable':
            return `
            content: "N/A";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            background: rgba(128, 128, 128, 0.8);
            color: white;
            font-size: 5px;
            padding: 1px 2px;
            border-radius: 2px;
            white-space: nowrap;
            font-weight: bold;
            z-index: 2;
            line-height: 1;
          `;
        default:
            return '';
    }
}}
  }

  /* Tablet */
  @media (max-width: 1024px) {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 958px) and (min-width: 768px) {
    width: 40px;
    height: 40px;
    
    &::after {
      ${props => {
    switch(props.status) {
        case 'outOfStock':
            return `font-size: 7px; padding: 2px 3px;`;
        case 'retired':
            return `font-size: 6px; padding: 2px 3px;`;
        case 'notAvailable':
            return `font-size: 6px; padding: 2px 3px;`;
        default:
            return '';
    }
}}
    }
  }

  /* Mobile Landscape */
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    &::after {
      ${props => {
    switch(props.status) {
        case 'outOfStock':
            return `font-size: 7px; padding: 2px 3px;`;
        case 'retired':
            return `font-size: 6px; padding: 2px 3px;`;
        case 'notAvailable':
            return `font-size: 6px; padding: 2px 3px;`;
        default:
            return '';
    }
}}
    }
  }

  /* Mobile Portrait */
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    border-width: 1.5px;
    
    &::after {
      ${props => {
    switch(props.status) {
        case 'outOfStock':
            return `font-size: 6px; padding: 1px 2px;`;
        case 'retired':
            return `font-size: 5px; padding: 1px 2px;`;
        case 'notAvailable':
            return `font-size: 5px; padding: 1px 2px;`;
        default:
            return '';
    }
}}
    }
  }

  /* Small Mobile */
  @media (max-width: 360px) {
    width: 22px;
    height: 22px;
    
    &::after {
      ${props => {
    switch(props.status) {
        case 'outOfStock':
            return `font-size: 5px; padding: 1px;`;
        case 'retired':
            return `font-size: 4px; padding: 1px;`;
        case 'notAvailable':
            return `font-size: 4px; padding: 1px;`;
        default:
            return '';
    }
}}
    }
  }

  /* Large Desktop */
  @media (min-width: 1440px) {
    width: 32px;
    height: 32px;
    
    &::after {
      ${props => {
    switch(props.status) {
        case 'outOfStock':
            return `font-size: 7px; padding: 1px 3px;`;
        case 'retired':
            return `font-size: 6px; padding: 1px 3px;`;
        case 'notAvailable':
            return `font-size: 6px; padding: 1px 3px;`;
        default:
            return '';
    }
}}
    }
  }

  /* Mobile Landscape */
  @media (max-width: 768px) and (min-width: 481px) {
    width: 50px;
    height: 50px;
    
    &::after {
      ${props => {
    switch(props.status) {
        case 'outOfStock':
            return `font-size: 8px; padding: 2px 4px;`;
        case 'retired':
            return `font-size: 7px; padding: 2px 4px;`;
        case 'notAvailable':
            return `font-size: 7px; padding: 2px 4px;`;
        default:
            return '';
    }
}}
    }
  }

  /* Extra Large Desktop */
  @media (min-width: 1920px) {
    width: 34px;
    height: 34px;
    
    &::after {
      ${props => {
    switch(props.status) {
        case 'outOfStock':
            return `font-size: 7px; padding: 1px 3px;`;
        case 'retired':
            return `font-size: 6px; padding: 1px 3px;`;
        case 'notAvailable':
            return `font-size: 6px; padding: 1px 3px;`;
        default:
            return '';
    }
}}
    }
  }
`;

const VariantImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: #f0f0f0;
  
  img {
    object-fit: cover;
  }
  
  /* Tablet */
  @media (max-width: 1024px) {
    width: 28px;
    height: 28px;
  }

  /* Mobile Landscape */
  @media (max-width: 768px) and (min-width: 481px) {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 958px) and (min-width: 768px) {
    width: 40px;
    height: 40px;
  }

  /* Mobile Portrait */
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    border-width: 1.5px;
  }

  /* Small Mobile */
  @media (max-width: 360px) {
    width: 22px;
    height: 22px;
  }

  /* Large Desktop */
  @media (min-width: 1440px) {
    width: 32px;
    height: 32px;
  }

  /* Extra Large Desktop */
  @media (min-width: 1920px) {
    width: 34px;
    height: 34px;
  }
`;

const SelectedIndicator = styled.div<{ selected: boolean }>`
  position: absolute;
  top: -1px;
  right: -1px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #133595;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3px;
  opacity: ${props => props.selected ? 1 : 0};
  transform: ${props => props.selected ? 'scale(1)' : 'scale(0)'};
  transition: all 0.2s ease;
  z-index: 3;

  /* Mobile adjustments */
  @media (max-width: 480px) {
    width: 5px;
    height: 5px;
    top: -1px;
    right: -1px;
  }

  /* Large screens */
  @media (min-width: 1440px) {
    width: 7px;
    height: 7px;
  }
`;

const ViewAllButton = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e0e0e0;
  flex-shrink: 0;
  margin: 4px auto 0 auto;

  &:hover {
    background: #e6eeff;
    color: #133595;
    border-color: #133595;
  }

  /* Hover label that appears above the button */
  &::after {
    content: 'Options';
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%) translateY(6px);
    background: #133595;
    color: #fff;
    padding: 6px 8px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.18s ease, transform 0.18s ease;
    box-shadow: 0 6px 18px rgba(19, 53, 149, 0.18);
    z-index: 10;
  }

  &:hover::after {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  /* Small caret (triangle) below the label, pointing down toward the button */
  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(6px);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #133595;
    opacity: 0;
    transition: opacity 0.18s ease, transform 0.18s ease;
    z-index: 11;
  }

  &:hover::before {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
    font-size: 7px;
    
    &::after {
      font-size: 11px;
      padding: 5px 7px;
    }
  }

  @media (max-width: 958px) {
    // Remove the left positioning for tablet
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    font-size: 6px;
    
    &::after {
      font-size: 10px;
      padding: 4px 6px;
    }
  }  
    
  @media (max-width: 337px) {
    width: 20px;
    height: 20px;
    font-size: 6px;
    
    &::after {
      font-size: 10px;
      padding: 4px 6px;
    }
  }

  @media (min-width: 1440px) {
    width: 28px;
    height: 28px;
    font-size: 9px;
  }
`;

type ProductCardProps = {
    data: any;
};

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

const ProductCardComponent: React.FC<ProductCardProps> = ({ data }) => {
    const classes = useStyles();

    const fallbackImageSrc = typeof LogoImage === 'string' ? LogoImage : LogoImage.src;

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

    const getImageUrl = (imgUrl: string | undefined) => {
        if (!imgUrl) return null;
        let cleanedUrl = imgUrl.replace(/\\/g, '');
        if (cleanedUrl.includes('storage/app/public')) {
            cleanedUrl = cleanedUrl.replace('storage/app/public', 'storage');
        }
        return {
            src: cleanedUrl,
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
            src: fallbackImageSrc,
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
    const stockColor = getAvailableQty() > 10 ? 'green' : (getAvailableQty() < 1 ? 'red' : 'orange');

    const getCartData = () => {
        if (!selectedVariant) return data;
        return {
            ...data,
            ...selectedVariant,
            baseProductId: selectedVariant.color_id,
            variantId: selectedVariant.color_id,
            id: selectedVariant.color_id || data.id,
            baseTitle: data.title,
            title: selectedVariant
                ? selectedVariant.name
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

    // MODIFIED: ALL variants are selectable in modal
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

    // Enhanced variant click handler - ONLY AVAILABLE VARIANTS CLICKABLE ON CARD
    const handleVariantClick = (variant: Variant, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const variantStatus = getVariantStatus(variant);
        // Only allow selection if variant is available (for card selector)
        if (variantStatus === 'available') {
            handleVariantChange(variant);
        }
    };

    // Helper function to check if variant is selectable
    const isVariantSelectable = (variant: Variant) => {
        const variantAvailable = variant.is_available !== undefined ? variant.is_available : true;
        const variantRetired = variant.is_retired !== undefined ? variant.is_retired : false;
        const variantStock = variant.availableQty || 0;

        return variantAvailable && !variantRetired && variantStock > 0;
    };

    // Helper function to get variant status with corrected priority: not available > retired > out of stock
    const getVariantStatus = (variant: Variant) => {
        const variantAvailable = variant.is_available !== undefined ? variant.is_available : true;
        const variantRetired = variant.is_retired !== undefined ? variant.is_retired : false;
        const variantStock = variant.availableQty || 0;

        // Corrected Priority: not available > retired > out of stock
        if (!variantAvailable) {
            return 'notAvailable';
        } else if (variantRetired) {
            return 'retired';
        } else if (variantStock === 0) {
            return 'outOfStock';
        } else {
            return 'available';
        }
    };

    // Check if product has variants (null/undefined check)
    const hasVariantsToShow = hasVariants && Array.isArray(colors) && colors.length > 0;

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
                                    width={300}
                                    height={200}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAICEgMRkf/aAAwDAQACEQMRAP8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    loading="lazy"
                                />
                            </ProductImageContainer>

                            <ProductTitle>{selectedVariant ? `${selectedVariant.name}` : title}</ProductTitle>

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

                            <ScrollableContent>
                                {short_description && (
                                    <div>
                                        <SectionTitle>
                                            <FormattedMessage id="productDetails" defaultMessage="Product Details" />
                                        </SectionTitle>
                                        <ProductDescription>
                                            <DescriptionLabel>Description:</DescriptionLabel>
                                            <div
                                                style={{ marginTop: '0.5rem' }}
                                                dangerouslySetInnerHTML={{
                                                    __html: typeof short_description === 'object'
                                                        ? short_description.en || Object.values(short_description)[0] || ''
                                                        : short_description || ''
                                                }}
                                            />
                                        </ProductDescription>
                                    </div>
                                )}
                            </ScrollableContent>
                        </ModalLeftColumn>

                        <ModalRightColumn>
                            <SectionTitle>
                                <FormattedMessage id="selectColor" defaultMessage="Select option" />
                            </SectionTitle>

                            <ColorGrid>
                                {colors.map((variant: Variant) => {
                                    const isSelected = selectedVariant?.id === variant.id;
                                    const variantStatus = getVariantStatus(variant);
                                    const colorCode = getColorHexCode(variant.title);
                                    const variantImage = variant.image ? getImageUrl(variant.image) : null;

                                    return (
                                        <div
                                            key={variant.id}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                textAlign: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <Tooltip
                                                title={
                                                    <div>
                                                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{variant.title}</div>
                                                        {(() => {
                                                            if (variantStatus === 'notAvailable') {
                                                                return <div style={{ color: '#757575', fontWeight: '500' }}>Not Available</div>;
                                                            } else if (variantStatus === 'retired') {
                                                                return <div style={{ color: '#ef6c00', fontWeight: '500' }}>Retired</div>;
                                                            } else if (variantStatus === 'outOfStock') {
                                                                return <div style={{ color: '#f44336', fontWeight: '500' }}>Out of Stock</div>;
                                                            } else {
                                                                return <div style={{ color: '#2e7d32', fontWeight: '500' }}>In Stock</div>;
                                                            }
                                                        })()}
                                                        {variant.short_description && (
                                                            <div
                                                                style={{ marginTop: '0.5rem' }}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: typeof variant.short_description === 'string'
                                                                        ? variant.short_description
                                                                        : variant.short_description.en || Object.values(variant.short_description)[0] || ''
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                }
                                                arrow
                                                classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
                                            >
                                                {/* MODIFIED: ALL VARIANTS ARE CLICKABLE IN MODAL - even retired, out of stock, not available */}
                                                <ColorOption
                                                    selected={isSelected}
                                                    status={variantStatus}
                                                    onClick={() => handleVariantChange(variant)}
                                                >
                                                    <ColorImage>
                                                        {variantImage ? (
                                                            <Image
                                                                src={variantImage.src}
                                                                alt={variant.title}
                                                                layout="fill"
                                                                placeholder="blur"
                                                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAICEgMRkf/aAAwDAQACEQMRAP8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                                                loading="lazy"
                                                                sizes="64px"
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
                                        <strong>Your Selection:</strong> {selectedVariant?.title || 'Please select an option'}
                                    </SelectedVariantText>
                                    {/* Show comprehensive status indicator when a variant is selected */}
                                    {selectedVariant ? (
                                        (() => {
                                            const variantStatus = getVariantStatus(selectedVariant);

                                            let statusText = 'In Stock';
                                            let statusColor = '#2e7d32';
                                            let bgColor = '#e8f5e9';

                                            if (variantStatus === 'notAvailable') {
                                                statusText = "Not Available";
                                                statusColor = '#757575';
                                                bgColor = '#f5f5f5';
                                            } else if (variantStatus === 'retired') {
                                                statusText = "Retired";
                                                statusColor = '#ef6c00';
                                                bgColor = '#fff3e0';
                                            } else if (variantStatus === 'outOfStock') {
                                                statusText = 'Out of Stock';
                                                statusColor = '#c62828';
                                                bgColor = '#ffebee';
                                            }

                                            return (
                                                <div style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.3rem',
                                                    fontSize: '0.85rem',
                                                    padding: '0.3rem 0.6rem',
                                                    borderRadius: '12px',
                                                    background: bgColor,
                                                    color: statusColor,
                                                    fontWeight: '500'
                                                }}>
                                                    <div style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        background: statusColor
                                                    }} />
                                                    {statusText}
                                                </div>
                                            );
                                        })()
                                    ) : (
                                        <span style={{
                                            color: '#133595',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            padding: '0.4rem 0.8rem',
                                            backgroundColor: '#f0f4ff',
                                            borderRadius: '8px',
                                            border: '1px solid #d1ddff',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.3rem'
                                        }}>
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                                      stroke="#133595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            Select option
                                        </span>
                                    )}
                                </div>

                                {selectedVariant?.short_description && (
                                    <VariantDescription
                                        dangerouslySetInnerHTML={{
                                            __html: typeof selectedVariant.short_description === 'string'
                                                ? selectedVariant.short_description
                                                : selectedVariant.short_description.en || Object.values(selectedVariant.short_description)[0] || ''
                                        }}
                                    />
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
                                disabled={!selectedVariant || getVariantStatus(selectedVariant) !== 'available'}
                            >
                                {!selectedVariant ? (
                                    'Please select option'
                                ) : (() => {
                                    const variantStatus = getVariantStatus(selectedVariant);

                                    if (variantStatus === 'notAvailable') {
                                        return "This product isn't available now";
                                    } else if (variantStatus === 'retired') {
                                        return "This product is retired now";
                                    } else if (variantStatus === 'outOfStock') {
                                        return 'Out of Stock';
                                    } else {
                                        return <>Select this option - <MoneyFormat value={getEffectivePrice()} /></>;
                                    }
                                })()}
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

            {/* Updated Vertical Variant Selector with FULL BADGES - NO TOOLTIPS/HOVER EFFECTS */}
            {hasVariants && Array.isArray(colors) && colors.length > 0 ? (
                <VariantSelectorOverlay>
                    <VariantSelector>
                        <VariantGrid>
                            {colors.map((variant: Variant) => {
                                const isSelected = selectedVariant?.id === variant.id;
                                const variantStatus = getVariantStatus(variant);
                                const variantImage = variant.image ? getImageUrl(variant.image) : null;
                                const colorCode = getColorHexCode(variant.title);

                                return (
                                    // REMOVED: Tooltip wrapper from vertical variant selector
                                    <VariantOption
                                        key={variant.id}
                                        selected={isSelected}
                                        status={variantStatus}
                                        onClick={(e) => handleVariantClick(variant, e)}
                                    >
                                        <VariantImage>
                                            {variantImage ? (
                                                <div style={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '100%',
                                                }}>
                                                    <Image
                                                        src={variantImage.src}
                                                        alt={variant.title}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        loading="lazy"
                                                        sizes="34px"
                                                    />
                                                </div>
                                            ) : (
                                                <div style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor: colorCode,
                                                    borderRadius: '50%',
                                                }} />
                                            )}
                                        </VariantImage>
                                        <SelectedIndicator selected={isSelected}>
                                            <Check style={{ fontSize: 3 }} />
                                        </SelectedIndicator>
                                    </VariantOption>
                                );
                            })}
                        </VariantGrid>
                        <ViewAllButton
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setShowVariantDialog(true);
                            }}
                        >
                            <ExpandMore style={{ fontSize: 10 }} />
                        </ViewAllButton>
                    </VariantSelector>
                </VariantSelectorOverlay>
            ) : null}

            <Link href="/product/[slug]" as={`/product/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ImageWrapper>
                    <Image
                        src={displayImage.src}
                        alt={title}
                        width={200}
                        height={200}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAICEgMRkf/aAAwDAQACEQMRAP8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        loading="lazy"
                        onError={(event) => {
                            const target = event.currentTarget;
                            target.src = fallbackImageSrc;
                            target.onerror = null;
                        }}
                        loader={({ src, width }) => src}
                    />
                    {(!hasVariantsToShow || selectedVariant) && (
                        <Stock>
                            <RadioButtonChecked style={{width: 16, color: stockColor }} />
                        </Stock>
                    )}
                    {getEffectivePrice() < getEffectiveOriginalPrice() && (
                        <Discount>On Sale</Discount>
                    )}
                </ImageWrapper>
            </Link>

            <Box padding={20}>
                <Title>
                    {title.substring(0,32) + (title.length > 32 ? '...' : '')}
                </Title>

                {/* Updated Price and Add to Cart Logic with Corrected Priority Order */}
                {hasVariantsToShow ? (
                    <PriceWrapper>
                        {selectedVariant ? (
                            // For selected variant, check its specific status with corrected priority
                            (() => {
                                const variantStatus = getVariantStatus(selectedVariant);

                                if (variantStatus === 'notAvailable') {
                                    // Don't show price for not available variants
                                    return <FormattedMessage id='available' defaultMessage="This product isn't available now" />;
                                } else if (variantStatus === 'retired') {
                                    // Don't show price for retired variants
                                    return <FormattedMessage id='retired' defaultMessage="This product is retired now" />;
                                } else if (variantStatus === 'outOfStock') {
                                    // Show price but indicate out of stock
                                    return (
                                        <>
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
                                                <FormattedMessage id='outOfStock' defaultMessage='Out Of Stock' />
                                            </CounterWrapper>
                                        </>
                                    );
                                } else {
                                    // Show price and add to cart for available variants
                                    return (
                                        <>
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
                                                <AddItemToCart
                                                    key={`${id}-${cartKey}`}
                                                    data={getCartData()}
                                                    variant={'lightHorizontal'}
                                                />
                                            </CounterWrapper>
                                        </>
                                    );
                                }
                            })()
                        ) : (
                            // No variant selected yet - show base price and add to cart button to open modal
                            <>
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
                                </CounterWrapper>
                            </>
                        )}
                    </PriceWrapper>
                ) : (
                    /* For products without variants - check base product status with same corrected priority */
                    (() => {
                        // Apply same corrected priority for base product: not available > retired > out of stock
                        if (!is_available) {
                            return <FormattedMessage id='available' defaultMessage="This product isn't available now" />;
                        } else if (is_retired) {
                            return <FormattedMessage id='retired' defaultMessage="This product is retired now" />;
                        } else if (getAvailableQty() === 0) {
                            // Show price but indicate out of stock
                            return (
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
                                        <FormattedMessage id='outOfStock' defaultMessage='Out Of Stock' />
                                    </CounterWrapper>
                                </PriceWrapper>
                            );
                        } else {
                            // Show price and add to cart for available products
                            return (
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
                                        <AddItemToCart
                                            data={data}
                                            variant={'lightHorizontal'}
                                        />
                                    </CounterWrapper>
                                </PriceWrapper>
                            );
                        }
                    })()
                )}
            </Box>
        </Card>
    );
};

const ProductCard = React.memo(ProductCardComponent);
ProductCard.displayName = 'ProductCardSix';

export { ProductCard };
export default ProductCard;