import React, {useState, useEffect, useRef, useCallback} from 'react';
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

// Add TypeScript interfaces
interface ProductItem {
    title: string;
    slug: string;
    image?: string | { src: string };
    sale_price?: number;
    price?: number;
    availableQty?: number;
    location?: string;
    hasVariants?: boolean;
    name?: string;
}

interface SelectOption {
    label: string;
    value: string;
    item: ProductItem;
}

// Create the useDebounce hook inline
const useDebounce = (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// Custom hook for window width
const useWindowWidth = (): number => {
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

const renderOptionLabel = (option: SelectOption, onClick: (slug: string) => void, hasAccess: boolean) => {
    const item = option.item;

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
                                    : typeof item.image === 'string' ? item.image : undefined
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

interface MySearchProps {
    onSubmit: () => void;
}

const MySearch: React.FC<MySearchProps> = ({ onSubmit }) => {
    const router = useRouter();
    const [search, setSearch] = useState<string>('');
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const { user } = useUser();
    const windowWidth = useWindowWidth();
    const selectRef = useRef<any>(null);

    // Cache for storing search results
    const cacheRef = useRef<Record<string, SelectOption[]>>({});

    // Timeout reference for debouncing
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Track if component is mounted
    const isMountedRef = useRef<boolean>(true);

    const allowedRoles = ['super', 'admin', 'Manager', 'Product Manager', 'Cashier', 'Distributer', 'Admin cash'];
    const hasAccess = user?.roles?.some(role => allowedRoles.includes(role.name));

    // Use debounce for search input (300ms delay)
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        // Check if mobile based on window width
        setIsMobile(windowWidth < 768);

        // Set mounted ref
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
            // Clean up timeout on unmount
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [windowWidth]);

    // Update the placeholder based on screen width
    const getPlaceholder = (): string => {
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

    const handleSearch = (): void => {
        if (search && search.length >= 2) {
            const normalizedSearch = normalizeSearchString(search);
            const encodedSearch = encodeURIComponent(normalizedSearch);
            if (selectRef.current) {
                selectRef.current.blur(); // This will close the dropdown
            }
            router.push({
                pathname: '/search/[search]',
                query: { search: encodedSearch },
            });
            if (onSubmit) {
                onSubmit();
            }
        }
    };

    // Create a debounced and cached version of the autocomplete function
    const debouncedAutocomplete = useCallback((inputValue: string): Promise<SelectOption[]> => {
        return new Promise((resolve) => {
            const normalizedText = normalizeSearchString(inputValue);

            if (normalizedText.length < 2) {
                resolve([]);
                return;
            }

            // Check cache first
            if (cacheRef.current[normalizedText]) {
                resolve(cacheRef.current[normalizedText]);
                return;
            }

            // Clear previous timeout
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }

            // Set new timeout for debouncing
            debounceTimeoutRef.current = setTimeout(() => {
                const encodedSearch = encodeURIComponent(normalizedText);

                // Call the original autocomplete function
                autocomplete({ text: encodedSearch })
                    .then(res => {
                        const data = res.data || [];
                        const items: SelectOption[] = data.map((e: any) => ({
                            label: e.title,
                            value: e.slug,
                            item: e
                        }));

                        // Only cache if component is still mounted
                        if (isMountedRef.current) {
                            cacheRef.current[normalizedText] = items;
                        }

                        resolve(items);
                    })
                    .catch(error => {
                        console.error('Autocomplete error:', error);
                        resolve([]);
                    });
            }, 300); // 300ms debounce delay
        });
    }, []);

    const onChange = (slug: string): void => {
        // Close the dropdown before navigating
        if (selectRef.current) {
            selectRef.current.blur(); // Close dropdown
        }

        // Then navigate
        router.push({
            pathname: '/product/[slug]',
            query: { slug },
        });
        if (onSubmit) {
            onSubmit();
        }
    };

    const handleInputChange = (newValue: string, action: any): void => {
        if (action.action !== "input-blur" && action.action !== "menu-close") {
            setSearch(newValue);
        }
    };

    // CRITICAL FIX: Set maximum z-index for dropdown
    const selectStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            minHeight: 40,
            borderRight: isMobile ? 'none' : provided.borderRight,
            borderRadius: isMobile ? '4px 0 0 4px' : provided.borderRadius,
            '@media (min-width: 990px) and (max-width: 1200px)': {
                minWidth: 150,
            }
        }),
        menu: (provided: any) => ({
            ...provided,
            zIndex: 2147483647, // Maximum possible z-index
            position: 'absolute',
        }),
        menuPortal: (provided: any) => ({
            ...provided,
            zIndex: 2147483647, // Maximum possible z-index
        }),
        menuList: (provided: any) => ({
            ...provided,
            zIndex: 2147483647,
            position: 'relative',
            maxHeight: '400px', // Add max-height for scrolling
            overflowY: 'auto', // Enable vertical scrolling
        }),
        option: (provided: any) => ({
            ...provided,
            padding: '8px 12px',
            zIndex: 2147483647,
        }),
        container: (provided: any) => ({
            ...provided,
            position: 'relative',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            '@media (min-width: 990px) and (max-width: 1200px)': {
                fontSize: '14px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        }),
        input: (provided: any) => ({
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
        }}>
            <div style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center'
            }}>
                <div style={{
                    flex: 1,
                    position: 'relative'
                }}>
                    <AsyncSelect<SelectOption>
                        ref={selectRef}
                        cacheOptions
                        instanceId="header-search"
                        defaultOptions={[]}
                        value={null}
                        inputValue={search}
                        getOptionLabel={(data: SelectOption) => data.label}
                        formatOptionLabel={(data: SelectOption) => renderOptionLabel(data, onChange, hasAccess || false)}
                        loadOptions={debouncedAutocomplete}
                        onInputChange={handleInputChange}
                        onChange={(option: SelectOption | null) => {
                            if (option && option.value) {
                                onChange(option.value);
                            }
                        }}
                        styles={selectStyles}
                        menuPortalTarget={menuPortalTarget}
                        menuPosition="fixed"
                        menuPlacement="auto"
                        menuShouldBlockScroll={false}
                        classNamePrefix="select"
                        placeholder={getPlaceholder()}
                        noOptionsMessage={({ inputValue }: { inputValue: string }) =>
                            inputValue && inputValue.length > 1
                                ? 'No products found'
                                : 'Type at least 2 characters...'
                        }
                        loadingMessage={() => 'Loading...'}
                        closeMenuOnScroll={false}
                        captureMenuScroll={false}
                        // Handle Enter key
                        onKeyDown={(e: React.KeyboardEvent) => {
                            // If Enter is pressed, trigger search
                            if (e.key === 'Enter' && search.length >= 2) {
                                handleSearch();
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }}
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
};

export default MySearch;

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