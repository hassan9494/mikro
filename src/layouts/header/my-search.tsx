import React, {useState, useEffect, useRef} from 'react';
import AsyncSelect from 'react-select/async';
import { useRouter } from "next/router";
import useUser from "data/use-user";
import { AddItemToCart } from "../../components/add-item-to-cart";
import {
    Avatar, Box, Chip,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Button
} from "@mui/material";
import { autocomplete } from "../../data/use-products";
import SearchIcon from '@mui/icons-material/Search';

// Add this custom hook for responsive behavior
const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
            
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowWidth;
};

const renderOptionLabel = (option, onClick, hasAccess) => {
    const item = option.item || option;
    
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
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (e.ctrlKey || e.metaKey) {
                        window.open(`/product/${item.slug}`, '_blank');
                    } else if (e.button === 0 && onClick && item.slug) {
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
                    {item.image && (
                        <Avatar 
                            alt={item.title || item.name || 'Product image'} 
                            src={
                                typeof item.image === 'object' && item.image?.src 
                                    ? item.image.src 
                                    : item.image
                            } 
                        />
                    )}
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Box display="flex" flexDirection="column" width="100%">
                            <Box display="flex" alignItems="center" justifyContent="space-between" minWidth={0}>
                                <Box minWidth={0} style={{ paddingRight: 12 }}>
                                    <Typography component="p" variant="body2" color="textPrimary" noWrap style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.title || item.name || 'Unnamed Product'}
                                    </Typography>
                                </Box>

                                <Box style={{ pointerEvents: 'auto', position: 'relative', zIndex: 2 }}>
                                    {item.hasVariants ? (
                                        'Select Options'
                                    ) : item.availableQty && item.availableQty > 0 ? (
                                        <AddItemToCart data={item} variant={'full'} />
                                    ) : (
                                        'Out Of Stock'
                                    )}
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center" style={{ gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
                                <Typography component="span" variant="body2" color="textSecondary">
                                    <Chip label={'JD ' + (item.sale_price || item.price || 0)} size="small" color='secondary' />
                                </Typography>

                                {hasAccess && item.availableQty !== undefined && (
                                    <Typography component="span" variant="body1" color="textPrimary">
                                        Quantity: <Chip label={item.availableQty} size="small" color='secondary' />
                                    </Typography>
                                )}

                                {hasAccess && item.location && (
                                    <Typography component="span" variant="body2" color="textSecondary">
                                        Location: {item.location || '----'}
                                    </Typography>
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
    const [isMobile, setIsMobile] = useState(false);
    const { user } = useUser();
    const windowWidth = useWindowWidth();
    const selectRef = useRef(null);
    const allowedRoles = ['super', 'admin', 'Manager', 'Product Manager', 'Cashier', 'Distributer', 'Admin cash'];
    const hasAccess = user?.roles?.some(role => allowedRoles.includes(role.name));

        useEffect(() => {
        // Check if mobile based on window width
        setIsMobile(windowWidth < 768);
    }, [windowWidth]);

    // Update the placeholder based on screen width
    const getPlaceholder = () => {
        if (search.length === 1) {
            return 'Type at least 2 characters...';
        }
        
        if (windowWidth >= 990 && windowWidth <= 1200) {
            return 'Search products...'; // Shorter placeholder
        }
        
        return 'Search your product from here'; // Original placeholder
    };

    const normalizeSearchString = (str: string): string => {
        return str
            .trim()
            .replace(/\s+/g, ' ');
    };

        const handleSearch = () => {
        if (search && search.length >= 2) {
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

    const promiseOptions = text => {
        const normalizedText = normalizeSearchString(text);

        if (normalizedText.length < 2) {
            return Promise.resolve([]);
        }

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
            handleSearch();
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

    // CRITICAL FIX: Set maximum z-index for dropdown
    const selectStyles = {
        control: (provided, state) => ({ 
          ...provided, 
            minHeight: 40,
            borderRight: isMobile ? 'none' : provided.borderRight,
            borderRadius: isMobile ? '4px 0 0 4px' : provided.borderRadius,
            '@media (min-width: 990px) and (max-width: 1200px)': {
                minWidth: 150,
            }
        }),
        menu: (provided) => ({ 
            ...provided, 
            zIndex: 2147483647, // Maximum possible z-index
            position: 'absolute',
        }),
        menuPortal: (provided) => ({ 
            ...provided, 
            zIndex: 2147483647, // Maximum possible z-index
        }),
        menuList: (provided) => ({
            ...provided,
            zIndex: 2147483647,
            position: 'relative',
            maxHeight: '400px', // Add max-height for scrolling
            overflowY: 'auto', // Enable vertical scrolling
        }),
        option: (provided) => ({ 
            ...provided, 
            padding: '8px 12px',
            zIndex: 2147483647,
        }),
        container: (provided) => ({ 
            ...provided, 
            position: 'relative',
        }),
        placeholder: (provided) => ({
            ...provided,
            '@media (min-width: 990px) and (max-width: 1200px)': {
                fontSize: '14px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        }),
        input: (provided) => ({
            ...provided,
            '@media (min-width: 990px) and (max-width: 1200px)': {
                fontSize: '14px',
            }
        })
    };

    const menuPortalTarget = (typeof document !== 'undefined') ? document.body : undefined;

    return (
        <div style={{ 
            width: '100%', 
            marginRight: '20px', 
            marginLeft: '20px',
            position: 'relative',
        }} onKeyDown={onKeydown}>
                 <div style={{ 
                display: 'flex', 
                width: '100%',
                alignItems: 'center'
            }}>
                <div style={{ 
                    flex: 1,
                    position: 'relative'
                }}>
            <AsyncSelect
                cacheOptions
                instanceId="header-search"
                defaultOptions={defaultOptions || true}
                value={null}
                inputValue={search}
                getOptionLabel={(data) => data.label}
                formatOptionLabel={(data) => renderOptionLabel(data, onChange, hasAccess)}
                loadOptions={promiseOptions}
                onInputChange={handleInputChange}
                onChange={(option) => {
                    if (option && option.value) {
                        onChange(option.value);
                    }
                }}
                styles={selectStyles}
                menuPortalTarget={menuPortalTarget}
                menuPosition="fixed" // Changed to fixed for proper positioning
                menuPlacement="auto"
                menuShouldBlockScroll={false} // CRITICAL: Changed from true to false to allow page scrolling
                classNamePrefix="select"
                placeholder={getPlaceholder()}
                noOptionsMessage={({ inputValue }) => 
                    inputValue && inputValue.length > 1 
                        ? 'No products found' 
                        : 'Type at least 2 characters...'
                }
                loadingMessage={() => 'Loading...'}
                closeMenuOnScroll={false} // Don't close menu when page scrolls
                captureMenuScroll={false} // Don't capture scroll events
            />
        </div>
          {isMobile && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        disabled={!search || search.length < 2}
                        style={{
                            height: '40px',
                            minWidth: '60px',
                            borderRadius: '0 4px 4px 0',
                            boxShadow: 'none',
                            marginLeft: '-1px',
                            zIndex: 2
                        }}
                    >
                        <SearchIcon />
                    </Button>
                )}
            </div>
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
// } from "@mui/material";
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