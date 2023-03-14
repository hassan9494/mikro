import React from 'react';
import { FormattedMessage } from 'react-intl';
import RadioGroup from 'components/radio-group/radio-group';
import RadioCard from 'components/radio-card/radio-card';
import { Button } from 'components/button/button';
import UpdateAddress from 'components/address-card/address-card';
import { handleModal } from 'features/checkouts/checkout-modal';
import { ButtonGroup } from 'components/button-group/button-group';
import { Box } from 'components/box';
import { Plus } from 'assets/icons/PlusMinus';
import useAddresses, { api } from "data/use-address";
import {useAppDispatch} from "../../contexts/app/app.provider";

interface Props {
    increment?: boolean;
    icon?: boolean;
    buttonProps?: any;
    flexStart?: boolean;
}

const Address = ({
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

    const { data: addresses } = useAddresses()

    const dispatch = useAppDispatch();

    const handleOnDelete = async (item) => {
        await api.delete(item.id)
    };

    const onSetPrimary = async ({ id }) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true })
            await api.primary(id)
        } catch (e) {

        }
        dispatch({ type: 'SET_LOADING', payload: false })
    };

    return (
        <>
            <ButtonGroup flexStart={flexStart}>
                <RadioGroup
                    items={addresses}
                    component={(item: any) => (
                        <RadioCard
                            id={item.id}
                            key={item.id}
                            title={item.name}
                            content={item.content}
                            name='address'
                            checked={item.is_primary}
                            onChange={() => onSetPrimary(item)}
                            onEdit={() => handleModal(UpdateAddress, item)}
                            onDelete={() => handleOnDelete(item)}
                        />
                    )}
                    secondaryComponent={
                        <Button
                            {...buttonProps}
                            onClick={() => handleModal(UpdateAddress, 'add-address-modal')}
                            style={{ borderStyle: 'dashed' }}
                        >
                            {icon && (
                                <Box mr={2}>
                                    <Plus width='10px'/>
                                </Box>
                            )}
                            <FormattedMessage
                                id='addAddressBtn'
                                defaultMessage='Add Address'
                            />
                        </Button>
                    }
                />
            </ButtonGroup>
        </>
    );
};

export default Address;
