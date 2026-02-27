import React, { useContext } from 'react';
import Router from 'next/router';
import { AuthContext } from 'contexts/auth/auth.context';
import {
    SidebarWrapper,
    SidebarTop,
    SidebarBottom,
    SidebarMenu,
    LogoutButton,
} from './sidebar.style';
import { FormattedMessage } from 'react-intl';
import {
    PROFILE_SIDEBAR_TOP_MENU,
    PROFILE_SIDEBAR_BOTTOM_MENU,
} from 'site-settings/site-navigation';

const MENU_ICONS: Record<string, React.ReactNode> = {
    'nav.order': <i className="bi bi-bag" style={{ fontSize: '16px' }} />,
    'nav.help': <i className="bi bi-question-circle" style={{ fontSize: '16px' }} />,
    'nav.profile': <i className="bi bi-person" style={{ fontSize: '16px' }} />,
};

const SidebarCategory: React.FC<{}> = () => {
    const { authDispatch } = useContext<any>(AuthContext);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            authDispatch({ type: 'SIGN_OUT' });
            Router.push('/');
        }
    };
    return (
        <>
            <SidebarWrapper>
                <SidebarTop>
                    {PROFILE_SIDEBAR_TOP_MENU.map((item, index) => (
                        <SidebarMenu href={item.href} key={index} intlId={item.id}
                                     icon={MENU_ICONS[item.id]}
                        />
                    ))}
                </SidebarTop>

                <SidebarBottom>
                    {PROFILE_SIDEBAR_BOTTOM_MENU.map((item, index) => (
                        <SidebarMenu href={item.href} key={index} intlId={item.id}
                                     icon={MENU_ICONS[item.id]}
                        />
                    ))}
                    <LogoutButton type="button" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right" style={{ marginRight: '10px', fontSize: '16px' }} />
                        <FormattedMessage id="nav.logout" defaultMessage="Logout"/>
                    </LogoutButton>
                </SidebarBottom>
            </SidebarWrapper>
        </>
    );
};

export default SidebarCategory;
