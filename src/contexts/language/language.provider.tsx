import React from 'react';

import { IntlProvider } from 'react-intl';
import { InjectRTL } from 'assets/styles/global.style';
import Cookie from 'js-cookie';
import { isRTL, isLocale } from './language.utils';
import { StyleSheetManager } from 'styled-components';
import RTLPlugin from 'stylis-plugin-rtl';

const LanguageContext = React.createContext({} as any);

export const LanguageProvider = ({ children, messages }) => {
    const [locale, setLocale] = React.useState('en');
    const changeLanguage = (newLocale): void => {
        setLocale(newLocale);
        document.documentElement.lang = newLocale;
        Cookie.set('locale', newLocale);
    };
    React.useEffect(() => {
        const localSetting = Cookie.get('locale');
        if (localSetting && isLocale(localSetting)) {
            document.documentElement.lang = localSetting;
            setLocale(localSetting);
        }
    }, [locale]);
    let isRtl = isRTL(locale);

    const StyledManager = StyleSheetManager as unknown as React.ComponentType<React.PropsWithChildren<{ stylisPlugins?: any }>>;

    return (
        <LanguageContext.Provider value={{ locale, changeLanguage, isRtl }}>
            <IntlProvider locale={locale} messages={messages[locale]}>
                <InjectRTL lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
                    <StyledManager stylisPlugins={isRtl ? [RTLPlugin] : []}>
                        {children}
                    </StyledManager>
                </InjectRTL>
            </IntlProvider>
        </LanguageContext.Provider>
    );
};

export const useLocale = () => React.useContext(LanguageContext);
