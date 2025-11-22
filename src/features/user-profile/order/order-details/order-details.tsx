import React from 'react';
import Table from 'rc-table';
import {
    DeliveryInfo,
    DeliveryAddress,
    Address,
    CostCalculation,
    PriceRow,
    Price,
    ProgressWrapper,
    OrderTableWrapper,
    OrderTable,
} from './order-details.style';
import Progress from 'components/progress-box/progress-box';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage } from 'react-intl';
import MoneyFormat from "../../../../components/money-format/money-format";
import {ImageWrapper, ItemDetails, ItemName, ItemPrice, ItemWrapper} from "../order.style";
import Link from "next/link";
import styled from 'styled-components';

type OrderDetailsProps = {
    order?: any;
};

const components = {
    table: OrderTable,
};

// Add styled component for color variants
const ColorVariantItem = styled.div`
    margin-left: 20px;
    font-style: italic;
    color: #666;
    margin-top: 4px;
    display: flex;
    align-items: center;
`;

const VariantImageWrapper = styled.div`
    width: 30px;
    height: 30px;
    margin-right: 8px;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
    }
`;

const OrderDetails: React.FC<OrderDetailsProps> = ({
                                                       order,
                                                   }) => {
    const { subtotal, discount, shipping, total, coupon_discount } = order;

    // Function to prepare table data with color variants
    const prepareTableData = () => {
        const tableData = [];

        order?.items?.forEach(item => {
            if (item.has_colors && item.colors.length > 0) {
                // Add main product row
                tableData.push({
                    ...item,
                    isMainProduct: true,
                    hasVariants: true,
                    // Don't show quantity/price for main product row when it has variants
                    showQuantity: false,
                    showPrice: false,
                });

                // Add color variant rows
                item.colors.forEach(color => {
                    tableData.push({
                        ...color,
                        isVariant: true,
                        parentId: item.id,
                        // Use variant-specific data
                        name: color.name,
                        image: color.image || item.image,
                        price: color.price,
                        quantity: color.quantity,
                        showQuantity: true,
                        showPrice: true,
                        // Keep reference to main product for slug
                        mainProduct: item,
                    });
                });
            } else {
                // Add regular product row
                tableData.push({
                    ...item,
                    isMainProduct: false,
                    hasVariants: false,
                    showQuantity: true,
                    showPrice: true,
                });
            }
        });

        return tableData;
    };

    const tableData = prepareTableData();

    return (
        <>
            <DeliveryInfo>
                <DeliveryAddress>
                    <h3>
                        <FormattedMessage
                            id="deliveryAddressTitle"
                            defaultMessage="Delivery Address"
                        />
                    </h3>
                    <Address>{shipping?.address}</Address>
                </DeliveryAddress>

                <CostCalculation>
                    <PriceRow>
                        <FormattedMessage id="subTotal" defaultMessage="Sub total"/>
                        <Price>
                            <MoneyFormat value={subtotal} />
                        </Price>
                    </PriceRow>
                    <PriceRow>
                        <FormattedMessage
                            id="intlOrderDetailsDiscount"
                            defaultMessage="Discount"
                        />
                        <Price>
                            <MoneyFormat value={discount} />
                        </Price>
                    </PriceRow>
                    <PriceRow>
                        <FormattedMessage
                            id="intlOrderDetailsDelivery"
                            defaultMessage="Delivery Fee"
                        />
                        <Price>
                            {shipping?.free ? (
                                <span style={{ color: 'green', fontWeight: 'bold' }}>
                                    <FormattedMessage id='freeShipping' defaultMessage='FREE'/>
                                </span>
                            ) : (
                                <MoneyFormat value={shipping?.cost} />
                            )}

                        </Price>
                    </PriceRow>
                    <PriceRow className="grandTotal">
                        <FormattedMessage id="totalText" defaultMessage="Total"/>
                        <Price>
                            <MoneyFormat value={total } />
                        </Price>
                    </PriceRow>
                </CostCalculation>
            </DeliveryInfo>

            <ProgressWrapper>
                <Progress status={order?.status} />
            </ProgressWrapper>

            <OrderTableWrapper>
                <Table
                    columns={[
                        {
                            title: <FormattedMessage id='cartItems' defaultMessage='Items'/>,
                            dataIndex: '',
                            key: 'items',
                            width: 250,
                            ellipsis: true,
                            render: (text, record) => {
                                if (record.isVariant) {
                                    // Render color variant row
                                    return (
                                        <ColorVariantItem>
                                            <VariantImageWrapper>
                                                <img src={record.image} alt={record.name}/>
                                            </VariantImageWrapper>
                                            <span> {record.name}</span>
                                        </ColorVariantItem>
                                    );
                                }

                                // Render main product row
                                return (
                                    <ItemWrapper>
                                        <ImageWrapper>
                                            <img src={record.image} alt={record.name}/>
                                        </ImageWrapper>

                                        <ItemDetails>
                                            <Link href="/product/[slug]" as={`/product/${record.slug}`}>
                                                <ItemName>
                                                    {record.name}
                                                    {record.hasVariants && (
                                                        <span style={{fontSize: '12px', color: '#666', display: 'block'}}>
                                                            <FormattedMessage id="withColorVariants" defaultMessage="With color variants"/>
                                                        </span>
                                                    )}
                                                </ItemName>
                                            </Link>
                                        </ItemDetails>
                                    </ItemWrapper>
                                );
                            },
                        },
                        {
                            title: <FormattedMessage id='intlTableColTitle2' defaultMessage='Quantity'/>,
                            dataIndex: 'quantity',
                            key: 'quantity',
                            align: 'center',
                            width: 100,
                            render: (quantity, record) => {
                                // Only show quantity if it's not a main product with variants
                                if (record.showQuantity !== false) {
                                    return quantity;
                                }
                                return null;
                            },
                        },
                        {
                            title: <FormattedMessage id='intlTableColTitle3' defaultMessage='Price'/>,
                            dataIndex: '',
                            key: 'price',
                            align: 'right',
                            width: 100,
                            render: (text, record) => {
                                if (record.isVariant) {
                                    // For variants, show price per item
                                    return <p><MoneyFormat value={record.price} /></p>;
                                } else if (record.showPrice !== false) {
                                    // For regular products, show total price
                                    return <p><MoneyFormat value={record.price * record.quantity} /></p>;
                                }
                                return null;
                            },
                        },
                    ]}
                    data={tableData}
                    rowKey={(record) => record.isVariant ? `variant-${record.id}` : `product-${record.id}`}
                    components={components}
                    className="orderDetailsTable"
                    // Add some styling for variant rows
                    onRow={(record) => ({
                        style: {
                            background: record.isVariant ? '#f9f9f9' : 'transparent',
                        }
                    })}
                />
            </OrderTableWrapper>
        </>
    );
};

export default OrderDetails;