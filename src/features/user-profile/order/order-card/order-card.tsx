import React from 'react';
import {
    SingleOrderList,
    OrderListHeader,
    TrackID,
    Status,
    OrderMeta,
    Meta,
    ProductList,
    ProductItem,
    ColorVariantItem, // You'll need to add this to your style file
} from './order-card.style';
import { FormattedMessage } from 'react-intl';
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
    // Function to render product items with color variants
    const renderProductItems = () => {
        return order?.items?.map((item, index) => {
            if (item.has_colors && item.colors.length > 0) {
                // Product with colors - show main name and color variants
                return (
                    <div key={index}>
                        <ProductItem><strong>{item.name}</strong></ProductItem>
                        {item.colors.map((color, colorIndex) => (
                            <ColorVariantItem key={colorIndex}>
                                - {color.name}
                            </ColorVariantItem>
                        ))}
                    </div>
                );
            } else {
                // Product without colors - show just the name
                return (
                    <ProductItem key={index}>
                        {item.name}
                    </ProductItem>
                );
            }
        });
    };

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

                    {order?.items && order.items.length > 0 && (
                        <Meta>
                            <FormattedMessage
                                id="intlOrderCardItemsText"
                                defaultMessage="Items"
                            />
                            :
                            <ProductList>
                                {renderProductItems()}
                            </ProductList>
                        </Meta>
                    )}

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