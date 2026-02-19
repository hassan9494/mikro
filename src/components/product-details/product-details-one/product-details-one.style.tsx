import styled from 'styled-components';
import {themeGet} from '@styled-system/theme-get';

export const ProductDetailsWrapper = styled.div`
  background-color: ${themeGet('colors.white', '#ffffff')};
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  box-sizing: border-box;
  margin: 30px 15px;
  border-radius: 5px;
  * {
    box-sizing: border-box;
  }
  @media (min-width: 991px) {
    margin: 30px 50px;
  }
`;

export const ProductPreview = styled.div`
  width: 45%;
  padding:0 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    display: block;
    max-width: 100%;
    max-height: 450px;
    height: auto;
  }

  @media (max-width: 990px) {
    padding: 1px 40px 60px;
  }
  @media (max-width: 767px) {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 1px 25px 60px;
    order: 0;
  }
`;

export const BackButton = styled.div`
  position: absolute;
  top: 60px;
  left: 60px;
  z-index: 99;

  @media (max-width: 990px) {
    top: 20px;
    left: 25px;
  }
  .reusecore__button {
    font-family: ${themeGet('fonts.body', 'sans-serif')};
    font-size: ${themeGet('fontSizes.sm', '13')}px;
    font-weight: ${themeGet('fontWeights.bold', '700')};
    color: ${themeGet('colors.text.regular', '#77798C')};
    height: 30px;
    .btn-icon {
      margin-right: 5px;
    }
    .btn-text {
      padding: 0;
    }
  }
`;

export const ProductInfo = styled.div`
  width: 50%;
  border-left: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};
  padding: 55px 60px;

  @media (max-width: 990px) {
    padding: 30px 40px;
  }
  @media (max-width: 767px) {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 30px 25px;
    border: 0;
    //order: 1;
  }
`;

export const SaleTag = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${themeGet('colors.white', '#ffffff')};
  background-color: ${themeGet('colors.yellow.alternate', '#f4c243')};
  padding: 0 10px;
  line-height: 24px;
  border-radius: ${themeGet('radii.medium', '12px')};
  display: inline-block;
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const DiscountPercent = styled.span`
  font-size: ${themeGet('fontSizes.xs', '12')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.white', '#ffffff')};
  line-height: 24px;
  background-color: ${themeGet('colors.secondary.regular', '#ff5b60')};
  padding-left: 20px;
  padding-right: 15px;
  position: relative;
  display: inline-block;
  position: absolute;
  bottom: 180px;
  right: -60px;
  -webkit-transform: translate3d(0, 0, 1px);
  transform: translate3d(0, 0, 1px);

  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 8px 12px 0;
    border-color: transparent ${themeGet('colors.secondary.regular', '#ff5b60')}
      transparent transparent;
  }

  &:after {
    content: '';
    position: absolute;
    left: -8px;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 12px 8px;
    border-color: transparent transparent
      ${themeGet('colors.secondary.regular', '#ff5b60')} transparent;
  }
`;

export const ProductTitlePriceWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

export const ProductTitle = styled.h1`
  font-family: ${themeGet('fonts.heading', 'sans-serif')};
  font-size: ${themeGet('fontSizes.lg', '21')}px;
  font-weight: ${themeGet('fontWeights.semiBold', '600')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  line-height: 1.5;
  display: flex;

  @media (max-width: 767px) {
    word-break: break-word;
  }
`;

export const ProductPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  //margin-top: 25px;
  //margin-right: 25px;
  //margin-left: 25px;
  line-height: 31px;
  //@media (max-width: 767px) {
  //  margin-left: 15px;
  //}
`;

export const ProductPrice = styled.div`
  font-family: ${themeGet('fonts.body', 'sans-serif')};
  //font-size: calc(${themeGet('fontSizes.base', '15')}px + 1px);
  font-size: 30px;
  font-weight: ${themeGet('fontWeights.bold', '300')};
  color: ${themeGet('colors.primary.regular', '#009E7F')};
`;

export const SalePrice = styled.span`
  font-family: ${themeGet('fonts.body', 'sans-serif')};
  font-size: 19px;
  // font-size: ${themeGet('fontSizes.md', '13')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.medium', '#FFAD5E')};
  //font-style: italic;
  padding: 0 5px;
  overflow: hidden;
  position: relative;
  margin-right: 10px;

  &:before {
    content: '';
    width: 100%;
    height: 1px;
    display: inline-block;
    background-color: ${themeGet('colors.yellow.regular', '#FFAD5E')};
    position: absolute;
    top: 50%;
    left: 0;
  }
`;

export const ProductWeight = styled.div`
  font-family: ${themeGet('fonts.body', 'sans-serif')};
  font-size: ${themeGet('fontSizes.sm', '13')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.regular', '#77798C')};
`;

export const ProductDescription = styled.p`
  font-family: ${themeGet('fonts.body', 'sans-serif')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.medium', '#424561')};
  line-height: 2;
  margin-top: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 20px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.16);
  }
