import React from 'react';
import Router, { useRouter } from 'next/router';
import { openModal, closeModal } from '@redq/reuse-modal';
import MobileDrawer from './mobile-drawer';
import {
    MobileHeaderWrapper,
    MobileHeaderInnerWrapper,
    DrawerWrapper,
    LogoWrapper,
    SearchWrapper,
    SearchModalWrapper,
    SearchModalClose,
} from './header.style';
import Search from 'features/search/search';
// import LogoImage from 'assets/images/logo.svg';
import LogoImage from 'assets/images/logo_mikro.svg';
import { SearchIcon } from 'assets/icons/SearchIcon';
import { LongArrowLeft } from 'assets/icons/LongArrowLeft';
import Logo from 'layouts/logo/logo';
import LanguageSwitcher from './menu/language-switcher/language-switcher';
import { isCategoryPage } from '../is-home-page';
import useDimensions from 'utils/useComponentSize';
import AuthMenu from "./menu/auth-menu";
import AuthenticationForm from "../../features/authentication-form";
import { AuthContext } from "../../contexts/auth/auth.context";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import MySearch from "./my-search";

type MobileHeaderProps = {
    className?: string;
    closeSearch?: any;
    social?;
};


export const AuthMenuWrapper = styled.div`
  margin-left: 0;
  margin-right: 25px;
`;

const SearchModal: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
    return (
        <SearchModalWrapper>
            <SearchModalClose type="button" onClick={() => closeModal()}>
                <LongArrowLeft />
            </SearchModalClose>
            <MySearch onSubmit={onSubmit} /> {/* Pass down the onSubmit prop */}
        </SearchModalWrapper>
    );
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ className }) => {
    const { pathname, query } = useRouter();
    const {
        authState: { isAuthenticated },
        authDispatch,
    } = React.useContext<any>(AuthContext);
    const isHomePage = true;
    const handleSearchModal = () => {
        openModal({
            show: true,
            config: {
                enableResizing: false,
                disableDragging: true,
                className: 'search-modal-mobile',
                width: '100%',
                height: '100%',
            },
            closeOnClickOutside: false,
            component: (props) => (
                <SearchModal {...props} onSubmit={handleClose} /> // Pass handleClose as onSubmit
            ),
            closeComponent: () => <div />,
        });
    };

    const handleClose = () => {
        closeModal(); // This will be called when search is submitted
    };

    return (
        <MobileHeaderWrapper>
            <MobileHeaderInnerWrapper className={className}>
                <DrawerWrapper>
                    <MobileDrawer />
                </DrawerWrapper>

                <LogoWrapper>
                    <Logo imageUrl={LogoImage} alt="shop logo" />
                </LogoWrapper>

                {isHomePage ? (
                    <SearchWrapper
                        onClick={handleSearchModal}
                        className="searchIconWrapper"
                    >
                        <SearchIcon />
                    </SearchWrapper>
                ) : null}
            </MobileHeaderInnerWrapper>
        </MobileHeaderWrapper>
    );
};

export default MobileHeader;
