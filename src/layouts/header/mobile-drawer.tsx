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
import { Whatshot, Update} from '@material-ui/icons'; 

// Styled components for better organization
const ButtonContainer = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin: '0 15px 15px 15px',
  })
);

const StyledButton = styled(BTN)(
  css({
    width: '100% !important',
    padding: '10px 15px !important',
    borderRadius: '6px !important',
    fontSize: '14px !important',
    fontWeight: '600 !important',
    textTransform: 'none !important',
    boxShadow: 'none !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    transition: 'background-color 0.3s ease !important',
    '& .MuiButton-startIcon': {
      marginRight: '8px !important',
    },
    '&:hover': {
      // This will apply to all buttons
      opacity: 0.9,
    }
  })
);

// Create specific button styles with hover colors
const NewProductButton = styled(StyledButton)(
  css({
    backgroundColor: '#FF5722 !important',
    color: 'white !important',
    '&:hover': {
      backgroundColor: '#E64A19 !important', // Darker shade for hover
    }
  })
);

const BackinStockButton = styled(StyledButton)(
  css({
    backgroundColor: '#133595 !important',
    color: 'white !important',
    '&:hover': {
      backgroundColor: '#133595 !important', // Darker shade for hover
    }
  })
);

const TreeWrapper = styled.div(
  css({
    padding: '0 15px',
    marginTop: '10px',
  })
);

const CategoryTitle = styled.div(
  css({
    fontSize: '18px',
    fontWeight: '700',
    color: '#fe5e00',
    padding: '15px 15px 5px',
    borderBottom: '1px solid #f1f1f1',
    marginBottom: '15px',
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
                                <FormattedMessage id="Categories" defaultMessage="Categories" />
                            </CategoryTitle>
                            
                            <ButtonContainer>
  <NewProductButton
    variant="contained"
    disableElevation
    onClick={() => onCategoryClick('new_product')}
    startIcon={ <Whatshot style={{ 
                                                    fontSize: '1.8rem',
                                                    marginRight: '10px',
                                                    flexShrink: 0,
                                                    color: '#ffffffff' // Orange-red color for "hot" items
                                                }} />}
  >
     <span style={{ 
                                                    fontSize: '1.4rem', 
                                                    fontWeight: 700,
                                                    lineHeight: '1.2',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    textAlign: 'center'
                                                }}>
                                                    <FormattedMessage id="New Products" defaultMessage="New Products"/>
                                                </span>
  </NewProductButton>
  
  <BackinStockButton
    variant="contained"
    disableElevation
    onClick={() => onCategoryClick('back_in_stock')}
    startIcon={<Update style={{ 
                                                    fontSize: '1.8rem',
                                                    marginRight: '10px',
                                                    flexShrink: 0,
                                                    color: '#ffffffff' // Green color for restocked items
                                                }} />}
  >
<span style={{ 
                                                fontSize: '1.4rem', 
                                                fontWeight: 700,
                                                lineHeight: '1.2',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                textAlign: 'center'
                                            }}>
                                                <FormattedMessage id="Back in Stock" defaultMessage="Back in Stock"/>
                                            </span>  </BackinStockButton>
</ButtonContainer>

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