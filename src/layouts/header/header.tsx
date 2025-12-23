import React from 'react';
import Router, { useRouter } from 'next/router';
import { openModal } from 'components/modal/modal-provider';
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from 'features/authentication-form';
import { RightMenu } from './menu/right-menu/right-menu';
import { LeftMenu } from './menu/left-menu/left-menu';
import HeaderWrapper from './header.style';
// import LogoImage from 'assets/images/logo.svg';
import LogoImage from 'assets/images/logo_mikro.svg';
import UserImage from 'assets/images/user.jpg';
import { isCategoryPage } from '../is-home-page';
import Search from 'features/search/search';
import {Box} from "@mui/material";
import dynamic from "next/dynamic";
type Props = {
    className?: string;
    social?;
};

const Header: React.FC<Props> = ({ className,social }) => {
    const {
        authState: { isAuthenticated },
        authDispatch,
    } = React.useContext<any>(AuthContext);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            authDispatch({ type: 'SIGN_OUT' });
            Router.push('/');
            Router.reload();
        }
    };

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
    // const showSearch =
    //     isCategoryPage(query.type) ||
    //     pathname === '/furniture-two' ||
    //     pathname === '/grocery-two' ||
    //     pathname === '/bakery';
    return (
        <HeaderWrapper className={className} id="layout-header">
            <LeftMenu logo={LogoImage} />
            <Search minimal={true} className="headerSearch" />
            <RightMenu
                isAuthenticated={isAuthenticated}
                onJoin={handleJoin}
                onLogout={handleLogout}
                social={social}
            />
        </HeaderWrapper>
    );
};

export default Header;
