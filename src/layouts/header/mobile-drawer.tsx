import React, { useContext, useState } from 'react';
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
    PROFILE_PAGE,
    REQUEST_MEDICINE_MENU_ITEM,
    HOME_PAGE,
    COURSES_PAGE,
    SERVICES_PAGE,
    TUTORIALS_PAGE,
    ABOUT_US_PAGE
} from 'site-settings/site-navigation';
import { useAppState, useAppDispatch } from 'contexts/app/app.provider';
import useUser from "../../data/use-user";
import {Person, ExitToApp, ExpandMore, ChevronRight} from "@material-ui/icons";
import {Avatar} from "@material-ui/core";
import Link from "next/link";
import {RequestMedicine} from "../sidebar/sidebar.style";
import {TreeMenu} from "../../components/tree-menu/tree-menu";
import CategoryWalker from "../../components/category-walker/category-walker";
import useCategory from "../../data/use-category";
import {router} from "next/client";
import styled from "styled-components";
import css from '@styled-system/css';
import {
    Whatshot,
    Update,
    Home,
    School,
    Build,
    OndemandVideo,
    Info,
    Person as ProfileIcon,
    LocalOffer,
    Help,
    ContactMail
} from '@material-ui/icons';
import { background } from 'styled-system';

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
        padding: '12px 15px !important',
        borderRadius: '8px !important',
        fontSize: '14px !important',
        fontWeight: '600 !important',
        textTransform: 'none !important',
        boxShadow: 'none !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        transition: 'all 0.3s ease !important',
        '& .MuiButton-startIcon': {
            marginRight: '8px !important',
        },
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1) !important',
        }
    })
);

const JoinButton = styled(Button)`
  background-color: #fe5e00 !important;
  color: white !important;
  border: none !important;
  border-radius: 8px !important;
  padding: 12px 20px !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  width: 100% !important;
  text-transform: none !important;
  margin: 10px 15px 10px 15px !important;
  box-shadow: 0 2px 8px rgba(254, 94, 0, 0.3) !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    background-color: #e55300 !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(254, 94, 0, 0.4) !important;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Create specific button styles with hover colors
const NewProductButton = styled(StyledButton)(
    css({
        backgroundColor: '#FF5722 !important',
        color: 'white !important',
        '&:hover': {
            backgroundColor: '#E64A19 !important',
        }
    })
);

const BackinStockButton = styled(StyledButton)(
    css({
        backgroundColor: '#133595 !important',
        color: 'white !important',
        '&:hover': {
            backgroundColor: '#133595 !important',
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
        color: '#133695',
        padding: '15px 15px 5px',
        marginBottom: '15px',
    })
);

// New styled components for menu items
const MainMenuSection = styled.div(
    css({
        borderBottom: '1px solid #f1f1f1',
        marginBottom: '15px',
        paddingBottom: '10px',
    })
);

const MenuTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  color: #133695;
  padding: 15px 15px 10px;
  margin-bottom: 5px;
  letter-spacing: 0.5px;
  
  &:hover {
    color: #fe5e00;
  }
`;

const ExpandIcon = styled.span<{ $open: boolean }>`
  transition: transform 0.3s ease;
  transform: ${props => props.$open ? 'rotate(180deg)' : 'rotate(0deg)'};
  display: flex;
  align-items: center;
`;

interface MenuItemsWrapperProps {
    open: boolean;
}

const MenuItemsWrapper = styled.div<MenuItemsWrapperProps>`
  overflow: hidden;
  transition: max-height 0.3s ease;
  max-height: ${props => props.open ? '1000px' : '0'};
`;

const StyledDrawerMenuItem = styled(DrawerMenuItem)(
    css({
        padding: '12px 15px',
        margin: '0',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#f9f9f9',
        }
    })
);

const MenuItemContent = styled.div(
    css({
        display: 'flex',
        alignItems: 'center',
        fontSize: '15px',
        fontWeight: '500',
        color: '#555',
        transition: 'color 0.3s ease',
        '&:hover': {
            color: '#fe5e00',
        }
    })
);

const MenuIcon = styled.span(
    css({
        marginRight: '12px',
        display: 'flex',
        alignItems: 'center',
        color: '#fe5e00',
    })
);

const SecondaryMenuSection = styled.div(
    css({
        borderBottom: '1px solid #f1f1f1',
        marginBottom: '15px',
        paddingBottom: '10px',
    })
);

// Custom NavLink wrapper to handle styling
const StyledNavLink = ({ href, onClick, children, className = '' }) => {
    return (
        <Link href={href} passHref>
            <a
                onClick={onClick}
                className={`drawer_menu_item ${className}`}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#555',
                    transition: 'color 0.3s ease',
                    textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#fe5e00';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#555';
                }}
            >
                {children}
            </a>
        </Link>
    );
};

// Styled component for the profile link
const ProfileLink = styled.div(
    css({
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#f9f9f9',
        }
    })
);

// Icon mapping for secondary menu items
const getIconForMenuItem = (id) => {
    switch(id) {
        case 'navlinkProfile':
            return <ProfileIcon />;
        case 'navlinkOffer':
            return <LocalOffer />;
        case 'navlinkHelp':
            return <Help />;
        case 'navlinkContact':
            return <ContactMail />;
        default:
            return <Info />;
    }
};

