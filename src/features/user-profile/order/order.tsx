import React, { useState, useEffect } from 'react';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import {
    DesktopView,
    MobileView,
    OrderBox,
    OrderListWrapper,
    OrderList,
    OrderDetailsWrapper,
    Title,
    ImageWrapper,
    ItemWrapper,
    ItemDetails,
    ItemName,
    ItemSize,
    ItemPrice,
    NoOrderFound,
} from './order.style';

import OrderDetails from './order-details/order-details';
import OrderCard from './order-card/order-card';
import OrderCardMobile from './order-card/order-card-mobile';
import useComponentSize from 'utils/useComponentSize';
import { FormattedMessage } from 'react-intl';
import { useOrders } from 'data/use-orders';
import ErrorMessage from 'components/error-message/error-message';


const OrdersContent: React.FC<{}> = () => {
    const [targetRef, size] = useComponentSize();
    const orderListHeight = size.height - 79;
    const { data, error } = useOrders();
    const [selection, setSelection] = useState(null);

    useEffect(() => {
        if (data?.length) {
            setSelection(data[0]);
        }
    }, [data?.length]);

    if (error) return <ErrorMessage message={error.message}/>;
    if (!data) return <div>loading...</div>;

    return (
        <OrderBox>
            <DesktopView>
                <OrderListWrapper style={{ height: size.height }}>
                    <Title style={{ padding: '0 20px' }}>
                        <FormattedMessage
                            id='intlOrderPageTitle'
                            defaultMessage='My Order'
                        />
                    </Title>

                    <Scrollbar className='order-scrollbar'>
                        <OrderList>
                            {data.length !== 0 ? (
                                data.map((current: any) => (
                                    <OrderCard
                                        key={current.id}
                                        order={current}
                                        className={current.id === selection?.id ? 'active' : ''}
                                        onClick={() => setSelection(current)}
                                    />
                                ))
                            ) : (
                                <NoOrderFound>
                                    <FormattedMessage
                                        id='intlNoOrderFound'
                                        defaultMessage='No order found'
                                    />
                                </NoOrderFound>
                            )}
                        </OrderList>
                    </Scrollbar>
                </OrderListWrapper>

                <OrderDetailsWrapper ref={targetRef}>
                    <Title style={{ padding: '0 20px' }}>
                        <FormattedMessage
                            id='orderDetailsText'
                            defaultMessage='Order Details'
                        />
                    </Title>
                    {selection && (
                        <OrderDetails
                            order={selection}
                        />
                    )}
                </OrderDetailsWrapper>
            </DesktopView>

            <MobileView>
                <OrderList>
                    <OrderCardMobile
                        orders={data}
                    />
                </OrderList>
            </MobileView>
        </OrderBox>
    );
};

export default OrdersContent;
