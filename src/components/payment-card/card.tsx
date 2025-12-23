import React from 'react';
import MasterCard from './image/master-card.png';
import Paypal from './image/paypal.png';
import Visa from './image/visa.png';
import {
    PaymentCardWrapper,
    CardLogo,
    CardNumber,
    CardNumTitle,
    Name,
} from './payment-card.style';
import Image from 'components/image/image';

interface Props {
    id: string;
    name: string;
    cardType: string;
    lastFourDigit: string;
    color: string;
}

const Card: React.FC<Props> = ({
                                   id,
                                   name,
                                   cardType,
                                   lastFourDigit,
                                   color,
                               }) => {
    const logoSrc = 
        (cardType === 'paypal' && Paypal.src) ||
        (cardType === 'master' && MasterCard.src) ||
        (cardType === 'visa' && Visa.src);

    return (
        <PaymentCardWrapper className="payment-card" color={color}>
            <CardLogo>
                {logoSrc && <Image url={logoSrc} alt={`card-${id}`} width={48} height={30} /> }
            </CardLogo>
            <CardNumTitle>Card Number</CardNumTitle>
            <CardNumber>
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span className="card-number">{lastFourDigit}</span>
            </CardNumber>
            <Name>{name}</Name>
        </PaymentCardWrapper>
    );
};

export default Card;
