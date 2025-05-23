import React, {useState} from 'react';
import AsyncSelect from 'react-select/async';
import { useRouter } from "next/router";
import useUser from "data/use-user";
import { AddItemToCart } from "../../components/add-item-to-cart";
import {
    Avatar, Box, Chip,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import { autocomplete } from "../../data/use-products"; // ADD THIS IMPORT

const formatOptionLabel = ({ item }, onClick, hasAccess) => {
    return (
        <div style={{ position: 'relative' }}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    cursor: 'pointer'
                }}
                onClick={(e) => {
                    if (e.ctrlKey || e.metaKey) {
                        window.open(`/product/${item.slug}`, '_blank');
                        e.preventDefault();
                    } else if (e.button === 0) {
                        onClick(item.slug);
                    }
                }}
            />

            <ListItem
                alignItems="flex-start"
                style={{ padding: 0, margin: 0, pointerEvents: 'none' }}
                component="div"
            >
                <ListItemAvatar>
                    <Avatar alt={item.title} src={item.image} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Box display="flex">
                            <Box flexGrow={3} className={'d-flex justify-content-between'}>
                                <Typography component="p" variant="body2" color="textPrimary">
                                    {item.title}
                                </Typography>
                                <Typography component="span" variant="body2" color="textSecondary" style={{marginRight:50}}>
                                    <Chip label={'JD ' + (item.sale_price || item.price)} size="small" color='secondary' />
                                </Typography>
                                {hasAccess && (
                                    <>
                                        <Typography component="span" variant="body1" color="textPrimary" style={{ marginRight: 50 }}>
                                            Quantity: <Chip label={item.availableQty} size="small" color='secondary' />
                                        </Typography>
                                        <Typography component="span" variant="body2" color="textSecondary">
                                            Location: {item?.location} / {item.stock_location ?? '----'}
                                        </Typography>
                                    </>
                                )}
                            </Box>
                            <Box
                                style={{
                                    pointerEvents: 'auto',
                                    position: 'relative',
                                    zIndex: 2
                                }}
                            >
                                {item.availableQty ? (
                                    <AddItemToCart data={item} variant={'full'} />
                                ) : (
                                    'Out Of Stock'
                                )}
                            </Box>
                        </Box>
                    }
                />
            </ListItem>
        </div>
    );
};

export default function MySearch({ onSubmit }) {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [defaultOptions, setDefaultOptions] = useState(null);
    const { user } = useUser();
    const allowedRoles = ['super', 'admin', 'Manager', 'Product Manager', 'Cashier', 'Distributer', 'Admin cash'];
    const hasAccess = user?.roles?.some(role => allowedRoles.includes(role.name));

    const normalizeSearchString = (str: string): string => {
        // Keep special characters but prevent XSS and other issues
        return str
            .trim() // Trim whitespace
            .replace(/\s+/g, ' '); // Collapse multiple spaces
    };

    const promiseOptions = text => {
        const normalizedText = normalizeSearchString(text);

        if (normalizedText.length < 2) {
            return Promise.resolve([]);
        }

        // Encode the search text for URL safety
        const encodedSearch = encodeURIComponent(normalizedText);
        return autocomplete({ text: encodedSearch }).then(res => {
            const data = res.data || [];
            const items = data.map(e => ({
                label: e.title,
                value: e.slug,
                item: e
            }));
            setDefaultOptions(items);
            return items;
        });
    };

    const onKeydown = (e) => {
        if (e.key === 'Enter' && search.length >= 2) {
            e.preventDefault();
            const normalizedSearch = normalizeSearchString(search);
            const encodedSearch = encodeURIComponent(normalizedSearch);
            router.push({
                pathname: '/search/[search]',
                query: { search: encodedSearch },
            });
            if (onSubmit) {
                onSubmit();
            }
        }
    };

    const onChange = (slug) => {
        router.push({
            pathname: '/product/[slug]',
            query: { slug },
        });
        if (onSubmit) {
            onSubmit();
        }
    };



    const handleInputChange = (newValue, action) => {
        if (action.action !== "input-blur" && action.action !== "menu-close") {
            setSearch(newValue);
        }
    };

    return (
        <div style={{ width: '100%', marginRight: '20px', marginLeft: '20px' }} onKeyDown={onKeydown}>
            <AsyncSelect
                cacheOptions
                defaultOptions={defaultOptions || true}
                value={null}
                inputValue={search}
                getOptionLabel={(data) => formatOptionLabel(data, onChange, hasAccess)}
                loadOptions={promiseOptions}
                onInputChange={handleInputChange}
                placeholder={
                    search.length === 1 ?
                        'Type at least 2 characters...' :
                        'Search your product from here'
                }
            />
        </div>
    );
}



