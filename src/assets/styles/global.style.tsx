import styled, {createGlobalStyle} from 'styled-components';
import {get, paddingBottom} from 'styled-system';
import css from '@styled-system/css';

export const InjectRTL = styled.div`
  ${({lang}) =>
    (lang === 'ar' || lang === 'he') &&
    `
    font-family: 'Cairo', sans-serif;
    `}
`;

export const GlobalStyle = createGlobalStyle(({theme}) =>
        css({
            '*, *::before, *::after': {
                boxSizing: 'border-box',
            },
            body: {
                margin: 0,
                fontFamily: 'body',
                fontWeight: 'regular',
                fontSize: 'base',
                lineHeight: '1.5',
                backgroundColor: 'white',
                transition: get(theme, 'customs.transition'),
                WebkitTextSizeAdjust: '100%',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textShadow: '1px 1px 1px rgba(0, 0, 0, 0.004)',
                overflow: 'scroll !important',
                paddingRight: '0 !important',
                paddingBottom: '0 !important',
            },
            h1: {
                fontFamily: 'heading',
                fontSize: '5xl',
                fontWeight: 'semiBold',
                margin: 0,
                lineHeight: '1.5',
            },
            h2: {
                fontFamily: 'heading',
                fontSize: '3xl',
                fontWeight: 'semiBold',
                margin: 0,
                lineHeight: '1.5',
            },
            h3: {
                fontFamily: 'heading',
                fontSize: '2xl',
                fontWeight: 'semiBold',
                margin: 0,
            },
            h4: {
                fontFamily: 'heading',
                fontSize: 'xl',
                fontWeight: 'semiBold',
                margin: 0,
            },
            h5: {
                fontFamily: 'heading',
                fontSize: 'md',
                fontWeight: 'semiBold',
                margin: 0,
            },
            h6: {
                fontFamily: 'heading',
                fontSize: 'base',
                fontWeight: 'bold',
                margin: 0,
            },
            'p,span,button,li,div': {
                fontFamily: 'body',
                margin: 0,
            },
            a: {
                fontFamily: 'body',
                textDecoration: 'none',
            },
            ul: {
                margin: 0,
                padding: 0,
            },
            li: {
                listStyle: 'none',
            },
            pre: {
                fontFamily: 'monospace',
                overflowX: 'auto',
                code: {
                    color: 'inherit',
                },
            },
            code: {
                fontFamily: 'monospace',
                fontSize: 'inherit',
            },
            table: {
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: 0,
            },
            th: {
                textAlign: 'left',
                borderBottomStyle: 'solid',
            },
            td: {
                textAlign: 'left',
                borderBottomStyle: 'solid',
            },
            img: {
                maxWidth: '100%',
            },
            '.quick-view-overlay': {
                backgroundColor: 'rgba(0,0,0,.5)',
            },

            '.add-address-modal,.add-contact-modal': {
                boxShadow: '0 10px 40px rgba(0,0,0,0.16)',
                borderRadius: '3px !important',
                '.innerRndComponent': {
                    width: '100%',
                    padding: '30px',
                    height: 'auto',
                    backgroundColor: '#f7f8f9',
                    border: 0,
                    boxSizing: 'border-box',
                },
            },



            '.reuseModalCloseBtn': {
                right: '10px!important',
                backgroundColor: '#ffffff!important',
                color: '#222222!important',
                borderRadius: '15px!important',
                padding: '0 9px!important',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            },

            '.image-item': {
                padding: '0 15px',
            },

            '@media (max-width: 999px)': {
                '.JKzuk': {
                    padding: '0 !important'
                }
            },

            '@media (max-width: 1199px) and (min-width: 991px)': {
                '.image-item': {
                    paddingLeft: '10px',
                    paddingRight: '10px',
                },
            },

            '@media (max-width: 768px)': {
                '.image-item': {
                    paddingLeft: '7.5px',
                    paddingRight: '7.5px',
                },
            },

            '.rc-table-fixed-header .rc-table-scroll .rc-table-header': {
                marginBottom: '0 !important',
                paddingBottom: '0 !important',

                th: {
                    padding: '8px 20px',
                },
            },

            '.drawer-content-wrapper': {
                '*:focus': {
                    outline: 'none',
                },
            },

            '.rc-table-content': {
                border: 0,
            },

            '#modal-root': {
                zIndex: 999999,
                position: 'relative',
            },

            '.rc-drawer, .drawer': {
                outline: 0,
                boxShadow: 'none',
                zIndex: 999999,
                position: 'fixed',
                top: 0,
                left: 0,
                // Ensure drawer content is opaque and visible
                '& .rc-drawer-content, & .rc-drawer-body, & .drawer-content': {
                    background: '#ffffff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    display: 'block',
                    height: '100%',
                },
            },

            // Backdrop/mask for rc-drawer
            '.rc-drawer-mask': {
                backgroundColor: 'rgba(0,0,0,0.45)',
                // Keep mask underneath header but above page content when present
                zIndex: 99998,
            },

            // When modal overlay is used for mobile search, align to top instead of centered
            '.search-modal-mobile-overlay': {
                alignItems: 'flex-start !important',
                justifyContent: 'flex-start !important',
                paddingTop: '60px !important',
            },

            '.search-modal-mobile': {
                transform: 'none!important',
                maxWidth: 'none!important',
                maxHeight: 'none!important',
                top: '0!important',
                left: '0!important',
                background: '#ffffff !important',
                borderRadius: '0!important',
                width: '100% !important',
                height: 'auto !important',
            },

            // Ensure modal overlay aligns to top on small screens (for mobile search)
            '@media (max-width: 990px)': {
                '.modal-overlay.search-modal-mobile-overlay': {
                    alignItems: 'flex-start !important',
                    justifyContent: 'flex-start !important',
                    paddingTop: '60px !important',
                },
                '.drawer__handler': {
                    zIndex: 100000,
                    position: 'relative',
                },
            },


            '.srOnly': {
                border: '0 !important',
                clip: 'rect(1px, 1px, 1px, 1px) !important',
                clipPath: 'inset(50%) !important',
                height: '1px !important',
                margin: '-1px !important',
                overflow: 'hidden !important',
                padding: '0 !important',
                position: 'absolute !important',
                width: '1px !important',
                whiteSpace: 'nowrap !important',
            },
            
            '.footer-logo': {
                maxWidth: '200px',
                height: 'auto',
                filter: 'brightness(0) invert(1)',
                marginBottom: '1rem'

            },

            '@media (min-width: 990px) and (max-width: 1115px)': {
                '.footer-logo': {
                    maxWidth: '160px',
                },
            },

            // Ensure header logo has explicit size to avoid collapsing to 0x0
            "img[alt='Shop Logo'], img[alt='shop logo']": {
                display: 'block',
                width: 'auto',
                height: 40,
                maxHeight: 40,
                minWidth: 40,
                '@media (max-width: 575px)': {
                    height: 32,
                    maxHeight: 32,
                },
            },

//@ts-ignore
            ...theme.globals,
        })
);
