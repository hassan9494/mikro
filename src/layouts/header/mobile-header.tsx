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
import LogoImage from 'assets/images/logo.png';
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

type MobileHeaderProps = {
    className?: string;
    closeSearch?: any;
};


export const AuthMenuWrapper = styled.div`
  margin-left: 0;
  margin-right: 25px;
`;

const SearchModal: React.FC<{}> = () => {
    const onSubmit = () => {
        closeModal();
    };
    return (
        <SearchModalWrapper>
            <SearchModalClose type="submit" onClick={() => closeModal()}>
                <LongArrowLeft/>
            </SearchModalClose>
            <Search
                className="header-modal-search"
                showButtonText={false}
                onSubmit={onSubmit}
            />
        </SearchModalWrapper>
    );
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ className }) => {
    const { pathname, query } = useRouter();
    const {
        authState: { isAuthenticated },
        authDispatch,
    } = React.useContext<any>(AuthContext);

    const [mobileHeaderRef, dimensions] = useDimensions();

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
            component: SearchModal,
            closeComponent: () => <div/>,
        });
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            authDispatch({ type: 'SIGN_OUT' });
            Router.push('/');
            Router.reload();
        }
    };

    // const isHomePage = isCategoryPage(type);
    const isHomePage = true;


    const handleJoin = () => {
        authDispatch({
            type: 'SIGNIN',
        });

        openModal({
            show: true,
            overlayClassName: 'quick-view-overlay',
            closeOnClickOutside: true,
            component: AuthenticationForm,
            closeComponent: '',
            config: {
                enableResizing: false,
                disableDragging: true,
                className: 'quick-view-modal',
                width: 458,
                height: 'auto',
            },
        });
    };

    return (
        <MobileHeaderWrapper>
            <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
                <DrawerWrapper>
                    <MobileDrawer/>
                </DrawerWrapper>

                <LogoWrapper>
                    <Logo imageUrl={LogoImage} alt="shop logo"/>
                </LogoWrapper>

                {
                    !isAuthenticated &&
                    <AuthMenuWrapper>
                        <Button variant="contained" disableElevation color="primary" onClick={handleJoin}>
                            <FormattedMessage id="joinButton" defaultMessage="join"/>
                        </Button>
                    </AuthMenuWrapper>
                }

                {isHomePage ? (
                    <SearchWrapper
                        onClick={handleSearchModal}
                        className="searchIconWrapper"
                    >
                        <SearchIcon/>
                    </SearchWrapper>
                ) : null}
            </MobileHeaderInnerWrapper>
        </MobileHeaderWrapper>
    );
};

export default MobileHeader;