// import React, {useState} from 'react';
// import AsyncSelect from 'react-select/async';
// import { FormattedMessage, useIntl } from 'react-intl';
// import { autocomplete } from "../../data/use-products";
// import {
//     Avatar, Box, Chip,
//     ListItem,
//     ListItemAvatar,
//     ListItemText,
//     Typography
// } from "@material-ui/core";
// import { AddItemToCart } from "../../components/add-item-to-cart";
// import { useRouter } from "next/router";
// import useUser from "data/use-user";
//
// const formatOptionLabel = ({ item }, onClick, hasAccess) => {
//     return (
//         <div style={{ position: 'relative' }}>
//             {/* Clickable product row */}
//             <div
//                 style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     zIndex: 1,
//                     cursor: 'pointer'
//                 }}
//                 onClick={(e) => {
//                     if (e.ctrlKey || e.metaKey) {
//                         window.open(`/product/${item.slug}`, '_blank');
//                         e.preventDefault();
//                     } else if (e.button === 0) { // Left click only
//                         onClick(item.slug);
//                     }
//                 }}
//             />
//
//             {/* Visible content */}
//             <ListItem
//                 alignItems="flex-start"
//                 style={{ padding: 0, margin: 0, pointerEvents: 'none' }}
//                 component="div"
//             >
//                 <ListItemAvatar>
//                     <Avatar alt={item.title} src={item.image} />
//                 </ListItemAvatar>
//                 <ListItemText
//                     primary={
//                         <Box display="flex">
//                             <Box flexGrow={3} className={'d-flex justify-content-between'}>
//                                 <Typography component="p" variant="body2" color="textPrimary">
//                                     {item.title}
//                                 </Typography>
//                                 <Typography component="span" variant="body2" color="textSecondary" style={{marginRight:50}}>
//                                     <Chip label={'JD ' + (item.sale_price || item.price)} size="small" color='secondary' />
//                                 </Typography>
//                                 {hasAccess && (
//                                     <>
//                                         <Typography component="span" variant="body1" color="textPrimary" style={{ marginRight: 50 }}>
//                                             Quantity: <Chip label={item.availableQty} size="small" color='secondary' />
//                                         </Typography>
//                                         <Typography component="span" variant="body2" color="textSecondary">
//                                             Location: {item?.location}
//                                         </Typography>
//                                     </>
//                                 )}
//                             </Box>
//                             {/* Add to Cart - completely clickable */}
//                             <Box
//                                 style={{
//                                     pointerEvents: 'auto',
//                                     position: 'relative',
//                                     zIndex: 2
//                                 }}
//                             >
//                                 {item.availableQty ? (
//                                     <AddItemToCart data={item} variant={'full'} />
//                                 ) : (
//                                     <FormattedMessage id='outOfStock' defaultMessage='Out Of Stock' />
//                                 )}
//                             </Box>
//                         </Box>
//                     }
//                 />
//             </ListItem>
//         </div>
//     );
// };

// export default function MySearch({ onSubmit }) {
//     const intl = useIntl();
//     const router = useRouter();
//     const [search, setSearch] = useState('');
//     const [defaultOptions, setDefaultOptions] = useState(null);
//     const { user } = useUser();
//     const allowedRoles = ['super', 'admin', 'Manager', 'Product Manager', 'Cashier', 'Distributer', 'Admin cash'];
//
//     // Check if user has any of the allowed roles
//     const hasAccess = user?.roles?.some(role => allowedRoles.includes(role.name));
//
//     const promiseOptions = text => autocomplete({ text }).then(res => {
//         const data = res.data || [];
//         const items = data.map(e => ({
//             label: e.title,
//             value: e.slug,
//             item: e
//         }));
//         setDefaultOptions(items);
//         return items;
//     });
//
//     const onChange = (slug) => {
//         router.push({
//             pathname: '/product/[slug]',
//             query: { slug },
//         });
//         if (onSubmit) {
//             onSubmit(); // Call onSubmit to close modal
//         }
//     };
//
//     const onKeydown = (e) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             router.push({
//                 pathname: '/search/[search]',
//                 query: { search },
//             });
//             if (onSubmit) {
//                 onSubmit(); // Call onSubmit to close modal
//             }
//         }
//     };
//
//     const handleInputChange = (newValue, action) => {
//         if (action.action !== "input-blur" && action.action !== "menu-close") {
//             setSearch(newValue);
//         }
//     };
//
//     return (
//         <div style={{ width: '100%', marginRight: '20px', marginLeft: '20px' }} onKeyDown={onKeydown}>
//             <AsyncSelect
//                 cacheOptions
//                 defaultOptions={defaultOptions || true}
//                 value={null}
//                 inputValue={search}
//                 getOptionLabel={(data) => formatOptionLabel(data, onChange, hasAccess)}
//                 loadOptions={promiseOptions}
//                 onInputChange={handleInputChange}
//                 placeholder={
//                     intl.formatMessage({
//                         id: 'searchPlaceholder',
//                         defaultMessage: 'Search your product from here',
//                     })
//                 }
//             />
//         </div>
//     );
// }