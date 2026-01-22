import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import CheckoutWrapper, {
    CheckoutContainer,
    CheckoutInformation,
    CheckoutSubmit,
    TermConditionText,
    TermConditionLink
} from '../checkout-guest/checkout-guest.style';
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
import useUser from "../../../data/use-user";

interface MyFormProps {
    user?: any;
}

const useStyles = makeStyles((theme) => ({
    margin: {
        marginBottom: theme.spacing(2),
    },
    header: {
        backgroundColor: '#f5f5f5',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        borderRadius: theme.spacing(1),
    },
    note: {
        fontStyle: 'italic',
        color: '#666',
        marginBottom: theme.spacing(2),
    },
    optionalText: {
        fontSize: '0.8rem',
        color: '#666',
        marginLeft: theme.spacing(1),
        fontStyle: 'italic',
    }
}));

const CheckoutEmployee: React.FC<MyFormProps> = ({ user }) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { data: cities } = useCities();
    const { hasOnlyUserRole } = useUser();
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

    // Set default city only (no personal info pre-fill)
    useEffect(() => {
        if (user && !hasOnlyUserRole) {
            // Only set default city to id=2
            if (cities && cities.length > 0) {
                const defaultCity = cities.find(c => c.id === 2);
                if (defaultCity) {
                    setCity(defaultCity);
                } else if (cities.length > 0) {
                    // Fallback to first city if id=2 not found
                    setCity(cities[0]);
                }
            }
        }
    }, [user, hasOnlyUserRole, cities]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid) return;

        setLoading(true);
        const data = {
            customer: {
                name, 
                phone, 
                email: email || '', // Send empty string if no email
            },
            coupon_id: coupon?.id,
            city_id: city.id,
            shipping: {
                address: address || ''
            },
            notes: notes,
            products: items.map(item => ({
                id: item.variantId || item.baseProductId,
                quantity: item.quantity
            }))
        };
        
        try {
            const res = await order.create(data, false, true); // false = not user, true = employee
            toast.success('Order placed for customer successfully');
            dispatch({ type: 'RECEIVED_ORDER', payload: res });
            clearCart();
              await Router.push('/order-received');
    } catch (e) {
        // Remove or comment out the error toast
        // toast.error('Error placing order: ' + (e.response?.data?.message || e.message));
        
        // Optional: Log to console for debugging
        console.error('Order error:', e);
            } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setShippingCost(Number.parseFloat(city?.shipping_cost || 0));
        if (
            calculatePrice() > 0 && 
            cartItemsCount > 0 &&
            name && 
            phone && 
            city
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [city, name, phone, calculatePrice, cartItemsCount]);

    return (
        <CheckoutWrapper>
            <CheckoutContainer>

                <CheckoutInformation>
                    <CheckoutCart shippingCost={shippingCost} onPrepareOrderData={undefined}/>
                </CheckoutInformation>

                <CheckoutInformation>
                    <Card variant="outlined" className={classes.margin}>
                        <CardHeader
                            title={t('customerDeliveryAddress')}
                        />
                        <Divider/>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth variant="outlined" className={classes.margin}>
                                    <TextField
                                        label={t('customerNamePlaceholder')}
                                        variant="outlined"
                                        fullWidth
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                        placeholder="Enter customer name"
                                    />
                                </FormControl>

                                <FormControl fullWidth variant="outlined" className={classes.margin}>
                                    <TextField
                                        label={t('customerPhonePlaceholder')}
                                        variant="outlined"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        required
                                        placeholder="Enter customer phone number"
                                    />
                                </FormControl>

                                <FormControl fullWidth variant="outlined" className={classes.margin}>
                                    <Autocomplete
                                        options={cities}
                                        getOptionLabel={(e) => e['name']}
                                        value={city}
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
                                        type="email"
                                        label={
                                            <>
                                                {t('customerEmailPlaceholder')}
                                              
                                            </>
                                        }
                                        variant="outlined"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Enter customer email (optional)"
                                    />
                                </FormControl>

                                <FormControl fullWidth variant="outlined" className={classes.margin}>
                                    <TextField
                                        label={
                                            <>
                                                {t('customerAddressPlaceholder')}
                                               
                                            </>
                                        }
                                        variant="outlined"
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        placeholder="Enter delivery address (optional)"
                                    />
                                </FormControl>

                                <FormControl fullWidth variant="outlined" className={classes.margin}>
                                    <TextField
                                        label={
                                            <>
                                                {t('orderNotesPlaceholder')}
                                               
                                            </>
                                        }
                                        multiline
                                        minRows={4}
                                        variant="outlined"
                                        value={notes}
                                        onChange={e => setNotes(e.target.value)}
                                        placeholder="Add order notes (optional)"
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

                                <CheckoutSubmit>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={loading || !isValid}
                                        disableElevation
                                        fullWidth
                                    >
                                        <FormattedMessage
                                            id='placeCustomerOrder'
                                            defaultMessage='Place Order for Customer'
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

export default CheckoutEmployee;