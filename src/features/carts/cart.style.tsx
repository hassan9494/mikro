import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const CartPopupBody = styled.div`
  height: 100%;
  width: 385px;
  display: flex;
  flex-direction: column;
  border-radius: ${themeGet('radii.base', '6px')};
  background-color: ${themeGet('colors.white', '#ffffff')};
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  
  /* Make cart take full height */
  flex: 1;
  min-height: 0; /* Important for flex children */

  height: 100vh;        /* ✅ FIXED height */
  max-height: 100vh;    /* lock it */

  .cart-scrollbar {
    flex: 1;
    overflow-x: hidden;
    min-height: 0; /* Important for flex children */
    
    /* Modern Thin Scrollbar */
    &::-webkit-scrollbar {
      width: 3px;
    }
    
    &::-webkit-scrollbar-track {
      background: ${themeGet('colors.gray.100', '#f5f5f5')};
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${themeGet('colors.gray.400', '#bdbdbd')};
      border-radius: 4px;
      transition: background 0.2s ease;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: ${themeGet('colors.gray.500', '#9e9e9e')};
    }
    
    /* For Firefox - Modern Thin */
    scrollbar-width: thin;
    // scrollbar-color: ${themeGet('colors.gray.400', '#bdbdbd')} ${themeGet('colors.gray.100', '#f5f5f5')};
  }
`;

const PopupHeader = styled.div`
  padding: 20px 25px;
  background-color: ${themeGet('colors.white', '#ffffff')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};
  flex-shrink: 0; /* Prevent header from shrinking */

  @media (max-width: 766px) {
    justify-content: center;
  }
`;

const PopupItemCount = styled.div`
  display: inline-flex;
  align-items: center;
  color: ${themeGet('colors.primary.regular', '#009e7f')};

  span {
    font-family: ${themeGet('fonts.body', 'Lato')};
    font-size: ${themeGet('fontSizes.base', '15')}px;
    font-weight: ${themeGet('fontWeights.bold', '700')};
    color: ${themeGet('colors.primary.regular', '#009e7f')};
    padding-left: 10px;

    @media (max-width: 767px) {
      font-size: ${themeGet('fontSizes.sm', '13')}px;
    }
  }
`;

const CloseButton = styled.button`
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  outline: 0;
  flex-shrink: 0;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);
  transition: all 0.4s ease;
  background-color: transparent;

  &:hover {
    color: ${themeGet('colors.red', '#ea4d4a')};
  }

  @media (max-width: 767px) {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: ${themeGet('colors.white', '#ffffff')};
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &.fixedCartClose {
    @media (min-width: 991px) {
      display: none;
    }
  }
`;

const ItemWrapper = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Modern Thin Scrollbar */
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${themeGet('colors.gray.100', '#f5f5f5')};
    border-radius: 4px;
    margin: 4px 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${themeGet('colors.gray.400', '#bdbdbd')};
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${themeGet('colors.gray.500', '#9e9e9e')};
  }
  
  /* For Firefox - Modern Thin */
  // scrollbar-width: thin;
  // scrollbar-color: ${themeGet('colors.gray.400', '#bdbdbd')} ${themeGet('colors.gray.100', '#f5f5f5')};
`;

const ItemCards = styled.div`
  width: 100%;
  padding: 15px 25px;
  display: inline-flex;
  align-items: center;
  background-color: ${themeGet('colors.white', '#ffffff')};
  margin-bottom: 1px;
  box-sizing: border-box;
`;

const ItemImgWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-right: 15px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemDetails = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
`;

const ItemTitle = styled.span`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  margin-bottom: 10px;
`;

const ItemPrice = styled.span`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.primary.regular', '#009e7f')};
  margin-bottom: 10px;
`;

const ItemWeight = styled.span`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.sm', '13')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.regular', '#77798c')};
`;

const TotalPrice = styled.span`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  flex-shrink: 0;
  margin-left: auto;
`;

const DeleteButton = styled.button`
  width: 10px;
  height: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  outline: 0;
  margin-left: 15px;
  flex-shrink: 0;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);
  transition: all 0.4s ease;
  background-color: transparent;

  &:hover {
    color: #ea4d4a;
  }
`;

const PromoCode = styled.span`
  margin: 20px 0;
  display: flex;
  justify-content: center;

  > button {
    border: 0;
    outline: 0;
    box-shadow: none;
    background-color: transparent;
    display: inline-flex;
    cursor: pointer;
    font-family: ${themeGet('fonts.body', 'Lato')};
    font-size: ${themeGet('fontSizes.base', '15')}px;
    font-weight: ${themeGet('fontWeights.bold', '700')};
    color: ${themeGet('colors.primary.regular', '#009e7f')};
    transition: color 0.35s ease;
    &:hover {
      color: ${themeGet('colors.primary.hover', '#019376')};
    }
  }
`;

