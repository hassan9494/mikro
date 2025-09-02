import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const ProductsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  background-color: ${themeGet('colors.gray.200', '#f7f7f7')};
  position: relative;
  z-index: 1;
  margin: 0 -15px;
  @media (max-width: 990px) {
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0;
    background-color: ${themeGet('colors.white', '#ffffff')};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const NoResult = styled.div`
  width: 100%;
  padding: 100px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.lg', '21')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

export const LoaderItem = styled.div`
  width: 25%;
  padding: 0 15px;
  margin-bottom: 30px;

  svg {
    width: 100%;
  }
`;

export const ProductCardWrapper = styled.div`
  height: 100%;
  > div {
    height: 100%;
  }
`;

export const ProductsCol = styled.div`
  flex: 0 0 20%;
  max-width: 20%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;
  .book-card {
    border-radius: 0;
  }
  &.food-col {
    flex: 0 0 25%;
    max-width: 25%;
  }
  @media (min-width: 1501px) {
    &:nth-child(5n + 1) {
      .book-card {
        border-radius: 6px 0 0 6px;
      }
    }
    &:nth-child(5n) {
      .book-card {
        border-radius: 0 6px 6px 0;
      }
    }
  }
  @media (min-width: 1301px) and (max-width: 1500px) {
    flex: 0 0 25%;
    max-width: 25%;
    &.food-col {
      flex: 0 0 33.333%;
      max-width: 33.333%;
    }
    &:nth-child(4n + 1) {
      .book-card {
        border-radius: 6px 0 0 6px;
      }
    }
    &:nth-child(4n) {
      .book-card {
        border-radius: 0 6px 6px 0;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1300px) {
    flex: 0 0 33.3333333%;
    max-width: 33.3333333%;
    &.food-col {
      flex: 0 0 33.3333333%;
      max-width: 33.3333333%;
      padding-left: 7.5px;
      padding-right: 7.5px;
      margin-bottom: 15px;
      border: 0;

      ${ProductCardWrapper} {
        border: 1px solid #f1f1f1;
      }
    }
    &:nth-child(3n + 1) {
      .book-card {
        border-radius: 6px 0 0 6px;
      }
    }
    &:nth-child(3n) {
      .book-card {
        border-radius: 0 6px 6px 0;
      }
    }
  }
  @media (max-width: 1199px) and (min-width: 991px) {
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
    &.food-col {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
  @media (max-width: 990px) {
    padding-left: 0;
    padding-right: 0;
    margin-bottom: -1px;
    margin-right: -1px;
    border: 1px solid #f1f1f1;
  }

  @media (max-width: 767px) {
    flex: 0 0 50%;
    max-width: 50%;
    &.food-col {
      flex: 0 0 50%;
      max-width: 50%;
    }
    &:nth-child(2n + 1) {
      .book-card {
        border-radius: 6px 0 0 6px;
      }
    }
    &:nth-child(2n) {
      .book-card {
        border-radius: 0 6px 6px 0;
      }
    }
  }
`;

export const MedicineCol = styled.div`
  flex: 0 0 30%;
  max-width: 20%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;
  @media (max-width: 1300px) {
    flex: 0 0 25%;
    max-width: 25%;
    padding-left: 10px;
    padding-right: 10px;
  }
  @media (max-width: 1099px) and (min-width: 1025px) {
    flex: 0 0 33.333%;
    max-width: 33.333%;
  }
  @media (max-width: 767px) {
    flex: 0 0 33.333%;
    max-width: 33.333%;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 30px;
  }
  @media (max-width: 560px) {
    flex: 0 0 50%;
    max-width: 50%;
    padding-left: 7.5px;
    padding-right: 7.5px;
    margin-bottom: 20px;
  }
`;

export const SliderStyles = styled.div`
  position: relative;
  
  .slider-container {
    width: 100%;
    max-width: 100vw;
    overflow: visible;
    padding: 40px 0;
    background-color: #f7f7f7;
  }

  .slider-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 60px;
    position: relative;
  }

  .slider-title {
    margin-bottom: 30px;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    color: #0D1136;
  }

  .slick-slider {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
  }

  .slick-list {
    overflow: hidden;
    padding: 20px 0;
    margin: 0 auto;
  }

  .slide-item {
    padding: 0 10px;
    transition: all 0.3s ease;
    display: flex !important;
    justify-content: center;
  }

  .product-card-wrapper {
    margin: 0 auto;
    max-width: 280px;
    width: 100%;
  }

  /* Centered Arrow Styles */
  .slick-arrow {
    width: 50px;
    height: 50px;
    z-index: 100;
    // background: rgba(255,255,255,0.9);
    border-radius: 50%;
    // box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    display: flex !important;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
    
    &:before {
      font-family: 'slick';
      font-size: 24px;
      color: #fe5e00;
      opacity: 1;
      position: relative;
      top: -1px;
    }
    
    &:hover {
      background: white;
      &:before {
        color: #d94b00;
      }
    }
  }

  .slick-prev {
    left: 10px;
    
    &:before {
      content: '←';
    }
  }

  .slick-next {
    right: 10px;
    
    &:before {
      content: '→';
    }
  }

  /* Dots Styles */
  .slick-dots {
    bottom: 10px;
    position: relative;
    padding-top: 20px;
    display: flex !important;
    justify-content: center;
    align-items: center;
    
    li {
      margin: 0 5px;
      width: 12px;
      height: 12px;
      
      button {
        width: 12px;
        height: 12px;
        padding: 0;
        
        &:before {
          content: '';
          width: 12px;
          height: 12px;
          background: #ccc;
          border-radius: 50%;
          opacity: 1;
          transition: all 0.3s ease;
        }
      }
      
      &.slick-active {
        button:before {
          background: #fe5e00;
          width: 14px;
          height: 14px;
          margin-left: -1px;
          margin-top: -1px;
        }
      }
    }
  }

  .show-more-container {
    text-align: center;
    margin-top: 40px;
  }

  .show-more-button {
    padding: 15px 50px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 6px;
    background-color: #009E7F;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #008a6d;
    }
  }

  /* Responsive Adjustments */
  @media (max-width: 1199px) {
    .slick-arrow {
      width: 50px;
      height: 50px;
      
      &:before {
        font-size: 20px;
      }
    }
  }

  @media (max-width: 1024px) {
    .slick-arrow {
      // display: none !important;
    }
    
    .slider-inner {
      padding: 0 20px;
    }
    
    .slider-title {
      font-size: 24px;
    }
  }

  @media (max-width: 768px) {
    .slider-inner {
      padding: 0 15px;
    }
    
    .slider-title {
      font-size: 22px;
      margin-bottom: 20px;
    }
    
    .show-more-button {
      padding: 12px 40px;
      font-size: 15px;
    }
  }

  @media (max-width: 480px) {
    .slider-container {
      padding: 20px 0;
    }
    
    .slider-title {
      font-size: 20px;
    }
    
    .slick-dots {
      bottom: 5px;
      padding-top: 15px;
      
      li {
        margin: 0 3px;
        width: 10px;
        height: 10px;
        
        button {
          width: 10px;
          height: 10px;
          
          &:before {
            width: 10px;
            height: 10px;
          }
        }
        
        &.slick-active {
          button:before {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
    
    .show-more-button {
      padding: 10px 30px;
      font-size: 14px;
    }
  }
`;