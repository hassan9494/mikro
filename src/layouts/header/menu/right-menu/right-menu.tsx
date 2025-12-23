import React from 'react';
import dynamic from 'next/dynamic';
import NavLink from 'components/nav-link/nav-link';
import {OFFER_MENU_ITEM, HELP_MENU_ITEM} from 'site-settings/site-navigation';
import LanguageSwitcher from '../language-switcher/language-switcher';
import {RightMenuBox} from './right-menu.style';
import {Phone, WhatsApp} from "@mui/icons-material";
import {Typography} from "@mui/material";

const AuthMenu = dynamic(() => import('../auth-menu'), {ssr: false});

type Props = {
    onLogout: () => void;
    onJoin: () => void;
    isAuthenticated: boolean;
    social;
};

export const RightMenu: React.FC<Props> = ({
                                               onLogout,
                                               isAuthenticated,
                                               onJoin,
                                               social,
                                           }) => {
    return (
        <RightMenuBox>


            <NavLink
                className="menu-item menu-item-contact"
                href={`https://wa.me/${social?.whatsapp}`}
                label={`${social?.whatsapp}`}
                target={'_blank'}
                iconClass="menu-icon"
                icon={<WhatsApp/>}
            />

            <NavLink
                className="menu-item menu-item-contact"
                href={`tel:+${social?.call}`}
                label={`${social?.call}`}
                intlId={`${social?.call}`}
                iconClass="menu-icon"
                icon={<Phone/>}
            />
            {/*<LanguageSwitcher/>*/}
            <AuthMenu
                onJoin={onJoin}
                onLogout={onLogout}
                isAuthenticated={isAuthenticated}
            />
        </RightMenuBox>
    );
};