const CheckoutButton = styled.button`
  height: 48px;
  width: calc(100% - 30px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${themeGet('colors.primary.regular', '#009e7f')};
  padding: 0;
  border-radius: 48px;
  box-shadow: ${themeGet('shadows.base', '0 3px 6px rgba(0, 0, 0, 0.16)')};
  border: 0;
  outline: 0;
  cursor: pointer;
  margin-bottom: 15px;
  margin-left: 15px;

  @media (max-width: 767px) {
    height: 45px;
  }

  > a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 30px;
  }
`;

const CheckoutButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  // margin-top: auto;
  height: fit-content;
  overflow: hidden;
  
  /* Fixed at bottom */
  position: sticky;
  bottom: 0;
  background-color: ${themeGet('colors.white', '#ffffff')};
  // padding: 15px 0;
  border-top: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};
  z-index: 1;
  flex-shrink: 0; /* Prevent from shrinking */
`;

const Title = styled.a`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.white', '#ffffff')};
  padding-left: 5px;
  padding-right: 10px;
`;

const PriceBox = styled.span`
  width: auto;
  height: 44px;
  padding: 0 30px;
  overflow: hidden;
  border-radius: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeGet('colors.white', '#ffffff')};
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.primary.regular', '#009e7f')};
  margin-right: 2px;

  @media (max-width: 767px) {
    height: 41px;
  }
`;

const NoProductMsg = styled.span`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.text.regular', '#77798c')};
  display: block;
  width: 100%;
  padding: 40px 0;
  text-align: center;
`;

export const NoProductImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 50px;

  @media (max-width: 580px) {
    margin-top: 20px;
  }

  svg {
    width: 140px;
    height: auto;

    @media (max-width: 580px) {
      width: 110px;
    }
  }
`;

const CouponBoxWrapper = styled.div`
  width: 100%;
  padding: 0 15px;
  flex-direction: column;
  padding-right: 22px;
  overflow: hidden;
`;

const CouponCode = styled.p`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.medium', '500')};
  color: ${themeGet('colors.text.regular', '#77798c')};
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;

  span {
    font-weight: ${themeGet('fontWeights.bold', '700')};
    color: ${themeGet('colors.primary.regular', '#009e7f')};
    margin-left: 5px;
  }
`;

const ErrorMsg = styled.span`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: calc(${themeGet('fontSizes.base', '15')}px - 1px);
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.secondary.hover', '#FF282F')};
  padding-top: 10px;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const CartSlidePopup = styled.div`
  position: fixed;
  z-index: 99999;
  display: flex;
  flex-direction: column;

  overflow: hidden;   /* 🔒 NEVER SCROLL */
  height: 100%;

  opacity: 0;
  visibility: hidden;
  transition: all 0.35s ease-in-out;

  &.cartPopupFixed {
    opacity: 1;
    visibility: visible;
  }

  /* Desktop */
  @media (min-width: 581px) {
    width: 420px;
    height: 100vh;     /* 🔒 LOCK HEIGHT */
    top: 0;
    right: -420px;

    &.cartPopupFixed {
      right: 0;
    }
  }

  /* Mobile */
  @media (max-width: 580px) {
    width: 100%;
    height: 70vh;      /* 🔒 LOCK HEIGHT */
    bottom: -70vh;
    left: 0;
    border-radius: 20px 20px 0 0;

    &.cartPopupFixed {
      bottom: 0;
    }
  }

  ${CartPopupBody} {
    // height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  ${ItemWrapper} {
    flex: 1;
    overflow-y: auto;
    background-color: ${themeGet('colors.white', '#ffffff')};
    padding-bottom: 10px;
  }

  ${ItemCards} {
    border-bottom: 1px solid ${themeGet('colors.gray.200', '#f7f7f7')};
    margin-bottom: 0;
  }

  /* Mobile-specific header styling */
  @media (max-width: 580px) {
    ${PopupHeader} {
      padding: 20px 25px 15px;
      position: relative;
      
      /* Add drag handle for mobile bottom sheet */
      &::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 4px;
        background-color: ${themeGet('colors.gray.400', '#cccccc')};
        border-radius: 2px;
      }
    }
    
    ${CloseButton} {
      top: 15px;
      right: 15px;
      position: absolute;
      background-color: ${themeGet('colors.white', '#ffffff')};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      color: rgba(0, 0, 0, 0.5);
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
  }

  /* Desktop-specific styling */
  @media (min-width: 581px) {
    ${CloseButton} {
      @media (max-width: 767px) {
        top: 15px;
        right: 15px;
        position: absolute;
        background-color: ${themeGet('colors.white', '#ffffff')};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: rgba(0, 0, 0, 0.5);
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      }
    }
  }
`;

export {
    CartSlidePopup,
    CartPopupBody,
    PopupHeader,
    PopupItemCount,
    PromoCode,
    CloseButton,
    ItemCards,
    ItemImgWrapper,
    ItemDetails,
    ItemTitle,
    ItemPrice,
    ItemWeight,
    TotalPrice,
    DeleteButton,
    CheckoutButton,
    CheckoutButtonWrapper,
    Title,
    PriceBox,
    NoProductMsg,
    ItemWrapper,
    CouponBoxWrapper,
    CouponCode,
    ErrorMsg,
};