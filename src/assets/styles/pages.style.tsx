import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

 const MobileCarouselDropdown = styled.div`
  display: none;

  // @media (max-width: 1024px) {
  //   display: block;
  //   margin-bottom: 160px;
  // }
`;

const OfferPageWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${themeGet('colors.gray.200', '#f7f7f7')};
  position: relative;
  padding: 100px 60px 60px;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 100px 30px 60px;
  }

  @media (max-width: 1199px) {
    padding: 100px 30px 60px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 400px;
  background-color: ${themeGet('colors.gray.300', '#f4f4f4')};
`;

const MainWrapper = styled.div`
  padding-top: 50px;
  width: 100%;
`;

 const ProductsWrapper = styled.div`
  padding: 0 15px 30px;
  width: 100%;
`;


 const MainContentArea = styled.main`
  width: 100%;
  display: flex;
  align-items: flex-start;
  background-color: ${themeGet('colors.gray.200', '#f7f7f7')};

  /* REQUIRED for sticky to work */
  overflow: visible;

  @media (max-width: 990px) {
    background-color: ${themeGet('colors.white', '#ffffff')};
  }
`;

 const SidebarSection = styled.aside`
  background-color: ${themeGet('colors.white', '#ffffff')};

  width: 280px;
  flex-shrink: 0;

  position: sticky;
  top: 81px;

  /* Sidebar height minus top */
  max-height: auto;

  // /* Make only sidebar scrollable */
  // overflow-y: auto;
  // overscroll-behavior: auto;
  // scroll-behavior: smooth;

  // &::-webkit-scrollbar {
  //   width: 6px; /* your scrollbar width */
  // }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

//   /* Add padding-bottom for 991-1024px screens */
//   @media (min-width: 991px) and (max-width: 1024px) {
//  padding-bottom: 500px;   }

  @media (max-width: 990px) {
    display: none;
  }
     /* Add bottom padding only for 991px - 1024px screens */
      @media (min-width: 991px) and (max-width: 1024px) {
      min-height: auto
        margin-bottom: 50px; /* Set your bottom padding */
        
      }
`;


 const ContentSection = styled.main`
  flex: 1;
  min-width: 0;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 990px) {
    width: 100%;
  }
`;

 const OfferSection = styled.section`
  width: 100%;
  padding: 60px;
  background-color: ${themeGet('colors.white', '#ffffff')};
  border-bottom: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};

  @media (max-width: 990px) {
    padding: 15px;
  }
`;

const Heading = styled.h2`
  font-size: ${themeGet('fontSizes.xl', '24')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.primary.regular', '#009e7f')};
  padding: 0px 20px 20px;
  margin: 50px 10px 20px;
  border-bottom: 2px solid ${themeGet('colors.primary.regular', '#009e7f')};
  width: auto;
  display: inline-block;
`;

 const ProductsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  background-color: ${themeGet('colors.gray.200', '#f7f7f7')};

  @media (max-width: 768px) {
    margin-left: -7.5px;
    margin-right: -7.5px;
    margin-top: 15px;
  }
`;

const ProductsCol = styled.div`
  flex: 0 0 20%;
  max-width: 20%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;

  @media (max-width: 1650px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
  @media (max-width: 1300px) {
    flex: 0 0 33.3333333%;
    max-width: 33.3333333%;
  }
  @media (max-width: 1199px) and (min-width: 900px) {
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
  }
  @media (max-width: 899px) and (min-width: 769px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
  @media (max-width: 768px) {
    padding-left: 7.5px;
    padding-right: 7.5px;
    margin-bottom: 15px;
    flex: 0 0 50%;
    max-width: 50%;
  }

  @media (max-width: 490px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export {
    OfferPageWrapper,
    MobileCarouselDropdown,
    HeaderSection,
    MainContentArea,
    SidebarSection,
    ContentSection,
    OfferSection,
    Heading,
    ProductsCol,
    MainWrapper,
    ProductsWrapper,
    ProductsRow
};
