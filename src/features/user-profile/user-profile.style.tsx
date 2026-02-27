import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const PageWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 90vh;
  display: flex;
  flex-wrap: wrap;
  background-color: ${themeGet('colors.white', '#ffffff')};
  padding: 140px 70px 40px;

  @media only screen and (max-width: 990px) {
    padding: 100px 0 60px;
  }

  @media only screen and (min-width: 991px) and (max-width: 1280px) {
    padding: 130px 15px 60px;
  }
`;

const SidebarSection = styled.div`
  width: 300px;
  flex-shrink: 0;
  margin-right: 30px;

  @media only screen and (max-width: 1199px) {
    display: none;
  }
`;

const ContentBox = styled.div`
  width: calc(100% - 330px);
  height: auto;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  padding: 40px 30px 20px;

  @media only screen and (max-width: 1199px) {
    width: 100%;
    padding: 20px;
  }
`;

export { PageWrapper, SidebarSection, ContentBox };
