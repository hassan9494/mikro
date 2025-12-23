import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Sticky from 'components/sticky/sticky';
import { useAppState } from 'contexts/app/app.provider';
import Header from './header/header';
import { LayoutWrapper } from './layout.style';
import { isCategoryPage } from './is-home-page';
import {Box} from "@mui/material";
import Footer from "./footer";
import {  Whatsapp } from "components/whatsapp/whatsapp";
import {useSocial} from "../data/use-website";

const MobileHeader = dynamic(() => import('./header/mobile-header'), {
    ssr: false,
});

type LayoutProps = {
    className?: string;
    token?: string;
    children :any;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
                                                          className,
                                                          children,
                                                          token,
                                                      }) => {
    const { pathname, query } = useRouter();

    const { data: social } = useSocial();
    const isSticky =
        useAppState('isSticky') ||
        pathname === '/furniture-two' ||
        pathname === '/grocery-two';

    const isHomePage = isCategoryPage(query.type) || pathname === '/';

    return (
        <LayoutWrapper className={`layoutWrapper ${className}`}>
            x
            <Sticky enabled={isSticky} innerZ={1001}>
                {/*<MobileHeader*/}
                {/*  className={`${isSticky ? 'sticky' : 'unSticky'} ${*/}
                {/*    isHomePage ? 'home' : ''*/}
                {/*  } desktop`}*/}
                {/*/>*/}


                <MobileHeader
                    className={`sticky ${isHomePage ? 'home' : ''} desktop`} social={social}
                />

                {/*<Header*/}
                {/*  className={`${isSticky ? 'sticky' : 'unSticky'} ${*/}
                {/*    isHomePage ? 'home' : ''*/}
                {/*  }`}*/}
                {/*/>*/}
                <Header
                    className={`sticky ${isHomePage ? 'home' : ''}`} social={social}
                />

                <Whatsapp  social={social}/>
            </Sticky>
            {children}
        </LayoutWrapper>
    );
};

export default Layout;
