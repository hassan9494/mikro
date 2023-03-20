import React, {useState} from 'react';
import AsyncSelect from 'react-select/async';
import { FormattedMessage, useIntl } from 'react-intl';
import { autocomplete } from "../../data/use-products";
import {
    Avatar, Box, Chip,
    createStyles,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles, Theme,
    Typography
} from "@material-ui/core";
import { AddItemToCart } from "../../components/add-item-to-cart";
import { useRouter } from "next/router";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        image: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    }),
);



const formatOptionLabel = ({ item }, onClick) => {
    return (
        <ListItem alignItems="flex-start" style={{padding: 0, margin: 0}} onClick={() => onClick(item.slug)}>
            <ListItemAvatar>
                <Avatar alt={item.title} src={item.image} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Typography
                                component="p"
                                variant="body2"
                                color="textPrimary"
                            >
                                { item.title }
                            </Typography>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textSecondary"
                            >
                                <Chip label={ 'JD ' + (item.sale_price ||item.price) } size="small" color='secondary' />
                            </Typography>
                        </Box>
                        <Box>
                            {
                                item.availableQty ?
                                    <AddItemToCart data={item} variant={'full'}/>:
                                    <FormattedMessage id='outOfStock' defaultMessage='Out Of Stock' />
                            }

                        </Box>
                    </Box>
                }
            />
        </ListItem>
    );
};

export default function MySearch ()
{
    const intl = useIntl();
    const router = useRouter();
    const { pathname, query } = router;
    const [search, setSearch] = useState();
    const [defaultOptions, setDefaultOptions] = useState(null);


    const promiseOptions = text => autocomplete({text}).then(res => {
        const data = res.data || [];
        const items = data.map(e => {
            return {
                label: e.title, value: e.slug, item: e
            }
        })
        setDefaultOptions(items);
        return items;
    });

    const onChange = (slug) => {
        router.push({
            pathname: '/product/[slug]',
            query: { slug },
        });
    };

    const onKeydown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            router.push({
                pathname: '/search/[search]',
                query: { search },
            });
        }
    }
    const handleInputChange = (newValue, action) => {
        if (action.action !== "input-blur" && action.action !== "menu-close") {
            setSearch(newValue)
        }
    };

    return (
        <div style={{width: '100%', marginRight: '20px', marginLeft: '20px'}} onKeyDown={onKeydown}>
            <AsyncSelect
                cacheOptions
                defaultOptions={defaultOptions || true}
                value={null}
                inputValue={search}
                getOptionLabel={(data) => formatOptionLabel(data, onChange)}
                loadOptions={promiseOptions}
                onInputChange={handleInputChange}
                placeholder={
                    intl.formatMessage({
                        id: 'searchPlaceholder',
                        defaultMessage: 'Search your product from here',
                    })
                }
            />
        </div>
    );
}
