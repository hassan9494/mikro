import React, { useEffect, useState, useCallback } from "react";
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
import { CheckoutQuantityControl } from "./checkout-quantity-control";
import Coupon from "../coupon/coupon";
import CouponDisplay from "../../components/coupon-display/coupon-display"; // Add this import
import { verifyCoupon } from "../../data/use-coupon";
import Link from "next/link";
import {useSettings} from "../../data/use-website";

type CartItemProps = {
    product: any;
};

const useStyles = makeStyles((theme) => ({
    margin: {
        marginBottom: theme.spacing(2),
    },
}));

const CheckoutCartItem: React.FC<CartItemProps> = ({ product }) => {
    const {
        id,
        quantity,
        title,
        name,
        unit,
        price,
        sale_price,
        image,
        slug,
        variantId,
        variantTitle
    } = product;

    const displayPrice = sale_price || price;

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
                                    {variantTitle && (
                                        <div style={{
                                            marginTop: 4,
                                            fontSize: '0.8rem',
                                            color: '#666',
                                            fontStyle: 'italic'
                                        }}>
                                            <FormattedMessage id="variant" defaultMessage="Variant" />: {variantTitle}
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

const CheckoutCart = ({
                          shippingCost,
                          onPrepareOrderData
                      }) => {
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
    const { data: setting } = useSettings();

    const subtotal = calculateSubTotalPrice();
    const finalShippingCost = subtotal >= parseFloat(setting?.value) ? 0 : shippingCost;
    const showFreeShippingMessage = subtotal >= parseFloat(setting?.value) && cartItemsCount > 0;
    const showEncouragementMessage = subtotal > 0 && subtotal < parseFloat(setting?.value);
    const amountNeeded = (parseFloat(setting?.value) - subtotal).toFixed(2);

    const check = useCallback(async (code) => {
        try {
            const data = await verifyCoupon(code);
            applyCoupon({...data, code});
        } catch (e) {
            removeCoupon();
        }
    }, [applyCoupon, removeCoupon]);

    // Only prepare order data - remove the automatic coupon validation that caused infinite loop
    useEffect(() => {
        // Prepare order data for submission
        const products = items.map(item => ({
            id: item.baseProductId,
            variant_id: item.variantId || null,
            quantity: item.quantity
        }));

        if (onPrepareOrderData) {
            onPrepareOrderData({
                products,
                coupon: coupon ? coupon.code : null
            });
        }
    }, [items, coupon, onPrepareOrderData]);

    return (
        <Card variant="outlined" className={classes.margin}>
            <CardHeader title={t('cartTitle')} />
            <Divider />
            <CardContent>
                <OrderInfo>
                    <List>
                        {cartItemsCount > 0 ? (
                            items.map((item) => (
                                <CheckoutCartItem
                                    key={`cartItem-${item.id}-${item.variantId || ''}`}
                                    product={item}
                                />
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
                                <MoneyFormat value={subtotal} />
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
                                            id="tets"
                                            defaultMessage="Free shipping for {value} JD orders"
                                            values={{
                                                value: <strong>{setting?.value || '20'}</strong>
                                            }}
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
                            <Text><MoneyFormat value={finalShippingCost} /></Text>
                        </TextWrapper>

                        <TextWrapper>
                            <Text>
                                <FormattedMessage
                                    id='discountText'
                                    defaultMessage='Discount'
                                />
                            </Text>
                            <Text>
                                -<MoneyFormat value={calculateDiscount()} />
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
                                <MoneyFormat value={(parseFloat(calculatePrice()) + finalShippingCost)} />
                            </Bold>
                        </TextWrapper>

                        {/* Enhanced Coupon Section */}
                        {coupon ? (
                            <CouponBoxWrapper>
                                <Box style={{ width: '100%' }}>
                                    <CouponDisplay />
                                    <RemoveCoupon
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeCoupon();
                                            setHasCoupon(false);
                                        }}
                                        style={{ marginTop: '10px', display: 'block', textAlign: 'center' }}
                                    >
                                        <FormattedMessage id='removeCoupon' defaultMessage='Remove Coupon' />
                                    </RemoveCoupon>
                                </Box>
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
                                    <CouponInputBox>
                                        <Coupon
                                            errorMsgFixed={true}
                                            className='normalCoupon'
                                            style={{ marginBottom: '10px' }}
                                        />
                                    </CouponInputBox>
                                )}
                            </CouponBoxWrapper>
                        )}
                    </CalculationWrapper>
                </OrderInfo>
            </CardContent>
        </Card>
    );
};

export default CheckoutCart;