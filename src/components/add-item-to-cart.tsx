import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from './counter/counter';
import { variant as _variant } from 'styled-system';
import { Box } from './box';

const Icon = styled.span<any>(
    _variant({
        variants: {
            full: {
                px: 3,
                height: 36,
                backgroundColor: '#e6e6e6',
                transition: '0.35s ease-in-out',
                display: 'flex',
                alignItems: 'center',
            },
        },
    })
);

const Button = styled.button<any>(
    css({
        width: 36,
        height: 36,
        borderRadius: 6,
        transition: '0.35s ease-in-out',
        backgroundColor: '#fff',
        border: '1px solid',
        borderColor: '#e6e6e6',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'primary.regular',
            borderColor: 'primary.regular',
            color: '#fff',
        },
        ':disabled': {
            backgroundColor: '#f5f5f5',
            borderColor: '#e0e0e0',
            color: '#bdbdbd',
            cursor: 'not-allowed',
            ':hover': {
                backgroundColor: '#f5f5f5',
                borderColor: '#e0e0e0',
                color: '#bdbdbd',
            },
        },
    }),
    _variant({
        variants: {
            full: {
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f3f3f3',
                padding: 0,
                border: 'none',
                overflow: 'hidden',
                ':hover': {
                    backgroundColor: 'primary.hover',
                    borderColor: 'primary.hover',
                    color: '#fff',
                    [Icon]: {
                        backgroundColor: 'primary.regular',
                        color: '#fff',
                    },
                },
                ':disabled': {
                    backgroundColor: '#f5f5f5',
                    color: '#bdbdbd',
                    cursor: 'not-allowed',
                    ':hover': {
                        backgroundColor: '#f5f5f5',
                        [Icon]: {
                            backgroundColor: '#e6e6e6',
                            color: '#bdbdbd',
                        },
                    },
                },
            },
        },
    })
);

interface Props {
    data: any;
    variant?: string;
    buttonText?: string;
}

export const AddItemToCart = ({ data, variant, buttonText }: Props) => {
    const { addItem, removeItem, getItem, isInCart } = useCart();

    // Generate unique ID for cart items
    const getCartItemId = () => {
        return data.variantId ? `${data.baseProductId || data.id}_${data.variantId}` : data.id;
    };

    const cartItemId = getCartItemId();
    const itemInCart = isInCart(data.baseProductId || data.id, data.variantId || null);
    const cartItem = itemInCart ? getItem(data.baseProductId || data.id, data.variantId || null) : null;

    // Get available quantity from the product/variant data
    const getAvailableQuantity = () => {
        return data.availableQty || 0;
    };

    const availableQty = getAvailableQuantity();
    const currentCartQty = cartItem?.quantity || 0;

    // Check if we can add more items
    const canAddMore = () => {
        return currentCartQty < availableQty;
    };

    // Check if the product is out of stock
    const isOutOfStock = () => {
        return availableQty === 0;
    };

    const handleAddClick = (e) => {
        e.stopPropagation();

        // Check if we can add more items
        if (!canAddMore()) {
            console.log("Cannot add more items - reached available quantity limit");
            return;
        }

        // Check if product is out of stock
        if (isOutOfStock()) {
            console.log("Cannot add item - product is out of stock");
            return;
        }

        console.log(data);
        addItem(data);
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        removeItem(data);
    };

    const handleIncrement = (e) => {
        e.stopPropagation();

        // Check if we can add more items
        if (!canAddMore()) {
            console.log("Cannot add more items - reached available quantity limit");
            return;
        }

        addItem(data);
    };

    const handleDecrement = (e) => {
        e.stopPropagation();
        removeItem(data, 1);
    };

    // If product is out of stock, show disabled state
    if (isOutOfStock()) {
        return (
            <Button
                aria-label="out of stock"
                disabled={true}
                variant={variant}
            >
                {!!buttonText && <Box flexGrow={1}>Out of Stock</Box>}
                <Icon variant={variant}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                    >
                        <path
                            d="M5 0C2.24 0 0 2.24 0 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm2.5 6.06L6.06 7.5 5 6.44 3.94 7.5 2.5 6.06 3.56 5 2.5 3.94 3.94 2.5 5 3.56 6.06 2.5 7.5 3.94 6.44 5 7.5 6.06z"
                            fill="currentColor"
                        />
                    </svg>
                </Icon>
            </Button>
        );
    }

    return !itemInCart ? (
        <Button
            aria-label="add item to cart"
            onClick={handleAddClick}
            variant={variant}
            disabled={!canAddMore()} // Disable if cannot add more
        >
            {!!buttonText && <Box flexGrow={1}>{buttonText}</Box>}
            <Icon variant={variant}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                >
                    <path
                        data-name="Path 9"
                        d="M143.407,137.783h-1.25v4.375h-4.375v1.25h4.375v4.375h1.25v-4.375h4.375v-1.25h-4.375Z"
                        transform="translate(-137.782 -137.783)"
                        fill="currentColor"
                    />
                </svg>
            </Icon>
        </Button>
    ) : (
        <Counter
            value={cartItem.quantity}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            className="card-counter"
            variant={variant || 'altHorizontal'}
            // Pass max value to counter if it supports it
            maxValue={availableQty}
        />
    );
};