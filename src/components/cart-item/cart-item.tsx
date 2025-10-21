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
import { FormattedMessage } from 'react-intl';
import { variant } from 'styled-system';

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
    const {baseProductId, title, image, price, sale_price, unit, quantity, variantTitle, variantId } = data;
    const displayPrice = sale_price || price;

    return (
        <ItemBox>
            <Counter
                value={quantity}
                onDecrement={onDecrement}
                onIncrement={onIncrement}
                variant="lightVertical"
            />
            <Image src={image || '/default-product.png'}/>
            <Information>
                <Name>
                    {variantId
                        ? `${title} (ID: ${baseProductId}-${variantId})`
                        : `${title} (ID: ${baseProductId})`}
                    {variantTitle && (
                        <div style={{
                            fontSize: '0.8rem',
                            color: '#666',
                            marginTop: '4px',
                            fontStyle: 'italic'
                        }}>
                            <FormattedMessage id="variant" defaultMessage="Variant" />: {variantTitle}
                        </div>
                    )}
                </Name>
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