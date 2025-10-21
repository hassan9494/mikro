import React, {useState} from 'react';
import {Plus, Minus} from 'assets/icons/PlusMinus';
import {Button, makeStyles, TextField, withStyles} from "@material-ui/core";
import {useCart} from "../../../contexts/cart/use-cart";

interface Props {
    data: any;
    variant?: any; // Add variant prop if needed
}
const useStyles = makeStyles((theme) => ({
    input: {
        borderRadius: 0,
    },
}));

const CustomTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: `0px`,
            },
        },
    },
})(TextField);

export const AddToCart: React.FC<Props> = ({data, variant}) => {
    const classes = useStyles();
    const {addItem, removeItem, getItem} = useCart();
    const [value, setValue] = useState(1);

    // Generate unique ID for cart items
    const getCartItemId = () => {
        return variant?.color_id ? `${variant.color_id}` : data.id;
    };

    const cartItemId = getCartItemId();
    const itemInCart = getItem(data.id, variant?.color_id || null);
    const currentQty = itemInCart?.quantity || 0;

    const handleAddClick = (e, newValue = null) => {
        e.stopPropagation();
        const max = (variant?.availableQty || data.availableQty) - currentQty;
        newValue = newValue || value + 1;
        if (max >= newValue) setValue(newValue)
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        let newValue = (value - 1) > 0 ? (value - 1) : 1;
        setValue(newValue)
    };

    const addToCart = (e) => {
        // Create item with the exact same structure as handleAddToCart
        const item = {
            ...data,
            ...(variant || {}),
            baseProductId: data.id,
            variantId: variant?.color_id || null,
            id: data.id, // Always use the base product ID
            baseTitle: data.title,
            title: variant
                ? variant.name
                : data.title,
        };

        console.log("Adding to cart:", item);
        addItem(item, value);
        setValue(1);
    }

    const isMaxed = () => {
        return currentQty >= (variant?.availableQty || data.availableQty);
    }

    return (
        <>
            <Button variant='contained' onClick={handleRemoveClick} size='small' disableElevation style={{borderRadius: 0}}>
                <Minus/>
            </Button>
            <CustomTextField
                type='tel'
                variant='outlined'
                className='cart-quantity-input'
                size='small'
                style={{width: 60}}
                onChange={e => {
                    const qty = Number(e.target.value)
                    if (!isNaN(qty) && qty > 0 && qty <= (variant?.availableQty || data.availableQty)) {
                        handleAddClick(e, qty)
                    }
                }}
                value={value}
                inputProps={{
                    style: {textAlign: 'center'},
                }}
            />
            <Button variant='contained' onClick={handleAddClick} size='small' disableElevation style={{borderRadius: 0, marginRight: 10}}>
                <Plus/>
            </Button>
            <Button
                variant='contained'
                color='primary'
                disableElevation
                disabled={isMaxed()}
                style={{borderRadius: 0}}
                onClick={addToCart}
            >
                Add To Cart
            </Button>
        </>
    );
};