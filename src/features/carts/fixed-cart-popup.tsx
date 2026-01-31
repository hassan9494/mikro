import React, { useEffect } from 'react';
import { openModal, closeModal } from 'components/modal/modal-provider';
import FixedCart from './fixed-cart';
import CartPopupButton from 'components/cart-popup/cart-popup-button';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';

const CartPopupGlobalStyles: React.FC = () => {
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.setAttribute('data-id', 'fixed-cart-popup-styles');
        styleElement.textContent = `
          .cartPopup {
            top: auto !important;
            left: auto !important;
            bottom: 50px !important;
            right: 50px !important;
            box-shadow: 0 21px 36px rgba(0, 0, 0, 0.16);
            transform-origin: bottom right;
          }

          @media (max-width: 767px) {
            .cartPopup {
              max-width: none!important;
              width: 100% !important;
              bottom: 50px !important;
              left: 0!important;
              background: #ffffff;
              overflow: initial !important;
              transform-origin: bottom center;
            }
          }

          @media (min-width: 991px) {
            .fixedCartPopup {
              display: none;
            }
          }
        `;
        document.head.appendChild(styleElement);
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return null;
};

type CartProps = {
    onCheckout?: (e: any) => void;
};

const FixedCartPopup: React.FC<CartProps> = ({ onCheckout }) => {
    const { isOpen, cartItemsCount, toggleCart, calculatePrice } = useCart();
    const handleModal = () => {
        openModal({
            show: true,
            config: {
                className: 'cartPopup',
                width: 'auto',
                height: 'auto',
                enableResizing: false,
                disableDragging: true,
                transition: {
                    tension: 360,
                    friction: 40,
                },
            },
            closeOnClickOutside: true,
            component: FixedCart,
            closeComponent: () => <div/>,
            componentProps: {
                onCloseBtnClick: closeModal,
                scrollbarHeight: 370,
                onCheckout: onCheckout,
            },
        });
    };

    return (
        <>
            <CartPopupGlobalStyles/>
            <CartPopupButton
                className='fixedCartPopup'
                itemCount={cartItemsCount}
                itemPostfix={
                    cartItemsCount > 1 ? (
                        <FormattedMessage id='cartItems' defaultMessage='items'/>
                    ) : (
                        <FormattedMessage id='cartItem' defaultMessage='item'/>
                    )
                }
                price={calculatePrice()}
                pricePrefix={CURRENCY}
                onClick={handleModal}
            />
        </>
    );
};

export default FixedCartPopup;
