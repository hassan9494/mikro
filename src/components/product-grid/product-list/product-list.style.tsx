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
  flex: 0 0 25%;
  max-width: 25%;
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
    flex: 0 0 33.333%;
    max-width: 33.333%;
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
    flex: 0 0 50%;
    max-width: 50%;
    &.food-col {
      flex: 0 0 50%;
      max-width: 50%;
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
    flex: 0 0 100%;
    max-width: 100%;
    &.food-col {
      flex: 0 0 100%;
      max-width: 100%;
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

export const FilterContainer = styled.div<{ isHomePage?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: ${({ isHomePage }) => (isHomePage ? '0' : '15px')}; // Conditional margin
  border-bottom: 1px solid #e0e0e0;
  gap: 15px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 1200px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-bottom: 20px;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const FilterLabel = styled.span`
  font-size: 14px;
  color: #000;
  // font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;
export const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  min-width: 140px;
  appearance: none;

  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    border-color: #ccc;
  }

  &:focus {
    outline: none;
    border-color: #fe5e00;
    box-shadow: 0 0 0 3px rgba(254, 94, 0, 0.2);
  }

  @media (max-width: 1200px) {
    min-width: 100px;
    padding: 7px 10px;
  }

  @media (max-width: 768px) {
    min-width: 80px;
    padding: 6px 8px;
    font-size: 13px;
    background-position: right 6px center;
  }

  option {
    padding: 12px;
    font-size: 1rem;
    color: #333;
  }

  option:checked {
    background-color: #fe5e00;
    color: white;
  }
`;


export const CheckboxLabel = styled.label<{ checked: boolean }>`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  input[type="checkbox"] {
    cursor: pointer;
    accent-color: ${props => props.checked ? '#fe5e00' : '#ddd'};
    width: 16px;
    height: 16px;
    min-width: 16px;
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
    }
  }
`;

import { Accordion } from '@material-ui/core';

export const MobileFilterWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
  
  .MuiAccordion-root {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    
    &:before {
      display: none;
    }
  }
  
  .MuiAccordionSummary-content {
    align-items: center;
    display: flex;
  }
`;

export const MobileFilterSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0;
`;



