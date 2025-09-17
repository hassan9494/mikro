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

type OrderDetailsProps = {
    order?: any;
};

const components = {
    table: OrderTable,
};



const OrderDetails: React.FC<OrderDetailsProps> = ({
   order,
}) => {
    const { subtotal, discount, shipping, total, coupon_discount } = order;

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
                            <MoneyFormat value={discount + coupon_discount} />
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
                            <MoneyFormat value={total - coupon_discount} />
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
                                return (
                                    <ItemWrapper>
                                        <ImageWrapper>
                                            <img src={record.image} alt={record.title}/>
                                        </ImageWrapper>

                                        <ItemDetails>
                                            <Link href="/product/[slug]" as={`/product/${record.slug}`}>
                                            <ItemName>{record.name}</ItemName>
                                            </Link>
                                            {/*<ItemSize>{record.weight}</ItemSize>*/}
                                            <ItemPrice><MoneyFormat value={record.price} /></ItemPrice>
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
                        },
                        {
                            title: <FormattedMessage id='intlTableColTitle3' defaultMessage='Price'/>,
                            dataIndex: '',
                            key: 'price',
                            align: 'right',
                            width: 100,
                            render: (text, record) => {
                                return <p><MoneyFormat value={record.price * record.quantity} /></p>;
                            },
                        },
                    ]}
                    data={order?.items || []}
                    rowKey={(record) => record.id}
                    components={components}
                    className="orderDetailsTable"
                    // scroll={{ y: 350 }}
                />
            </OrderTableWrapper>
        </>
    );
};


export default OrderDetails;
