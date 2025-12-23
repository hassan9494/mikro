import React from 'react';
import Table from 'rc-table';
import Collapse, { Panel } from 'rc-collapse';
import Progress from 'components/progress-box/progress-box';

import {
    OrderListHeader,
    TrackID,
    Status,
    OrderMeta,
    Meta,
    CardWrapper,
    OrderDetail,
    DeliveryInfo,
    DeliveryAddress,
    Address,
    CostCalculation,
    PriceRow,
    Price,
    ProgressWrapper,
    OrderTable,
    OrderTableMobile,
} from './order-card.style';

import { CURRENCY } from 'utils/constant';
import dayjs from "dayjs";
import MoneyFormat from "../../../../components/money-format/money-format";
import { FormattedMessage } from "react-intl";
import { ImageWrapper, ItemDetails, ItemName, ItemPrice, ItemWrapper } from "../order.style";
import Image from 'components/image/image';

type MobileOrderCardProps = {
    orderId?: any;
    onClick?: (e: any) => void;
    className?: any;
    status?: any;
    date?: any;
    deliveryTime?: any;
    amount?: number;
    tableData?: any;
    columns?: any;
    progressData?: any;
    progressStatus?: any;
    address?: string;
    subtotal?: number;
    discount?: number;
    deliveryFee?: number;
    grandTotal?: number;
    orders?: any;
};

const OrderCard: React.FC<MobileOrderCardProps> = ({
                                                       className,
                                                       orders,
                                                   }) => {
    return (
        <>
            <Collapse
                accordion={true}
                className={`accordion ${className}`}
                defaultActiveKey="active"
            >
                {orders?.map((order: any) => (
                    <Panel
                        header={
                            <CardWrapper>
                                <OrderListHeader>
                                    <TrackID>
                                        Order <span>#{order.number}</span>
                                    </TrackID>
                                    <Status>{order.status}</Status>
                                </OrderListHeader>

                                <OrderMeta>
                                    <Meta>
                                        Order Date: <span>{dayjs(order.date).format('YYYY/MM/DD')}</span>
                                    </Meta>
                                    <Meta>
                                        Delivery Cost:
                                        <span>
    {order.shipping?.free ? (
        <span style={{ color: 'green', fontWeight: 'bold' }}>
        <FormattedMessage id='freeShipping' defaultMessage='FREE'/>
      </span>
    ) : (
        <MoneyFormat value={order.shipping?.cost} />
    )}
  </span>
                                    </Meta>
                                    <Meta className="price">
                                        Total Price:
                                        <span>
                                            <MoneyFormat value={order.total - order.coupon_discount} />
                                        </span>
                                    </Meta>
                                </OrderMeta>
                            </CardWrapper>
                        }
                        headerClass="accordion-title"
                        key={order.id}
                    >
                        <OrderDetail>
                            <DeliveryInfo>
                                <DeliveryAddress>
                                    <h3>Delivery Address</h3>
                                    <Address>{order.deliveryAddress}</Address>
                                </DeliveryAddress>

                                <CostCalculation>
                                    <PriceRow>
                                        Subtotal
                                        <span>
                                            <MoneyFormat value={order.subtotal} />
                                        </span>
                                    </PriceRow>
                                    <PriceRow>
                                        Discount
                                        <span>
                                            <MoneyFormat value={order.discount + order.coupon_discount} />
                                        </span>
                                    </PriceRow>
                                    <PriceRow>
                                        Delivery Fee
                                        <span>
    {order.shipping?.free ? (
        <span style={{ color: 'green', fontWeight: 'bold' }}>
        <FormattedMessage id='freeShipping' defaultMessage='FREE'/>
      </span>
    ) : (
        <MoneyFormat value={order.shipping?.cost} />
    )}
  </span>
                                    </PriceRow>
                                    <PriceRow className="grandTotal">
                                        Total
                                        <span>
                                            <MoneyFormat value={order.total - order.coupon_discount} />
                                        </span>
                                    </PriceRow>
                                </CostCalculation>
                            </DeliveryInfo>

                            <ProgressWrapper>
                                <Progress status={order.status}/>
                            </ProgressWrapper>

                            <OrderTableMobile>
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
                                                            <Image url={record.image} alt={record.title} width={75} height={75} />
                                                        </ImageWrapper>

                                                        <ItemDetails>
                                                            <ItemName>{record.name}</ItemName>
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
                                    scroll={{ x: 450 }}
                                    // scroll={{ y: 250 }}
                                />
                            </OrderTableMobile>
                        </OrderDetail>
                    </Panel>
                ))}
            </Collapse>
        </>
    );
};

export default OrderCard;
