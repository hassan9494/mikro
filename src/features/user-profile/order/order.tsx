import React, { useState, useEffect } from 'react';
import {
    DesktopView,
    MobileView,
    OrderBox,
    OrderListWrapper,
    OrderList,
    OrderDetailsWrapper,
    Title,
    NoOrderFound,
} from './order.style';
import OrderDetails from './order-details/order-details';
import OrderCard from './order-card/order-card';
import OrderCardMobile from './order-card/order-card-mobile';
import useComponentSize from 'utils/useComponentSize';
import { FormattedMessage } from 'react-intl';
import { useOrders } from 'data/use-orders';
import ErrorMessage from 'components/error-message/error-message';

// 30 days in milliseconds
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const COMPLETION_DATE_FIELD = 'completed_at';

const OrdersContent: React.FC<{}> = () => {
    const [targetRef, size] = useComponentSize();
    const { data: orders, error } = useOrders();
    const [selection, setSelection] = useState<any>(null);

    const getFilteredOrders = (ordersArray: any[]): any[] => {
        if (!ordersArray) return [];
        const now = Date.now();
        const thirtyDaysAgo = now - THIRTY_DAYS_MS;

        return ordersArray.filter((order) => {
            // Keep if not completed
            if (order.status?.toUpperCase?.() !== 'COMPLETED') return true;

            // Keep if order is taxed (always visible)
            if (order.taxed === true) return true;

            // Otherwise completed and not taxed: apply 30-day filter
            const completionDateStr = order[COMPLETION_DATE_FIELD];
            if (!completionDateStr) return false;

            const completionTime = new Date(completionDateStr).getTime();
            if (isNaN(completionTime)) return false;

            return completionTime >= thirtyDaysAgo;
        });
    };

    const filteredOrders = orders ? getFilteredOrders(orders) : [];

    useEffect(() => {
        if (filteredOrders.length > 0) {
            if (selection && filteredOrders.some((o) => o.id === selection.id)) {
                return;
            }
            setSelection(filteredOrders[0]);
        } else {
            setSelection(null);
        }
    }, [filteredOrders]);

    if (error) return <ErrorMessage message={error.message} />;
    if (!orders) return <div>loading...</div>;

    return (
        <OrderBox>
            {/* ----- DESKTOP VIEW ----- */}
            <DesktopView>
                <OrderListWrapper style={{ height: size.height }}>
                    <Title style={{ padding: '0 20px' }}>
                        <FormattedMessage id="intlOrderPageTitle" defaultMessage="My Order" />
                    </Title>

                    <div
                        style={{
                            height: 'calc(100% - 80px)',
                            overflowY: 'auto',
                            marginTop: '10px',
                        }}
                    >
                        <OrderList>
                            {filteredOrders.length !== 0 ? (
                                filteredOrders.map((current: any) => (
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
                                        id="intlNoOrderFound"
                                        defaultMessage="No order found"
                                    />
                                </NoOrderFound>
                            )}
                        </OrderList>
                    </div>
                </OrderListWrapper>

                <OrderDetailsWrapper ref={targetRef}>
                    <Title style={{ padding: '0 20px' }}>
                        <FormattedMessage id="orderDetailsText" defaultMessage="Order Details" />
                    </Title>
                    {selection && <OrderDetails order={selection} />}
                </OrderDetailsWrapper>
            </DesktopView>

            {/* ----- MOBILE VIEW ----- */}
            <MobileView>
                <OrderList>
                    <OrderCardMobile orders={filteredOrders} />
                </OrderList>
            </MobileView>
        </OrderBox>
    );
};

export default OrdersContent;