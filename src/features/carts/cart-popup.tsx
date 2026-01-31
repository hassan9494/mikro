import React, { useRef, useEffect } from 'react'; // Add these imports
import { openModal, closeModal } from 'components/modal/modal-provider';
import Cart from './cart';
import CartPopupButton, {
    BoxedCartButton,
} from 'components/cart-popup/cart-popup-button';
import { CURRENCY } from 'utils/constant';
import { CartSlidePopup } from './cart.style';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';

const CartPopupGlobalStyles: React.FC = () => {
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.setAttribute('data-id', 'cart-popup-styles');
        styleElement.textContent = `
          .cartPopup {
            top: auto !important;
            left: auto !important;
            bottom: 50px !important;
            right: 50px !important;
            box-shadow: 0 21px 36px rgba(0, 0, 0, 0.16);
            transform-origin: bottom right;
          }

          @media (max-width: 580px) {
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
        `;
        document.head.appendChild(styleElement);
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return null;
};

type CartProps = {
    deviceType: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
};

const CartPopUp: React.FC<CartProps> = ({
                                            deviceType: { mobile, tablet, desktop },
                                        }) => {
    const { isOpen, cartItemsCount, toggleCart, calculatePrice } = useCart();
    const popupRef = useRef<HTMLDivElement>(null); // Add this ref

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && 
          popupRef.current && 
          !popupRef.current.contains(event.target as Node)) {
        toggleCart();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleCart]);

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
            component: Cart,
            closeComponent: () => <div/>,
            componentProps: { onCloseBtnClick: closeModal, scrollbarHeight: 330 },
        });
    };

    let cartSliderClass = isOpen === true ? 'cartPopupFixed' : '';

    return (
        <>
            {mobile ? (
                <>
                    <CartPopupGlobalStyles />
                    <CartPopupButton
                        className='product-cart'
                        itemCount={cartItemsCount}
                        itemPostfix={
                            cartItemsCount > 1 ? (
                                <FormattedMessage id='cartItems' defaultMessage='items'/>
                            ) : (
                                <FormattedMessage id='cartItem' defaultMessage='item'/>
                            )
                        }
                        price={calculatePrice()}
                        pricePrefix='$'
                        onClick={handleModal}
                    />
                </>
            ) : (
                <>
                    <CartSlidePopup ref={popupRef} 
            className={cartSliderClass}>
                        {isOpen && (
                            <Cart onCloseBtnClick={toggleCart} scrollbarHeight='100vh'/>
                        )}
                    </CartSlidePopup>

                    <BoxedCartButton
                        className='product-cart'
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
                        onClick={toggleCart}
                    />
                </>
            )}
        </>
    );
};

export default CartPopUp;
