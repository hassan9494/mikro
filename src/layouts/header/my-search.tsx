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
                                            Location: {item?.location}
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
        return str
            .toLowerCase()
            .replace(/[-/\_()+=.,]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    };

    const promiseOptions = text => {
        const normalizedText = normalizeSearchString(text);

        if (normalizedText.length < 2) {
            return Promise.resolve([]);
        }

        return autocomplete({ text: normalizedText }).then(res => {
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

    const onChange = (slug) => {
        router.push({
            pathname: '/product/[slug]',
            query: { slug },
        });
        if (onSubmit) {
            onSubmit();
        }
    };

    const onKeydown = (e) => {
        if (e.key === 'Enter' && search.length >= 2) {
            e.preventDefault();
            const normalizedSearch = normalizeSearchString(search);
            router.push({
                pathname: '/search/[search]',
                query: { search: normalizedSearch },
            });
            if (onSubmit) {
                onSubmit();
            }
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