import React from 'react';
import {
    CartPopupButtonStyled,
    ButtonImgBox,
    ItemCount,
    PriceBox,
    CartPopupBoxButton,
    PriceBoxAlt,
    TotalItems,
} from './whatsapp.style';
import { ShoppingBag } from 'assets/icons/ShoppingBag';
import { WhatsApp } from "@material-ui/icons";

type CartButtonProps = {
    style?: React.CSSProperties;
    itemCount?: number;
    itemPostfix?: any;
    price?: number;
    pricePrefix?: string;
    className?: string;
    onClick?: (e: any) => void;
};

export const Whatsapp: React.FC<CartButtonProps> = ({}) => (
    <CartPopupBoxButton href='https://wa.me/962790062196' target='_blank'>
        <WhatsApp style={{color: 'white', width: 30, height: 30}} />
    </CartPopupBoxButton>
);

