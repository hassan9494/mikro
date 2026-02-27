import React from 'react';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import NavLink from 'components/nav-link/nav-link';

const SidebarWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e6e6e6;
`;

const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;
`;

const SidebarBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid #f1f1f1;
`;

const SidebarMenu = styled(NavLink as any)`
  display: flex;
  a {
    display: flex;
    align-items: center;
    width: 100%;
    font-family: ${themeGet('fonts.body', 'Lato')};
    font-size: 15px;
    font-weight: 600;
    color: ${themeGet('colors.text.bold', '#0D1136')};
    text-decoration: none;
    transition: all 0.2s ease;
    padding: 12px 25px;
    margin: 2px 10px;
    border-radius: 8px;

    &.current-page {
      color: #133595;
      background-color: rgba(19, 53, 149, 0.08);
      border-left: 3px solid #133595;
      padding-left: 22px;
      font-weight: 700;
    }

    &:hover {
      color: #133595;
      background-color: rgba(19, 53, 149, 0.04);
    }
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
  border: none;
  background-color: transparent;
  text-align: left;
  cursor: pointer;
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: 15px;
  font-weight: 600;
  color: #d32f2f;
  transition: all 0.2s ease;
  padding: 12px 25px;
  margin: 2px 10px;
  border-radius: 8px;
  outline: 0;

  &:hover {
    background-color: rgba(211, 47, 47, 0.06);
  }

  &:focus {
    box-shadow: none;
  }
`;

export { SidebarWrapper, SidebarTop, SidebarBottom, SidebarMenu, LogoutButton };
