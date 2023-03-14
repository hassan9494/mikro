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
    const {addItem, removeItem} = useCart();

    const handleAddClick = (e) => {
        e.stopPropagation();
        addItem(data);
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        removeItem(data);
    };

    return (
        <Box display='flex'>
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
                    if (!isNaN(qty) && qty > 0 && qty <= data.availableQty) {
                        addItem(data, (qty - data.quantity))
                    }
                }}
                value={data.quantity}
                inputProps={
                    {
                        style: {textAlign: 'center'},
                    }
                } // the change is here
            />
            <Button variant='contained' onClick={handleAddClick} size='small' disableElevation style={{borderRadius: 0}}>
                <Plus/>
            </Button>
        </Box>
    );
};
