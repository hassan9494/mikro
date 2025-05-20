import React, { useContext } from 'react';
import { openModal } from '@redq/reuse-modal';
import Router from 'next/router';
import { FormattedMessage } from 'react-intl';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import Drawer from 'components/drawer/drawer';
import { Button } from 'components/button/button';
import NavLink from 'components/nav-link/nav-link';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from 'features/authentication-form';
import {
    DrawerBody,
    HamburgerIcon,
    DrawerContentWrapper,
    DrawerClose,
    DrawerProfile,
    LogoutView,
    LoginView,
    UserAvatar,
    UserDetails,
    DrawerMenu,
    DrawerMenuItem,
    UserOptionMenu,
} from './header.style';
import UserImage from 'assets/images/user.jpg';
import {Button as BTN} from "@material-ui/core";
import {
    MOBILE_DRAWER_MENU,
    PROFILE_PAGE, REQUEST_MEDICINE_MENU_ITEM,
} from 'site-settings/site-navigation';
import { useAppState, useAppDispatch } from 'contexts/app/app.provider';
import useUser from "../../data/use-user";
import {Person} from "@material-ui/icons";
import {Avatar} from "@material-ui/core";
import Link from "next/link";
import {RequestMedicine} from "../sidebar/sidebar.style";
import {TreeMenu} from "../../components/tree-menu/tree-menu";
import CategoryWalker from "../../components/category-walker/category-walker";
import useCategory from "../../data/use-category";
import {router} from "next/client";
import styled from "styled-components";
import css from '@styled-system/css';

const TreeWrapper = styled.div(
    css({
        marginLeft: '40px',
        marginRight :'10px'
    })
);

const CategoryTitle = styled.div(
    css({
        fontSize : '18px',
        marginLeft: '40px',
        marginRight :'10px',
        marginBottom :'10px',
        color: '#fe5e00',
    })
);

const MobileDrawer: React.FunctionComponent = () => {
    const isDrawerOpen = useAppState('isDrawerOpen');
    const dispatch = useAppDispatch();
    const { data, error } = useCategory();
    const { user, loading } = useUser();

    const {
        authState: { isAuthenticated },
        authDispatch,
    } = useContext<any>(AuthContext);
    // Toggle drawer
    const toggleHandler = React.useCallback(() => {
        dispatch({
            type: 'TOGGLE_DRAWER',
        });
    }, [dispatch]);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            authDispatch({ type: 'SIGN_OUT' });
            Router.push('/');
            Router.reload();
        }
    };

    const signInOutForm = () => {
        dispatch({
            type: 'TOGGLE_DRAWER',
        });

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

    const { pathname, query } = router;
    const selectedQueries = query.category;

    const onCategoryClick = (category: string) => {
        router.push({
            pathname: '/category/[category]',
            query: { category },
        });
    };

    return (
        <Drawer
            width='316px'
            drawerHandler={
                <HamburgerIcon>
                    <span/>
                    <span/>
                    <span/>
                </HamburgerIcon>
            }
            open={isDrawerOpen}
            toggleHandler={toggleHandler}
            closeButton={
                <DrawerClose>
                    <CloseIcon/>
                </DrawerClose>
            }
        >
            <DrawerBody>
                <Scrollbar className='drawer-scrollbar'>
                    <DrawerContentWrapper>
                        <DrawerProfile>
                            {user ? (
                                <LoginView>
                                    <Avatar style={{backgroundColor: 'green'}}>
                                        <Person />
                                    </Avatar>
                                    <UserDetails>
                                        <h3>{ user?.name }</h3>
                                        <span>{ user?.email }</span>
                                    </UserDetails>
                                </LoginView>
                            ) : (
                                <LogoutView>
                                    <Button variant='primary' onClick={signInOutForm}>
                                        <FormattedMessage
                                            id='mobileSignInButtonText'
                                            defaultMessage='join'
                                        />
                                    </Button>
                                </LogoutView>
                            )}
                        </DrawerProfile>

                        <DrawerMenu>
                            {MOBILE_DRAWER_MENU.map((item) => (
                                <DrawerMenuItem key={item.id}>
                                    <NavLink
                                        onClick={toggleHandler}
                                        href={item.href}
                                        label={item.defaultMessage}
                                        intlId={item.id}
                                        className='drawer_menu_item'
                                    />
                                </DrawerMenuItem>
                            ))}
                            <CategoryTitle>
                                Categories :
                            </CategoryTitle>
                            <BTN
                                variant="contained"
                                disableElevation
                                color="primary"
                                onClick={()=>onCategoryClick('new_product')}
                                style={{marginLeft:35,width:"auto",marginBottom:15}}>
                                <FormattedMessage id="New Products" defaultMessage="New Products"/>
                            </BTN>
                            <TreeWrapper>

                                <TreeMenu
                                    data={data}
                                    onClick={onCategoryClick}
                                    active={selectedQueries}
                                />
                            </TreeWrapper>
                        </DrawerMenu>





                        {isAuthenticated && (
                            <UserOptionMenu>
                                <DrawerMenuItem>
                                    <div onClick={handleLogout} className='drawer_menu_item'>
                                        <span className='logoutBtn'>
                                          <FormattedMessage
                                              id='navlinkLogout'
                                              defaultMessage='Logout'
                                          />
                                        </span>
                                    </div>
                                </DrawerMenuItem>
                            </UserOptionMenu>
                        )}

                    </DrawerContentWrapper>
                </Scrollbar>
            </DrawerBody>
        </Drawer>
    );
};

export default MobileDrawer;
