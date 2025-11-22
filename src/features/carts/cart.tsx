import React, { useState } from 'react';
import Link from 'next/link';
import {
    CartPopupBody,
    PopupHeader,
    PopupItemCount,
    CloseButton,
    PromoCode,
    CheckoutButtonWrapper,
    CheckoutButton,
    Title,
    PriceBox,
    NoProductMsg,
    NoProductImg,
    ItemWrapper,
    CouponBoxWrapper,
    CouponCode,
} from './cart.style';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { ShoppingBagLarge } from 'assets/icons/ShoppingBagLarge';
import { NoCartBag } from 'assets/icons/NoCartBag';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage } from 'react-intl';
import { useLocale } from 'contexts/language/language.provider';

import { Scrollbar } from 'components/scrollbar/scrollbar';
import { useCart } from 'contexts/cart/use-cart';
import { CartItem } from 'components/cart-item/cart-item';
import Coupon from 'features/coupon/coupon';
import CouponDisplay from 'components/coupon-display/coupon-display';

type CartPropsType = {
    style?: any;
    className?: string;
    scrollbarHeight?: string;
    onCloseBtnClick?: (e: any) => void;
};

const Cart: React.FC<CartPropsType> = ({
                                           style,
                                           className,
                                           onCloseBtnClick,
                                           scrollbarHeight,
                                       }) => {
    const {
        items,
        coupon,
        addItem,
        removeItem,
        removeItemFromCart,
        cartItemsCount,
        calculatePrice,
        removeCoupon,
    } = useCart();
    const [hasCoupon, setCoupon] = useState(false);
    const { isRtl } = useLocale();

    const isEmpty = cartItemsCount === 0;

    return (
        <CartPopupBody className={className} style={style}>
            <PopupHeader>
                <PopupItemCount>
                    <ShoppingBagLarge width='19px' height='24px'/>
                    <span>
            {cartItemsCount}
                        &nbsp;
                        {cartItemsCount > 1 ? (
                            <FormattedMessage id='cartItems' defaultMessage='items'/>
                        ) : (
                            <FormattedMessage id='cartItem' defaultMessage='item'/>
                        )}
          </span>
                </PopupItemCount>

                <CloseButton onClick={onCloseBtnClick}>
                    <CloseIcon/>
                </CloseButton>
            </PopupHeader>

            <Scrollbar
                className='cart-scrollbar'
                style={{
                    minHeight: isEmpty ? '300px' : 'auto',
                    // Allow more space for coupon display
                    maxHeight: coupon ? 'calc(100vh - 250px)' : 'calc(100vh - 200px)'
                }}
            >
                <ItemWrapper className='items-wrapper'>
                    {!!cartItemsCount ? (
                        items.map((item) => (
                            <CartItem
                                key={`cartItem-${item.id}`}
                                onIncrement={() => addItem(item)}
                                onDecrement={() => removeItem(item)}
                                onRemove={() => removeItemFromCart(item)}
                                data={item}
                            />
                        ))
                    ) : (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '300px',
                            width: '100%',
                            padding: '20px'
                        }}>

                            <NoProductImg>
                                <NoCartBag/>
                            </NoProductImg>
                        </div>
                    )}
                </ItemWrapper>
            </Scrollbar>

            <CheckoutButtonWrapper>
                <PromoCode style={{
                    minHeight: coupon ? 'auto' : 'auto',
                    height: 'auto',
                    maxHeight: 'none'
                }}>
                    {!coupon ? (
                        <>
                            {!hasCoupon ? (
                                <button onClick={() => setCoupon((prev) => !prev)}>
                                    <FormattedMessage
                                        id='specialCode'
                                        defaultMessage='Have a special code?'
                                    />
                                </button>
                            ) : (
                                <CouponBoxWrapper style={{
                                    height: 'auto',
                                    minHeight: 'auto'
                                }}>
                                    <Coupon
                                        disabled={!items.length}
                                        style={{
                                            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.06)',
                                        }}
                                    />
                                </CouponBoxWrapper>
                            )}
                        </>
                    ) : (
                        <CouponBoxWrapper style={{
                            height: 'auto',
                            minHeight: 'auto',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* Use CouponDisplay directly with proper container */}
                            <div style={{
                                width: '100%',
                                height: 'auto',
                                minHeight: 'auto',
                                maxHeight: 'none',
                                overflow: 'visible'
                            }}>
                                <CouponDisplay />
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    removeCoupon();
                                    setCoupon(false);
                                }}
                                style={{
                                    marginTop: '10px',
                                    padding: '8px 16px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid #dc3545',
                                    color: '#dc3545',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    width: '100%'
                                }}
                            >
                                <FormattedMessage id='removeCoupon' defaultMessage='Remove Coupon' />
                            </button>
                        </CouponBoxWrapper>
                    )}
                </PromoCode>

                {cartItemsCount !== 0 ? (
                    <Link href='/checkout'>
                        <CheckoutButton onClick={onCloseBtnClick}>
                            <>
                                <Title>
                                    <FormattedMessage
                                        id='nav.checkout'
                                        defaultMessage='Checkout'
                                    />
                                </Title>
                                <PriceBox>
                                    {CURRENCY}
                                    {calculatePrice()}
                                </PriceBox>
                            </>
                        </CheckoutButton>
                    </Link>
                ) : (
                    <CheckoutButton>
                        <>
                            <Title>
                                <FormattedMessage id='nav.checkout' defaultMessage='Checkout'/>
                            </Title>
                            <PriceBox>
                                {CURRENCY}
                                {calculatePrice()}
                            </PriceBox>
                        </>
                    </CheckoutButton>
                )}
            </CheckoutButtonWrapper>
        </CartPopupBody>
    );
};

export default Cart;