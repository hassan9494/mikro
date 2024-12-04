export const HOME_PAGE = '/';
export const COURSES_PAGE = '/courses';
export const SERVICES_PAGE = '/services';
export const TUTORIALS_PAGE = '/tutorials';

export const GROCERY_PAGE = '/grocery';
export const GROCERY_PAGE_TWO = '/grocery-two';
export const MAKEUP_PAGE = '/makeup';
export const CLOTHING_PAGE = '/clothing';
export const BAGS_PAGE = '/bags';
export const BAKERY_PAGE = '/bakery';
export const BOOK_PAGE = '/book';
export const FURNITURE_PAGE = '/furniture';
export const FURNITURE_PAGE_TWO = '/furniture-two';
export const MEDICINE_PAGE = '/medicine';
export const RESTAURANT_PAGE = '/restaurant';
export const REQUEST_MEDICINE_PAGE = '/request-medicine';
export const CHECKOUT_PAGE = '/checkout';
export const CHECKOUT_PAGE_TWO = '/checkout-alternative';
export const PROFILE_PAGE = '/profile';
export const YOUR_ORDER_PAGE = '/order';
export const ORDER_RECEIVED_PAGE = '/order-received';
export const OFFER_PAGE = '/offer';
export const HELP_PAGE = '/help';
export const TERMS_AND_SERVICES_PAGE = '/terms';
export const PRIVACY_POLICY_PAGE = '/privacy';
// Mobile Drawer Menus

export const HOME_MENU_ITEM = {
    id: 'nav.home',
    defaultMessage: 'Home',
    href: HOME_PAGE,
};

export const HELP_MENU_ITEM = {
    id: 'nav.help',
    defaultMessage: 'Help',
    href: HELP_PAGE,
};
export const OFFER_MENU_ITEM = {
    id: 'nav.offer',
    defaultMessage: 'Offer',
    href: OFFER_PAGE,
};
export const ORDER_MENU_ITEM = {
    id: 'nav.order',
    href: YOUR_ORDER_PAGE,
    defaultMessage: 'Order',
};
export const REQUEST_MEDICINE_MENU_ITEM = {
    id: 'nav.request_medicine',
    defaultMessage: 'Request Medicine',
    href: REQUEST_MEDICINE_PAGE,
};
export const PROFILE_MENU_ITEM = {
    id: 'nav.profile',
    defaultMessage: 'Profile',
    href: PROFILE_PAGE,
};
export const AUTHORIZED_MENU_ITEMS = [
    PROFILE_MENU_ITEM,
    ORDER_MENU_ITEM,
    // {
    //     id: 'nav.terms_and_services',
    //     defaultMessage: 'Terms and Services',
    //     href: TERMS_AND_SERVICES_PAGE,
    // },
    // {
    //     id: 'nav.privacy_policy',
    //     defaultMessage: 'Privacy Policy',
    //     href: PRIVACY_POLICY_PAGE,
    // },
];
// category menu items for header navigation
export const CATEGORY_MENU_ITEMS = [
    {
        id: 'Home',
        href: HOME_PAGE,
        defaultMessage: 'Home',
        icon: 'Home',
        dynamic: true,
    },
    {
        id: 'Courses',
        href: COURSES_PAGE,
        defaultMessage: 'Courses',
        icon: 'Course',
        dynamic: false,
    },
    {
        id: 'Services',
        href: SERVICES_PAGE,
        defaultMessage: 'Services',
        icon: 'Service',
        dynamic: false,
    },
    {
        id: 'Tutorials',
        defaultMessage: 'Tutorials',
        href: TUTORIALS_PAGE,
        icon: 'Tutorial',
        dynamic: true,
    },
];


export const MOBILE_DRAWER_MENU = [
    HOME_MENU_ITEM,
    ...AUTHORIZED_MENU_ITEMS,
    HELP_MENU_ITEM,
    OFFER_MENU_ITEM,
];

export const PROFILE_SIDEBAR_TOP_MENU = [ORDER_MENU_ITEM, HELP_MENU_ITEM];
export const PROFILE_SIDEBAR_BOTTOM_MENU = [PROFILE_MENU_ITEM];

export const LANGUAGE_MENU = [
    {
        id: 'ar',
        defaultMessage: 'Arabic',
        icon: 'SAFlag',
    },
    // {
    //     id: 'zh',
    //     defaultMessage: 'Chinese',
    //     icon: 'CNFlag',
    // },
    {
        id: 'en',
        defaultMessage: 'English',
        icon: 'USFlag',
    },
    // {
    //     id: 'de',
    //     defaultMessage: 'German',
    //     icon: 'DEFlag',
    // },
    // {
    //     id: 'he',
    //     defaultMessage: 'Hebrew',
    //     icon: 'ILFlag',
    // },
    // {
    //     id: 'es',
    //     defaultMessage: 'Spanish',
    //     icon: 'ESFlag',
    // },
];
