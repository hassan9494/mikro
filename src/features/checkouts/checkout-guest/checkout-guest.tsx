import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import CheckoutWrapper, {
    CheckoutContainer,
    CheckoutInformation,
    CheckoutSubmit,
    TermConditionText,
    TermConditionLink
} from './checkout-guest.style';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';
import { Card, CardContent, FormControl, TextField, CardHeader, Divider, Button } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { order } from 'data/use-orders';
import useTranslation from 'utils/use-translation';
import { toast } from "react-toastify";
import { useAppDispatch } from "contexts/app/app.provider";
import useCities from "data/use-city";
import { Autocomplete } from '@mui/material';
import CheckoutCart from "../checkout-cart";

// The type of props Checkout Form receives
interface MyFormProps {
}


const useStyles = makeStyles((theme) => ({
    margin: {
        marginBottom: theme.spacing(2),
    },
}));

const CheckoutWithSidebar: React.FC<MyFormProps> = () => {

    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { data: cities } = useCities();
    const {
        items,
        clearCart,
        cartItemsCount,
        calculatePrice,
        coupon
    } = useCart();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState(null);

    const [shippingCost, setShippingCost] = useState(0);

    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid) return;

        setLoading(true);
        const data = {
            customer: {
                name, phone, email,
            },
            coupon_id: coupon?.id,
            city_id: city.id,
            shipping: {
                address
            },
            notes:notes,
            products: items.map(item => ({
                id: item.variantId || item.baseProductId,  // Use baseProductId instead of id
                // variant_id: item.variantId || null,
                quantity: item.quantity
            }))      }
        try {
            const res = await order.create(data);
            toast.success('Order received');
            dispatch({ type: 'RECEIVED_ORDER', payload: res });
            clearCart();
            await Router.push('/order-received');
        } catch (e) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setShippingCost(Number.parseFloat(city?.shipping_cost || 0));
        if (
            calculatePrice() > 0 && cartItemsCount > 0
        ) {
            setIsValid(true);
        }
    }, [city]);

    return (

        <CheckoutWrapper>
            <CheckoutContainer>

                <CheckoutInformation>
                    <CheckoutCart shippingCost={shippingCost} onPrepareOrderData={undefined}/>
                </CheckoutInformation>

                <CheckoutInformation>

                    <Card variant="outlined" className={classes.margin}>

                        <CardHeader
                            title={t('checkoutDeliveryAddress')}
                        />

                        <Divider/>

                        <CardContent>

                            <form onSubmit={handleSubmit}>

                                <FormControl fullWidth variant="outlined" className={classes.margin}>
                                    <TextField
                                        label={t('namePlaceholder')}
                                        variant="outlined"
                                        fullWidth
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                </FormControl>

                                <FormControl fullWidth variant="outlined" className={classes.margin}>
                                    <TextField
                                        required
                                        type="email"
                                        label={t('emailPlaceholder')}
                                        variant="outlined"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl fullWidth variant="outlined" className={classes.margin}>
                                    <TextField
                                        label={t('phonePlaceholder')}
                                        variant="outlined"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        required
                                    />
                                </FormControl>

                                <FormControl fullWidth variant="outlined" className={classes.margin}>
                                    <Autocomplete
                                        options={cities}
                                        getOptionLabel={(e) => e['name']}
                                        onChange={(event, newValue) => {
                                            setCity(newValue)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                required
                                                label={t('cityPlaceholder')}
                                                variant="outlined"
                                                {...params}
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autocomplete: 'off',
                                                }}
                                            />
                                        }
                                    />
                                </FormControl>

                                <FormControl fullWidth variant="outlined" className={classes.margin}>
                                    <TextField
                                        label={t('addressPlaceholder')}
                                        variant="outlined"
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                    />
                                </FormControl>


                                <FormControl fullWidth variant="outlined" className={classes.margin}>
                                    <TextField
                                        label={t('notesPlaceholder')}
                                        multiline
                                        minRows={4} // Changed from rows to minRows
                                        variant="outlined"
                                        value={notes}
                                        onChange={e => setNotes(e.target.value)}
                                    />
                                </FormControl>

                                <TermConditionText>
                                    <FormattedMessage
                                        id='termAndConditionHelper'
                                        defaultMessage='By making this purchase you agree to our'
                                    />
                                    <Link href='#'>
                                        <TermConditionLink>
                                            <FormattedMessage
                                                id='termAndCondition'
                                                defaultMessage='terms and conditions.'
                                            />
                                        </TermConditionLink>
                                    </Link>
                                </TermConditionText>

                                {/* CheckoutSubmit */}
                                <CheckoutSubmit>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={loading || !isValid}
                                        // loading={loading}
                                        disableElevation
                                        fullWidth
                                    >
                                        <FormattedMessage
                                            id='processCheckout'
                                            defaultMessage='Proceed to Checkout'
                                        />
                                    </Button>

                                </CheckoutSubmit>
                            </form>

                        </CardContent>

                    </Card>

                </CheckoutInformation>

            </CheckoutContainer>
        </CheckoutWrapper>

    );
};

export default CheckoutWithSidebar;
