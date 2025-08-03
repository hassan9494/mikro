import styled, { keyframes } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const Fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const PopoverWrapper = styled.div`
  @media (min-width: 991px) {
    display: none;
  }

  .popover-handler {
    display: block;
    padding: 15px;
    cursor: pointer;
  }
  .popover-content {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    border-radius: 0;
    box-shadow: none;
    padding: 25px 35px;
    border-top: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};

    &::before {
      display: none;
    }
    .category-dropdown {
      animation: ${Fade} 0.6s;
    }
    @media (max-width: 990px) {
      padding: 25px;
    }
  }
`;

export const RequestMedicine = styled.span`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 50px;
  background-color: ${themeGet('colors.primary.regular', '#009e7f')};
  font-size: calc(${themeGet('fontSizes.base', '15px')} - 1px);
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.white', '#ffffff')};
  cursor: pointer;

  @media (max-width: 990px) {
    justify-content: center;
    padding: 0;
    border-radius: ${themeGet('radii.base', '6px')};
  }
`;

export const SidebarWrapper = styled.div`
  padding: 45px 0px;
  padding-top: 35px;
  padding-right: 0;

  @media (max-width: 1199px) {
    padding: 40px 0px;
    padding-right: 0;
  }

  @media (max-width: 990px) {
    display: none;
    padding: 0;
  }

  .sidebar-scrollbar {
    height: 100%;
    max-height: calc(100vh - 108px);
  }
`;

export const CategoryWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const TreeWrapper = styled.div`
  padding-left: 35px;
  padding-right: 10px;
`;

export const PopoverHandler = styled.div`
  font-size: calc(${themeGet('fontSizes.base', '15px')} - 1px);
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    &:first-child {
      flex-grow: 1;
      svg {
        margin-right: 10px;
      }
    }
    &:last-child {
      color: ${themeGet('colors.text.regular', '#77798c')};
    }
  }
`;

export const Loading = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(${themeGet('fontSizes.base', '15px')} - 1px);
  color: ${themeGet('colors.text.bold', '#0D1136')};
`;
import { Button, Grid } from "@material-ui/core";
import { NewReleases, FlightLand } from '@material-ui/icons';
// import styled from '@material-ui/styles/styled';
export const NewProductButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #fe5e00 0%, #fe5e00 100%);
    color: white;
    text-transform: none;
    font-weight: 600;
    border-radius: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 3px 5px rgba(255, 107, 107, 0.2);
    position: relative;
    overflow: hidden;
    height: 43px;
    min-height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 162px;
    
    &:hover {
      background: linear-gradient(135deg, #fe5e00 0%, #fe5e00 100%);
      box-shadow: 0 5px 10px rgba(255, 82, 82, 0.3);
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0.57) 0%,
        rgba(255,255,255,0) 50%
      );
      transform: rotate(30deg);
      transition: all 0.5s ease;
    }
    
    &:hover::before {
      right: 100%;
    }
    
    .MuiButton-label {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
`;

export const BackinStockButton = styled(Button)`
     && {
    background: linear-gradient(135deg, #133595 0%, #133695 100%);
    color: white;
    text-transform: none;
    font-weight: 600;
    border-radius: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 3px 5px rgba(78, 205, 196, 0.2);
    position: relative;
    overflow: hidden;
    height: 43px;
    min-height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 162px;
    
    &:hover {
    background: linear-gradient(135deg, #133595 0%, #133695 100%);
    box-shadow: 0 5px 10px rgba(61, 187, 179, 0.3);
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0.57) 0%,
        rgba(255,255,255,0) 50%
      );
      transform: rotate(30deg);
      transition: all 0.5s ease;
    }
    
    &:hover::before {
      right: 100%;
    }
    
    .MuiButton-label {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

`;