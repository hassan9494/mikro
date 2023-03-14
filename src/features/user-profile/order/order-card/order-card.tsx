import React from 'react';
import {
    SingleOrderList,
    OrderListHeader,
    TrackID,
    Status,
    OrderMeta,
    Meta,
} from './order-card.style';
import { FormattedMessage } from 'react-intl';

import { CURRENCY } from 'utils/constant';
import MoneyFormat from "../../../../components/money-format/money-format";
import moment from "moment";

type OrderCardProps = {
    order?: any;
    onClick?: (e: any) => void;
    className?: any;
};

const OrderCard: React.FC<OrderCardProps> = ({
     onClick,
     className,
     order,
 }) => {
    return (
        <>
            <SingleOrderList onClick={onClick} className={className}>
                <OrderListHeader>
                    <TrackID>
                        <FormattedMessage
                            id="intlOrderCardTitleText"
                            defaultMessage="Order"
                        />
                        <span> #{order?.number}</span>
                    </TrackID>
                    <Status>{order?.status}</Status>
                </OrderListHeader>

                <OrderMeta>
                    <Meta>
                        <FormattedMessage
                            id="intlOrderCardDateText"
                            defaultMessage="Order Date"
                        />
                        : <span>{moment(order.date).format('Y/MM/DD')}</span>
                    </Meta>
                    <Meta className="price">
                        <FormattedMessage
                            id="intlOrderCardTotalText"
                            defaultMessage="Total Price"
                        />
                        :
                        <span>
                            <MoneyFormat value={order.total} />
            </span>
                    </Meta>
                </OrderMeta>
            </SingleOrderList>
        </>
    );
};

export default OrderCard;