const MobileDrawer: React.FunctionComponent = () => {
    const isDrawerOpen = useAppState('isDrawerOpen');
    const dispatch = useAppDispatch();
    const { data, error } = useCategory();
    const { user, loading } = useUser();
    const [menuStates, setMenuStates] = useState({
        mainMenu: false,
        moreOptions: false
    });

    const {
        authState: { isAuthenticated },
        authDispatch,
    } = useContext<any>(AuthContext);

    const toggleHandler = React.useCallback(() => {
        dispatch({
            type: 'TOGGLE_DRAWER',
        });
    }, [dispatch]);

    const toggleMenu = (menu) => {
        setMenuStates(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

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

    const handleProfileClick = () => {
        toggleHandler();
        Router.push(PROFILE_PAGE);
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
                                <ProfileLink onClick={handleProfileClick}>
                                    <LoginView>
                                        <Avatar style={{backgroundColor: '#133695'}}>
                                            <Person />
                                        </Avatar>
                                        <UserDetails>
                                            <h3 style={{color: '#133695', fontWeight: '800',    fontSize: '16px',    letterSpacing: '0.5px',
                                            }}>{ user?.name }</h3>
                                            <span style={{color: '#fe5e00', fontWeight: '500'}}>{ user?.email }</span>
                                        </UserDetails>
                                    </LoginView>
                                </ProfileLink>
                            ) : (
                                <LogoutView>
                                    <LogoutView>
                                        <JoinButton variant='primary' onClick={signInOutForm}>
                                            <FormattedMessage
                                                id='mobileSignInButtonText'
                                                defaultMessage='Join Now'
                                            />
                                        </JoinButton>
                                    </LogoutView>
                                </LogoutView>
                            )}
                        </DrawerProfile>

                        <DrawerMenu>
                            <MainMenuSection>
                                <MenuTitle onClick={() => toggleMenu('mainMenu')}>
                                    <span>
                                        <FormattedMessage id="Main Menu" defaultMessage="Main Menu" />
                                    </span>
                                    <ExpandIcon $open={menuStates.mainMenu}>
                                        <ExpandMore />
                                    </ExpandIcon>
                                </MenuTitle>
                                <MenuItemsWrapper open={menuStates.mainMenu}>
                                    <StyledDrawerMenuItem>
                                        <StyledNavLink
                                            onClick={toggleHandler}
                                            href={HOME_PAGE}
                                        >
                                            <MenuIcon><Home /></MenuIcon>
                                            <FormattedMessage id="home" defaultMessage="Home" />
                                        </StyledNavLink>
                                    </StyledDrawerMenuItem>

                                    <StyledDrawerMenuItem>
                                        <StyledNavLink
                                            onClick={toggleHandler}
                                            href={COURSES_PAGE}
                                        >
                                            <MenuIcon><School /></MenuIcon>
                                            <FormattedMessage id="courses" defaultMessage="Courses" />
                                        </StyledNavLink>
                                    </StyledDrawerMenuItem>

                                    <StyledDrawerMenuItem>
                                        <StyledNavLink
                                            onClick={toggleHandler}
                                            href={SERVICES_PAGE}
                                        >
                                            <MenuIcon><Build /></MenuIcon>
                                            <FormattedMessage id="services" defaultMessage="Services" />
                                        </StyledNavLink>
                                    </StyledDrawerMenuItem>

                                    <StyledDrawerMenuItem>
                                        <StyledNavLink
                                            onClick={toggleHandler}
                                            href={TUTORIALS_PAGE}
                                        >
                                            <MenuIcon><OndemandVideo /></MenuIcon>
                                            <FormattedMessage id="tutorials" defaultMessage="Tutorials" />
                                        </StyledNavLink>
                                    </StyledDrawerMenuItem>

                                    <StyledDrawerMenuItem>
                                        <StyledNavLink
                                            onClick={toggleHandler}
                                            href={ABOUT_US_PAGE}
                                        >
                                            <MenuIcon><Info /></MenuIcon>
                                            <FormattedMessage id="aboutUs" defaultMessage="About Us" />
                                        </StyledNavLink>
                                    </StyledDrawerMenuItem>
                                </MenuItemsWrapper>
                            </MainMenuSection>

                            <SecondaryMenuSection>
                                <MenuTitle onClick={() => toggleMenu('moreOptions')}>
                                    <span>
                                        <FormattedMessage id="More Options" defaultMessage="More Options" />
                                    </span>
                                    <ExpandIcon $open={menuStates.moreOptions}>
                                        <ExpandMore />
                                    </ExpandIcon>
                                </MenuTitle>
                                <MenuItemsWrapper open={menuStates.moreOptions}>
                                    {MOBILE_DRAWER_MENU.filter(item => item.href !== HOME_PAGE).map((item) => (
                                        <StyledDrawerMenuItem key={item.id}>
                                            <StyledNavLink
                                                onClick={toggleHandler}
                                                href={item.href}
                                            >
                                                <MenuIcon>{getIconForMenuItem(item.id)}</MenuIcon>
                                                <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
                                            </StyledNavLink>
                                        </StyledDrawerMenuItem>
                                    ))}
                                </MenuItemsWrapper>
                            </SecondaryMenuSection>

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
                                        color: '#ffffffff'
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
                                        color: '#ffffffff'
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
                                    </span>
                                </BackinStockButton>
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
                                <StyledDrawerMenuItem>
                                    <StyledNavLink
                                        onClick={handleLogout}
                                        href="#"
                                    >
                                        <MenuIcon><ExitToApp /></MenuIcon>
                                        <FormattedMessage
                                            id='navlinkLogout'
                                            defaultMessage='Logout'
                                        />
                                    </StyledNavLink>
                                </StyledDrawerMenuItem>
                            </UserOptionMenu>
                        )}
                    </DrawerContentWrapper>
                </Scrollbar>
            </DrawerBody>
        </Drawer>
    );
};

export default MobileDrawer;
