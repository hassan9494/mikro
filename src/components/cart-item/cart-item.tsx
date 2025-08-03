import React from 'react';
import { Counter } from 'components/counter/counter';
import { CloseIcon } from 'assets/icons/CloseIcon';
import {
  ItemBox,
  Image,
  Information,
  Name,
  Price,
  Weight,
  Total,
  RemoveButton,
  VariantInfo,
  VariantItem
} from './cart-item.style';
import MoneyFormat from "../money-format/money-format";

interface ProductVariant {
  [key: string]: string; // e.g. { color: "red", size: "xl" }
}

interface CartItemProps {
  id: string;
  originalId: string;
  title: string;
  price: number;
  sale_price?: number;
  quantity: number;
  image: string;
  unit: string;
  availableQty: number;
  variants?: ProductVariant;
}

interface Props {
  data: CartItemProps;
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
  const { title, image, price, sale_price, unit, quantity, variants } = data;
  const displayPrice = sale_price ?? price;

  const renderVariants = () => {
    if (!variants || Object.keys(variants).length === 0) return null;
    
    return (
      <VariantInfo>
        {Object.entries(variants).map(([key, value]) => (
          <VariantItem key={`${key}-${value}`}>
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}
          </VariantItem>
        ))}
      </VariantInfo>
    );
  };

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
        {renderVariants()}
        <Price>
          <MoneyFormat value={displayPrice} />
        </Price>
        <Weight>
          {quantity} × {unit}
        </Weight>
      </Information>
      <Total>
        <MoneyFormat value={(quantity * displayPrice).toFixed(2)} />
      </Total>
      <RemoveButton 
        onClick={onRemove}
        aria-label={`Remove ${title} from cart`}
      >
        <CloseIcon />
      </RemoveButton>
    </ItemBox>
  );
};