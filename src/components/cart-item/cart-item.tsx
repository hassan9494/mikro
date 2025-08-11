import React from 'react';
import { Counter } from 'components/counter/counter';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { CURRENCY } from 'utils/constant';
import {
    ItemBox,
    Image,
    Information,
    Name,
    Price,
    Weight,
    Total,
    RemoveButton,
} from './cart-item.style';
import MoneyFormat from "../money-format/money-format";

interface Props {
    data: any;
    onDecrement: () => void;
    onIncrement: () => void;
    onRemove: () => void;
}

export const CartItem: React.FC<Props> = ({
  data,
  onDecrement,
  onIncrement,
  onRemove,
}) => {
    const { title, image, price, sale_price, unit, quantity } = data;
    const displayPrice = sale_price ? sale_price : price;
    return (
        <ItemBox>
            <Counter
                value={quantity}
                onDecrement={onDecrement}
                onIncrement={onIncrement}
                variant="lightVertical"
            />
            <Image src={image}/>
            <Information>
                <Name>{title}</Name>
                <Price>
                    <MoneyFormat value={displayPrice} />
                </Price>
                <Weight>
                    {quantity} X {unit}
                </Weight>
            </Information>
            <Total>
                <MoneyFormat value={(quantity * displayPrice).toFixed(2)} />
            </Total>
            <RemoveButton onClick={onRemove}>
                <CloseIcon/>
            </RemoveButton>
        </ItemBox>
    );
};
