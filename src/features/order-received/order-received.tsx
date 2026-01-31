import React, {useEffect} from 'react';
import Link from 'next/link';
import OrderReceivedWrapper, {
    OrderReceivedContainer,
    OrderInfo,
    OrderDetails,
    TotalAmount,
    BlockTitle,
    Text,
    InfoBlockWrapper,
    InfoBlock,
    ListItem,
    ListTitle,
    ListDes,
} from './order-received.style';
import {FormattedMessage} from 'react-intl';
import Router from "next/router";
import {useAppState} from "../../contexts/app/app.provider";
import MoneyFormat from "components/money-format/money-format";
import dayjs from "dayjs";

type OrderReceivedProps = {};

const OrderReceived: React.FunctionComponent<OrderReceivedProps> = (props) => {

    const received = useAppState('receivedOrder');

    useEffect(() => {
        if (!received?.id) Router.push('/');
    }, [received]);

    if (!received) return (<div></div>);

    return (
        <OrderReceivedWrapper>
            <OrderReceivedContainer>
                <Link href="/" className="home-btn">
                    <FormattedMessage id="backHomeBtn" defaultMessage="Back to Home"/>
                </Link>

                <OrderInfo>
                    <BlockTitle>
                        <FormattedMessage
                            id="orderReceivedText"
                            defaultMessage="Order Received"
                        />
                    </BlockTitle>

                    <Text>
                        <FormattedMessage
                            id="orderReceivedSuccess"
                            defaultMessage="Thank you. Your order has been received"
                        />
                    </Text>

                    <InfoBlockWrapper>
                        <InfoBlock>
                            <Text bold className="title">
                                <FormattedMessage
                                    id="orderNumberText"
                                    defaultMessage="Order Number"
                                />
                            </Text>
                            <Text>#{received?.number}</Text>
                        </InfoBlock>

                        <InfoBlock>
                            <Text bold className="title">
                                <FormattedMessage id="totalText" defaultMessage="Total"/>
                            </Text>
                            <Text><MoneyFormat value={received?.total}/></Text>
                        </InfoBlock>

                        <InfoBlock>
                            <Text bold className="title">
                                <FormattedMessage
                                    id="paymenMethodText"
                                    defaultMessage="Payment Method"
                                />
                            </Text>
                            <Text>
                                <FormattedMessage
                                    id="paymentMethodName"
                                    defaultMessage="Cash on delivery"
                                />
                            </Text>
                        </InfoBlock>
                    </InfoBlockWrapper>
                </OrderInfo>

                <OrderDetails>
                    <BlockTitle>
                        <FormattedMessage
                            id="orderDetailsText"
                            defaultMessage="Order Details"
                        />
                    </BlockTitle>

                    <ListItem>
                        <ListTitle>
                            <Text bold>
                                <FormattedMessage
                                    id="totalItemText"
                                    defaultMessage="Total Item"
                                />
                            </Text>
                        </ListTitle>
                        <ListDes>
                            <Text>{received?.items?.length} Items</Text>
                        </ListDes>
                    </ListItem>

                    <ListItem>
                        <ListTitle>
                            <Text bold>
                                <FormattedMessage
                                    id="orderTimeText"
                                    defaultMessage="Order Time"
                                />
                            </Text>
                        </ListTitle>
                        <ListDes>
                            <Text>{dayjs(received?.date).format('YYYY/M/D')}</Text>
                        </ListDes>
                    </ListItem>

                    <ListItem>
                        <ListTitle>
                            <Text bold>
                                <FormattedMessage
                                    id="cityText"
                                    defaultMessage="City"
                                />
                            </Text>
                        </ListTitle>
                        <ListDes>
                            <Text>
                                {received?.shipping?.city}
                            </Text>
                        </ListDes>
                    </ListItem>

                    <ListItem>
                        <ListTitle>
                            <Text bold>
                                <FormattedMessage
                                    id="addressText"
                                    defaultMessage="Address"
                                />
                            </Text>
                        </ListTitle>
                        <ListDes>
                            <Text>
                                {received?.shipping?.address}
                            </Text>
                        </ListDes>
                    </ListItem>

                </OrderDetails>

                <TotalAmount>
                    <BlockTitle>
                        <FormattedMessage
                            id="totalAmountText"
                            defaultMessage="Total Amount"
                        />
                    </BlockTitle>

                    <ListItem>
                        <ListTitle>
                            <Text bold>
                                <FormattedMessage id="subTotal" defaultMessage="Sub total"/>
                            </Text>
                        </ListTitle>
                        <ListDes>
                            <Text><MoneyFormat value={received?.subtotal}/></Text>
                        </ListDes>
                    </ListItem>

                    <ListItem>
                        <ListTitle>
                            <Text bold>
                                <FormattedMessage id="shippingCost" defaultMessage="Shipping Cost"/>
                            </Text>
                        </ListTitle>
                        <ListDes>
                            <Text>
                                {received?.shipping?.free ? (
                                    <span style={{color: 'green', fontWeight: 'bold'}}>
          <FormattedMessage id='freeShipping' defaultMessage='FREE'/>
        </span>
                                ) : (
                                    <MoneyFormat value={received?.shipping?.cost}/>
                                )}
                            </Text>
                        </ListDes>

                    </ListItem>

                    <ListItem>
                        <ListTitle>
                            <Text bold>
                                <FormattedMessage id="totalText" defaultMessage="Total"/>
                            </Text>
                        </ListTitle>
                        <ListDes>
                            <Text><MoneyFormat value={received?.total}/></Text>
                        </ListDes>
                    </ListItem>
                </TotalAmount>
            </OrderReceivedContainer>
        </OrderReceivedWrapper>
    );
};

export default OrderReceived;