`;

export const ColorsContainer = styled.div`
  font-family: ${themeGet('fonts.body', 'sans-serif')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.regular', '400')};
  color: ${themeGet('colors.text.medium', '#424561')};
  line-height: 2;
  margin-top: 30px;
  display:flex;
  justify-content: flex-start;
`;

export const ColorBadge = styled.div`
   z-index: 1;
   top: 10px;
   right: 10px;
   background-color: rgba(19,53,149);
   color: #fff;
   overflow: hidden;
   padding: 0.25rem 1rem;
   font-size: 14px;
   border-radius: 6px;
   pointer-events: none;
   margin:10px;
`;
export const RichTextContent = styled.div`
  ul, ol {
    margin-left: 20px;  /* or 1.5em for relative sizing */
    padding-left: 20px;
  }
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
  li {
    list-style: inherit;
    margin-bottom: 5px;
  }
`;
export const ProductCartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  @media (max-width: 767px) {
    margin-top: 20px;
  }
`;

export const ProductCartBtn = styled.div`
  .cart-button {
    border-radius: 20px;
    padding-left: 20px;
    padding-right: 20px;

    .btn-icon {
      margin-right: 5px;

      svg {
        width: 14px;
        height: auto;
        @media (max-width: 990px) {
          width: 14px;
        }
      }
    }
  }
  .quantity {
    width: 115px;
    height: 38px;
  }
`;

export const ButtonText = styled.span`
  @media (max-width: 767px) {
    display: none;
  }
`;

export const ProductMeta = styled.div`
  margin-top: 30px;

  @media (max-width: 767px) {
    margin-top: 30px;
  }
`;

export const MetaSingle = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
`;

export const ReplacementWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
`;

export const MetaItem = styled.span`
  font-family: ${themeGet('fonts.body', 'sans-serif')};
  font-size: ${themeGet('fontSizes.sm', '13')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${themeGet('colors.gray.200', '#f7f7f7')};
  padding: 0 15px;
  border-radius: ${themeGet('radii.base', '6px')};
  cursor: pointer;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RelatedItems = styled.div`
  margin-left: 55px;
  margin-right: 55px;

  @media (max-width: 990px) {
    margin-top: 50px;
    margin-left: 15px;
    margin-right: 15px;
  }
  > h2 {
    font-family: ${themeGet('fonts.heading', 'sans-serif')};
    font-size: ${themeGet('fontSizes.lg', '21')}px;
    font-weight: ${themeGet('fontWeights.semiBold', '600')};
    color: ${themeGet('colors.text.bold', '#0D1136')};
    line-height: 1.2;
    margin-bottom: 30px;
    @media (max-width: 767px) {
      margin-left: 0;
      margin-bottom: 25px;
    }
  }

  > div > div {
    flex: 0 0 20%;
    max-width: 20%;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;

    @media (max-width: 1500px) {
      flex: 0 0 20%;
      max-width: 20%;
    }
    @media (max-width: 1400px) {
      flex: 0 0 25%;
      max-width: 25%;
    }
    @media (max-width: 1060px) {
      flex: 0 0 33.3333333%;
      max-width: 33.3333333%;
    }
    @media (max-width: 1199px) and (min-width: 991px) {
      padding-left: 10px;
      padding-right: 10px;
    }
    @media (max-width: 768px) {
      padding-left: 7.5px;
      padding-right: 7.5px;
      margin-bottom: 15px;
    }
    @media (max-width: 767px) {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
`;

// Add these styles to your product-details-one.style.js file
export const VariantSelector = styled.div`
  margin-bottom: 15px;
  padding: 10px 0;
`;

export const VariantChip = styled.div.attrs(props => ({
      'data-selected': props['data-selected'],
      'data-outofstock': props['data-outofstock']
}))`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: 2px solid ${props => props['data-selected'] === 'true' ? '#1976d2' : '#e0e0e0'};
  border-radius: 8px;
  cursor: ${props => props['data-outofstock'] === 'true' ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  background: ${props => {
      if (props['data-selected'] === 'true') return '#e3f2fd';
      if (props['data-outofstock'] === 'true') return '#f5f5f5';
      return 'white';
}};
  min-width: 60px;
  max-width: 70px;
  height: 60px;
  box-shadow: ${props => props['data-selected'] === 'true' ? '0 4px 8px rgba(25, 118, 210, 0.2)' : '0 2px 4px rgba(0,0,0,0.05)'};
  
  &:hover {
    border-color: ${props => props['data-outofstock'] === 'true' ? '#e0e0e0' : '#1976d2'};
    transform: ${props => props['data-outofstock'] === 'true' ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props['data-outofstock'] === 'true' ? '0 2px 4px rgba(0,0,0,0.05)' : '0 4px 12px rgba(25, 118, 210, 0.3)'};
  }
  
  span {
    margin-top: 4px;
    font-size: 10px;
    font-weight: ${props => props['data-selected'] === 'true' ? '600' : '400'};
    color: ${props => {
      if (props['data-outofstock'] === 'true') return '#9e9e9e';
      return props['data-selected'] === 'true' ? '#1976d2' : '#333';
}};
    text-align: center;
    line-height: 1.2;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const VariantImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 4px;
  opacity: ${props => props['data-outofstock'] === 'true' ? 0.5 : 1};
  filter: ${props => props['data-outofstock'] === 'true' ? 'grayscale(80%)' : 'none'};
`;

export const SelectedVariantIndicator = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #1976d2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 1;
`;

export const OutOfStockOverlay = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  transform: translate(-50%, -50%) rotate(-45deg);
  background: rgba(245, 0, 0, 0.5);
  color: white;
  font-size: 7px;
  font-weight: bold;
  padding: 1px 2px;
  border-radius: 2px;
  white-space: nowrap;
  z-index: 2;
`;
