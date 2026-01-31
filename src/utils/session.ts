import jsCookie from 'js-cookie';
import cookie from 'cookie';

const isBrowser = typeof window !== 'undefined';

export const getCookieFromBrowser = (key: string): any => {
    return jsCookie.get(key);
};

export const getCookieFromServer = (ctx: any, key = 'id_token') => {
    // ctx is the Next.js context for getServerSideProps/getInitialProps
    const req = ctx && (ctx.req || ctx.request);
    if (!req) return null;
    const raw = req.headers && req.headers.cookie;
    if (!raw) return null;
    const parsed = cookie.parse(raw || '');
    return parsed[key] || null;
};

export const getCookie = (key: string, context?: any) => {
    return isBrowser
        ? getCookieFromBrowser(key)
        : getCookieFromServer(context, key);
};

export const setCookie = (key: string, token: any) => {
    jsCookie.set(key, token, { expires: 7 });
};

export const removeCookie = (key: string) => {
    jsCookie.remove(key);
};
