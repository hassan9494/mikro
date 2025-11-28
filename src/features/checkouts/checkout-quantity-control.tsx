import React from 'react';
import {Plus, Minus} from 'assets/icons/PlusMinus';
import {Box, Button, makeStyles, TextField, withStyles} from "@material-ui/core";
import {useCart} from "../../contexts/cart/use-cart";

interface Props {
    data: any;
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

export const CheckoutQuantityControl: React.FC<Props> = ({data}) => {

    const classes = useStyles();
    const {addItem, removeItem, getItem} = useCart();

    // Get current quantity and available quantity
    const itemInCart = getItem(data.baseProductId || data.id, data.variantId || null);
    const currentQuantity = itemInCart?.quantity || data.quantity;
    const availableQty = data.availableQty || 0;

    // Check if we can add more items
    const canAddMore = currentQuantity < availableQty;


    const handleAddClick = (e) => {
        e.stopPropagation();
        if (canAddMore) {
            addItem(data);
        }

    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        removeItem(data);
    };

    const handleInputChange = (e) => {
        const qty = Number(e.target.value);
        if (!isNaN(qty) && qty > 0 && qty <= availableQty) {
            addItem(data, (qty - currentQuantity));
        }
    };


    return (
        <Box display='flex'>
            <Button
                variant='contained'
                onClick={handleRemoveClick}
                size='small'
                disableElevation
                style={{borderRadius: 0}}
            >

            <Minus/>
            </Button>
            <CustomTextField
                type='tel'
                variant='outlined'
                className='cart-quantity-input'
                size='small'
                style={{width: 60}}
                onChange={handleInputChange}
                value={currentQuantity}
                inputProps={{
                    style: {textAlign: 'center'},
                }}

            />
            <Button
                variant='contained'
                onClick={handleAddClick}
                size='small'
                disableElevation
                style={{borderRadius: 0}}
                disabled={!canAddMore}
            >

            <Plus/>
            </Button>
        </Box>
    );
};
