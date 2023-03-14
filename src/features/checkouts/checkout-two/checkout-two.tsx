import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import CheckoutWrapper, {
    CheckoutContainer,
    CheckoutInformation,
    CheckoutSubmit,
    HaveCoupon,
    CouponBoxWrapper,
    CouponInputBox,
    CouponCode,
    RemoveCoupon,
    TermConditionText,
    TermConditionLink,
} from '../checkout-guest/checkout-guest.style';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';
import Coupon from 'features/coupon/coupon';
import {
    Card,
    CardContent,
    FormControl,
    TextField,
    CardHeader,
    Divider,
    makeStyles,
    Button
} from "@material-ui/core";
import { order } from 'data/use-orders';
import useTranslation from 'utils/use-translation';
import { toast } from "react-toastify";
import { useAppDispatch } from "contexts/app/app.provider";
import Address from "../../address/address";
import CheckoutCart from "../checkout-cart";
import useAddresses from "../../../data/use-address";

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

    const {
        items,
        coupon,
        clearCart,
        calculatePrice,
        cartItemsCount
    } = useCart();

    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const { data: addresses } = useAddresses();
    const [shippingCost, setShippingCost] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(calculatePrice() > 0 && cartItemsCount > 0)) return;
        setLoading(true);
        const data = {
            notes,
            coupon_id: coupon?.id,
            products: items.map(({id, quantity}) => ({ id, quantity }))
        }
        try {
            const res = await order.create(data, true);
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
        const address = addresses.filter(e => e.is_primary).shift()
        setShippingCost(Number.parseFloat(address?.shipping_cost || 0));
    }, [addresses]);

    return (

        <CheckoutWrapper>

            <CheckoutContainer>

                <CheckoutInformation>
                    <CheckoutCart shippingCost={shippingCost}/>
                </CheckoutInformation>

                <CheckoutInformation>

                    <Card variant="outlined" className={classes.margin}>

                        <CardHeader
                            title={t('checkoutDeliveryAddress')}
                        />

                        <Divider />

                        <CardContent>

                            <Address/>

                            <form onSubmit={handleSubmit}>

                                <FormControl fullWidth variant="outlined" className={classes.margin} >
                                    <TextField
                                        label={t('notesPlaceholder')}
                                        multiline
                                        rows={4}
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
                                        disabled={loading}
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
