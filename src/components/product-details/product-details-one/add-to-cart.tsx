import React, { useState } from 'react';
import { Plus, Minus } from 'assets/icons/PlusMinus';
import { Button, TextField, styled } from "@mui/material";
import { useCart } from "../../../contexts/cart/use-cart";

interface Props {
    data: any;
    variant?: any;
}

// Styled TextField with custom styles (replaces withStyles)
const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: 0,
        },
    },
    '& *': {
        boxSizing: 'content-box !important',
    },
});

export const AddToCart: React.FC<Props> = ({ data, variant }) => {
    const { addItem, getItem } = useCart();
    const [value, setValue] = useState(1);

    const itemInCart = getItem(data.id, variant?.color_id || null);
    const currentQty = itemInCart?.quantity || 0;

    const handleAddClick = (e, newValue = null) => {
        e.stopPropagation();
        const max = (variant?.availableQty || data.availableQty) - currentQty;
        newValue = newValue || value + 1;
        if (max >= newValue) setValue(newValue);
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        setValue(prev => (prev - 1 > 0 ? prev - 1 : 1));
    };

    const addToCart = (e) => {
        const item = {
            ...data,
            ...(variant || {}),
            baseProductId: data.id,
            variantId: variant?.color_id || null,
            id: data.id,
            baseTitle: data.title,
            title: variant ? variant.name : data.title,
        };
        addItem(item, value);
        setValue(1);
    };

    const isMaxed = () => {
        return currentQty >= (variant?.availableQty || data.availableQty);
    };

    return (
        <>
            <Button variant='contained' onClick={handleRemoveClick} size='small' disableElevation style={{ borderRadius: 0 }}>
                <Minus />
            </Button>
            <CustomTextField
                type='tel'
                variant='outlined'
                className='cart-quantity-input'
                size='small'
                sx={{ width: 60 }}                // use sx instead of inline style for consistency
                onChange={e => {
                    const qty = Number(e.target.value);
                    if (!isNaN(qty) && qty > 0 && qty <= (variant?.availableQty || data.availableQty)) {
                        handleAddClick(e, qty);
                    }
                }}
                value={value}
                inputProps={{ style: { textAlign: 'center' } }}
            />
            <Button variant='contained' onClick={handleAddClick} size='small' disableElevation style={{ borderRadius: 0, marginRight: 10 }}>
                <Plus />
            </Button>
            <Button
                variant='contained'
                color='primary'
                disableElevation
                disabled={isMaxed()}
                style={{ borderRadius: 0 }}
                onClick={addToCart}
            >
                Add To Cart
            </Button>
        </>
    );
};