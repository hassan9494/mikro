import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Grid,
    List,
    ListItemText,
    makeStyles
} from "@material-ui/core";
import { AddItemToCart } from "../../components/add-item-to-cart";
import MoneyFormat from "../../components/money-format/money-format";
import {
    Bold,
    CalculationWrapper, CouponBoxWrapper, CouponCode, CouponInputBox, HaveCoupon,
    NoProductImg,
    NoProductMsg,
    OrderInfo, RemoveCoupon, Small, Text,
    TextWrapper
} from "./checkout-guest/checkout-guest.style";
import { NoCartBag } from "../../assets/icons/NoCartBag";
import { FormattedMessage } from "react-intl";
import { useCart } from "../../contexts/cart/use-cart";
import useTranslation from "../../utils/use-translation";
import useAddresses from "../../data/use-address";
import {CheckoutQuantityControl} from "./checkout-quantity-control";
import Coupon from "../coupon/coupon";
import { verifyCoupon } from "../../data/use-coupon";

type CartItemProps = {
    product: any;
};

const useStyles = makeStyles((theme) => ({
    margin: {
        marginBottom: theme.spacing(2),
    },
}));

const CheckoutCartItem: React.FC<CartItemProps> = ({ product }) => {
    const { id, quantity, title, name, unit, price, sale_price, image } = product;
    const displayPrice = sale_price ? sale_price : price;
    return (
        <Grid container alignItems="center" spacing={2}>
            <Grid item md={1} xs={2} spacing={10}>
                <Avatar alt={name} src={image} style={{ width: 50, height: 50 }}/>
            </Grid>
            <Grid item md={7} xs={10}>
                <ListItemText
                    primary={title}
                />
            </Grid>
            <Grid item container md={4} xs={12}>
                <Grid item  md={8} xs={8}>
                    <CheckoutQuantityControl data={product}/>
                </Grid>
                <Grid item md={4} xs={4} style={{marginBottom: 'auto', marginTop: 'auto'}}>
                    <Chip label={<strong><MoneyFormat value={(displayPrice * quantity)} currencyPosition='end'/></strong>} variant="outlined" color={"primary"}/>
                </Grid>
            </Grid>
        </Grid>
    );
};

const CheckoutCart = ({ shippingCost }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [hasCoupon, setHasCoupon] = useState(false);
    const {
        items,
        cartItemsCount,
        calculatePrice,
        calculateDiscount,
        calculateSubTotalPrice,
        removeCoupon,
        applyCoupon,
        coupon,
    } = useCart();

    useEffect(() => {
        if (coupon) check(coupon.code)
    }, [])

    const check = async (code) => {
        try {
            const data = await verifyCoupon(code);
            applyCoupon({...data, code});
        } catch (e) {
            removeCoupon()
        }
    }

    return (
        <Card variant="outlined" className={classes.margin}>

            <CardHeader title={t('cartTitle')} />

            <Divider />

            <CardContent>

                <OrderInfo>

                    <List>
                        {cartItemsCount > 0 ? (
                            items.map((item) => (
                                <CheckoutCartItem key={`cartItem-${item.id}`} product={item}/>
                            ))
                        ) : (
                            <>
                                <NoProductImg>
                                    <NoCartBag/>
                                </NoProductImg>

                                <NoProductMsg>
                                    <FormattedMessage
                                        id='noProductFound'
                                        defaultMessage='No products found'
                                    />
                                </NoProductMsg>
                            </>
                        )}

                    </List>

                    <CalculationWrapper>

                        <TextWrapper>
                            <Text>
                                <FormattedMessage
                                    id='subTotal'
                                    defaultMessage='Subtotal'
                                />
                            </Text>
                            <Text>
                                <MoneyFormat value={calculateSubTotalPrice()}  currencyPosition='end' />
                            </Text>
                        </TextWrapper>

                        <TextWrapper>
                            <Text>
                                <FormattedMessage
                                    id='intlOrderShippingCost'
                                    defaultMessage='Shipping Cost'
                                />
                            </Text>

                            <Text><MoneyFormat value={shippingCost} currencyPosition='end' /></Text>
                        </TextWrapper>

                        <TextWrapper>
                            <Text>
                                <FormattedMessage
                                    id='discountText'
                                    defaultMessage='Discount'
                                />
                            </Text>
                            <Text>
                                <MoneyFormat value={calculateDiscount()} currencyPosition='end' />
                            </Text>
                        </TextWrapper>

                        <TextWrapper style={{ marginTop: 20 }}>
                            <Bold>
                                <FormattedMessage id='totalText' defaultMessage='Total'/>{' '}
                                <Small>
                                    { t('vatText', 'Incl. VAT') }
                                </Small>
                            </Bold>
                            <Bold>
                                <MoneyFormat value={(parseFloat(calculatePrice()) + shippingCost)} currencyPosition='end' />
                            </Bold>
                        </TextWrapper>

                        { coupon ? (
                            <CouponBoxWrapper>
                                <CouponCode>
                                    <FormattedMessage id='couponApplied'/>
                                    <span>{coupon.code}</span>
                                    <RemoveCoupon
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeCoupon();
                                            setHasCoupon(false);
                                        }}
                                    >
                                        <FormattedMessage id='removeCoupon'/>
                                    </RemoveCoupon>
                                </CouponCode>
                            </CouponBoxWrapper>
                        ) : (
                            <CouponBoxWrapper>
                                {!hasCoupon ? (
                                    <HaveCoupon onClick={() => setHasCoupon((prev) => !prev)}>
                                        <FormattedMessage
                                            id='specialCode'
                                            defaultMessage='Have a special code?'
                                        />
                                    </HaveCoupon>
                                ) : (
                                    <>
                                        <CouponInputBox>
                                            <Coupon errorMsgFixed={true} className='normalCoupon'/>
                                        </CouponInputBox>
                                    </>
                                )}
                            </CouponBoxWrapper>
                        )}

                    </CalculationWrapper>
                </OrderInfo>

            </CardContent>

        </Card>
    )
}

export default CheckoutCart;