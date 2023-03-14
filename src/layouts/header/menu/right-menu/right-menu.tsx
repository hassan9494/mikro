import React from 'react';
import dynamic from 'next/dynamic';
import NavLink from 'components/nav-link/nav-link';
import { OFFER_MENU_ITEM, HELP_MENU_ITEM } from 'site-settings/site-navigation';
import LanguageSwitcher from '../language-switcher/language-switcher';
import { RightMenuBox } from './right-menu.style';
import {Phone, WhatsApp} from "@material-ui/icons";
import {Typography} from "@material-ui/core";

const AuthMenu = dynamic(() => import('../auth-menu'), { ssr: false });

type Props = {
    onLogout: () => void;
    onJoin: () => void;
    isAuthenticated: boolean;
};

export const RightMenu: React.FC<Props> = ({
   onLogout,
   isAuthenticated,
   onJoin,
}) => {
    return (
        <RightMenuBox>


            <NavLink
                className="menu-item menu-item-contact"
                href={'https://wa.me/962790062196'}
                label={'962 790062196'}
                target={'_blank'}
                iconClass="menu-icon"
                icon={<WhatsApp/>}
            />

            <NavLink
                className="menu-item menu-item-contact"
                href={'tel:+96265344772'}
                label={'962 65344772'}
                intlId={'962 65344772'}
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
