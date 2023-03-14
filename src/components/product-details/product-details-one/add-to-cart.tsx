import React, {useState} from 'react';
import {Plus, Minus} from 'assets/icons/PlusMinus';
import {Button, makeStyles, TextField, withStyles} from "@material-ui/core";
import {useCart} from "../../../contexts/cart/use-cart";

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

export const AddToCart: React.FC<Props> = ({data}) => {

    const classes = useStyles();
    const {addItem, removeItem, getItem} = useCart();
    const [value, setValue] = useState(1);

    const handleAddClick = (e, newValue = null) => {
        e.stopPropagation();
        // addItem(data);
        const currentQty = getItem(data.id)?.quantity || 0;
        const max = data.availableQty - currentQty;
        newValue = newValue || value + 1;
        if (max >= (newValue)) setValue(newValue)
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        let newValue = (value - 1) > 0 ? (value - 1) : 1;
        setValue(newValue)
        // removeItem(data);
    };

    const addToCart = (e) => {
        addItem(data,  value)
        setValue(1)
    }

    const isMaxed = () => {
        const currentQty = getItem(data.id)?.quantity || 0;
        return currentQty >= data.availableQty;
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
                    if (!isNaN(qty) && qty > 0 && qty <= data.availableQty) {
                        handleAddClick(e, qty)
                    }
                }}
                value={value}
                inputProps={
                    {
                        style: {textAlign: 'center'},
                    }
                } // the change is here
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
