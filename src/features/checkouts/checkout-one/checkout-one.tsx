import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { Button } from 'components/button/button';
import CheckoutWrapper, {
    CheckoutContainer,
    OrderSummary,
    OrderSummaryItem,
    OrderLabel,
    OrderAmount,
    DeliverySchedule,
    DeliveryAddress,
    StyledContact,
    PaymentOption,
    CheckoutSubmit,
    CouponBoxWrapper,
} from './checkout-one.style';

import { CouponDisplay } from 'components/coupon-box/coupon-box';
import { ProfileContext } from 'contexts/profile/profile.context';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';
import Coupon from 'features/coupon/coupon';
import Address from 'features/address/address';
import Contact from 'features/contact/contact';
import Payment from 'features/payment/payment';
import Schedules from 'features/schedule/schedule';

// The type of props Checkout Form receives
interface MyFormProps {
    token: string;
    deviceType: any;
}

const Checkout: React.FC<MyFormProps> = ({ token, deviceType }) => {
    const {
        removeCoupon,
        coupon,
        clearCart,
        cartItemsCount,
        calculatePrice,
        calculateDiscount,
        calculateSubTotalPrice,
        isRestaurant,
        toggleRestaurant,
    } = useCart();

    const { state } = useContext(ProfileContext);
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const { address, contact, card, schedules } = state;

    // Calculate shipping cost
    const subtotal = calculateSubTotalPrice();
    let shippingCost = 0;
    
    if (address && address.length > 0) {
        const primaryAddress = address.find(addr => addr.is_primary) || address[0];
        shippingCost = parseFloat(primaryAddress.shipping_cost) || 0;
    }
    
    const shippingFee = subtotal >= 20 ? 0 : shippingCost;
    const total = Number(calculatePrice()) + shippingFee;
    const showFreeShipping = subtotal >= 20 && cartItemsCount > 0;
    const showEncouragement = subtotal > 0 && subtotal < 20;
    const amountNeeded = (20 - subtotal).toFixed(2);

    const handleSubmit = async () => {
        setLoading(true);
        if (isValid) {
            clearCart();
            Router.push('/order-received');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (
            calculatePrice() > 0 &&
            cartItemsCount > 0 &&
            address.length &&
            contact.length &&
            card.length &&
            schedules.length
        ) {
            setIsValid(true);
        }
    }, [state]);
    
    useEffect(() => {
        return () => {
            if (isRestaurant) {
                toggleRestaurant();
                clearCart();
            }
        };
    }, []);

    return (
        <form>
            <CheckoutWrapper>
                <CheckoutContainer>
                    {/* DeliverySchedule */}
                    {/*<DeliverySchedule>*/}
                    {/*  <Schedules />*/}
                    {/*</DeliverySchedule>*/}
                    {/* DeliveryAddress */}
                    <DeliveryAddress>
                        <Address/>
                    </DeliveryAddress>
                    {/* Contact number */}
                    <StyledContact>
                        <Contact/>
                    </StyledContact>
                    {/* PaymentOption */}
                    {/*<PaymentOption>*/}
                    {/*  <Payment deviceType={deviceType} />*/}
                    {/*</PaymentOption>*/}
                    {/* CheckoutSubmit */}

                    <OrderSummary>
                        <OrderSummaryItem style={{ marginBottom: 15 }}>
                            <OrderLabel>
                                <FormattedMessage id='subTotal' defaultMessage='Subtotal'/> (
                                {cartItemsCount}{' '}
                                <FormattedMessage id='itemsText' defaultMessage='items'/>)
                            </OrderLabel>
                            <OrderAmount>JD {subtotal.toFixed(2)}</OrderAmount>
                        </OrderSummaryItem>

                        <OrderSummaryItem style={{ marginBottom: 30 }}>
                            <OrderLabel>
                                <FormattedMessage
                                    id='shippingFeeText'
                                    defaultMessage='Shipping Fee'
                                />
                                {showFreeShipping && (
                                    <div style={{ 
                                        fontSize: 12, 
                                        color: 'green',
                                        marginTop: 4
                                    }}>
                                        <FormattedMessage 
                                            id="freeShippingMessage"
                                            defaultMessage="Free shipping for 20+ JD orders"
                                        />
                                    </div>
                                )}
                                {showEncouragement && (
                                    <div style={{ 
                                        fontSize: 12, 
                                        color: '#e94560',
                                        marginTop: 4,
                                        fontWeight: 'bold'
                                    }}>
                                        <FormattedMessage 
                                            id="freeShippingEncouragement"
                                            defaultMessage="Add {amount} JD more for free shipping"
                                            values={{ amount: amountNeeded }}
                                        />
                                    </div>
                                )}
                            </OrderLabel>
                            <OrderAmount>
                                {shippingFee > 0 ? `JD ${shippingFee.toFixed(2)}` : 
                                    <span style={{ color: 'green' }}>
                                        <FormattedMessage id='freeShipping' defaultMessage='FREE'/>
                                    </span>
                                }
                            </OrderAmount>
                        </OrderSummaryItem>

                        <OrderSummaryItem
                            style={{ marginBottom: 30 }}
                            className='voucherWrapper'
                        >
                            <OrderLabel>
                                <FormattedMessage id='voucherText' defaultMessage='Voucher'/>
                            </OrderLabel>
                            {coupon ? (
                                <CouponDisplay
                                    code={coupon.code}
                                    sign='-'
                                    currency='JD'
                                    price={calculateDiscount()}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeCoupon();
                                    }}
                                />
                            ) : (
                                <CouponBoxWrapper>
                                    <Coupon
                                        errorMsgFixed={true}
                                        style={{ maxWidth: 350, height: 50 }}
                                    />
                                </CouponBoxWrapper>
                            )}
                        </OrderSummaryItem>

                        <OrderSummaryItem>
                            <OrderLabel>
                                <FormattedMessage id='totalText' defaultMessage='Total'/>
                                <div style={{ fontSize: 12, opacity: 0.8 }}>
                                    <FormattedMessage 
                                        id='vatIncludedText' 
                                        defaultMessage='(Incl. VAT)'
                                    />
                                </div>
                            </OrderLabel>
                            <OrderAmount>JD {total.toFixed(2)}</OrderAmount>
                        </OrderSummaryItem>
                    </OrderSummary>

                    <CheckoutSubmit>
                        <Button
                            type='button'
                            onClick={handleSubmit}
                            disabled={!isValid}
                            size='big'
                            loading={loading}
                            width='100%'
                        >
                            <FormattedMessage
                                id='processCheckout'
                                defaultMessage='Proceed to Checkout'
                            />
                        </Button>
                    </CheckoutSubmit>
                </CheckoutContainer>
            </CheckoutWrapper>
        </form>
    );
};

export default Checkout;