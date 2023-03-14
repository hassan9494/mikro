import React, { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ProfileContext } from 'contexts/profile/profile.context';
import { CardHeader } from 'components/card-header/card-header';
import { Input } from 'components/forms/input';
import { Textarea } from 'components/forms/textarea';
import useUser from 'data/use-user';

interface Props {
    increment?: boolean;
    icon?: boolean;
    buttonProps?: any;
    flexStart?: boolean;
}

const Information = ({
    increment = false,
    flexStart = false,
    icon = false,
    buttonProps = {
        size: 'big',
        variant: 'outlined',
        type: 'button',
        className: 'add-button',
    },
}: Props) => {

    const intl = useIntl();
    const { user } = useUser();

    const {
        state: { address },
        dispatch,
    } = useContext(ProfileContext);

    return (
        <>
            <CardHeader increment={increment}>
                <FormattedMessage
                    id='checkoutBasicInformation'
                    defaultMessage='Select Your Delivery Address'
                />
            </CardHeader>

            <Input
                type='text'
                placeholder={intl.formatMessage({
                    id: 'checkoutBasicName',
                    defaultMessage: 'Your name',
                })}
                height='48px'
                backgroundColor='#F7F7F7'
                mb='10px'
                value={user?.name}
            />

            <Input
                type='text'
                placeholder={intl.formatMessage({
                    id: 'checkoutBasicEmail',
                    defaultMessage: 'Email Address',
                })}
                height='48px'
                backgroundColor='#F7F7F7'
                mb='10px'
                value={user?.email}
            />

            <Input
                type='text'
                placeholder={intl.formatMessage({
                    id: 'checkoutBasicPhone',
                    defaultMessage: 'Phone',
                })}
                height='48px'
                backgroundColor='#F7F7F7'
                mb='10px'
            />

            <Textarea
                placeholder={intl.formatMessage({
                    id: 'checkoutBasicNote',
                    defaultMessage: 'Notes',
                })}
                rows={3}
                backgroundColor='#F7F7F7'
                mb='10px'
            />

        </>
    );
};

export default Information;
