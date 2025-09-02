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
import {CheckoutQuantityControl} from "./checkout-quantity-control";
import Coupon from "../coupon/coupon";
import { verifyCoupon } from "../../data/use-coupon";
import Link from "next/link";

type CartItemProps = {
    product: any;
};

const useStyles = makeStyles((theme) => ({
    margin: {
        marginBottom: theme.spacing(2),
    },
}));
const CheckoutCartItem: React.FC<CartItemProps> = ({ product }) => {
    const { id, quantity, title, name, unit, price, sale_price, image, slug, variants } = product;
    const displayPrice = sale_price ? sale_price : price;

    return (
        <Grid container alignItems="center" spacing={2} style={{ marginBottom: 16 }}>
            <Grid item md={1} xs={2}>
                <Avatar alt={name} src={image} style={{ width: 50, height: 50 }} />
            </Grid>
            <Grid item md={7} xs={10}>
                <Link href="/product/[slug]" as={`/product/${slug}`}>
                    <Box style={{ cursor: "pointer" }}>
                        <ListItemText
                            primary={
                                <div>
                                    <div style={{ fontWeight: 500 }}>{title}</div>
                                    {variants && Object.keys(variants).length > 0 && (
                                        <div style={{ marginTop: 4 }}>
                                            {Object.entries(variants).map(([key, value]) => (
                                                <Chip
                                                    key={`${key}-${value}`}
                                                    label={`${key}: ${value}`}
                                                    size="small"
                                                    style={{ 
                                                        marginRight: 4,
                                                        marginBottom: 4,
                                                        fontSize: '0.7rem'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            }
                        />
                    </Box>
                </Link>
            </Grid>
            <Grid item container md={4} xs={12}>
                <Grid item md={8} xs={8}>
                    <CheckoutQuantityControl data={product} />
                </Grid>
                <Grid item md={4} xs={4} style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                    <Chip 
                        label={
                            <strong>
                                <MoneyFormat 
                                    value={(displayPrice * quantity)} 
                                    currencyPosition='end'
                                />
                            </strong>
                        } 
                        variant="outlined" 
                        color="primary"
                    />
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
    
    const subtotal = calculateSubTotalPrice();
    // Override shipping cost to 0 if subtotal >= 20
    const finalShippingCost = subtotal >= 20 ? 0 : shippingCost;
    const showFreeShippingMessage = subtotal >= 20 && cartItemsCount > 0;
    const showEncouragementMessage = subtotal > 0 && subtotal < 20;
    const amountNeeded = (20 - subtotal).toFixed(2);

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
                                <MoneyFormat value={subtotal}  currencyPosition='end' />
                            </Text>
                        </TextWrapper>

                        <TextWrapper>
                            <Text>
                                <FormattedMessage
                                    id='intlOrderShippingCost'
                                    defaultMessage='Shipping Cost'
                                />
                                {showFreeShippingMessage && (
                                    <div style={{ fontSize: 12, color: 'green', marginTop: 4 }}>
                                        <FormattedMessage 
                                            id="freeShippingMessage"
                                            defaultMessage="Free shipping for 20+ JD orders"
                                        />
                                    </div>
                                )}
                                {showEncouragementMessage && (
                                    <div style={{ 
                                        fontSize: 12, 
                                        color: '#e94560', 
                                        marginTop: 4,
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4
                                    }}>
                                        <FormattedMessage 
                                            id="freeShippingEncouragement"
                                            defaultMessage="Add {amount} JD more for free shipping"
                                            values={{ amount: amountNeeded }}
                                        />
                                        🚚
                                    </div>
                                )}
                            </Text>
                            <Text><MoneyFormat value={finalShippingCost} currencyPosition='end' /></Text>
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
                                <MoneyFormat value={(parseFloat(calculatePrice()) + finalShippingCost)} currencyPosition='end' />
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