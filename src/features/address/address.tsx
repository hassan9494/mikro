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
import { useAppDispatch } from "../../contexts/app/app.provider";
import useUser from "../../data/use-user";

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

    const { data: addresses } = useAddresses();
    const { hasOnlyUserRole } = useUser();
    const dispatch = useAppDispatch();

    const handleOnDelete = async (item) => {
        if (!hasOnlyUserRole) {
            alert('Employees cannot delete addresses. Please use guest checkout.');
            return;
        }
        await api.delete(item.id);
    };

    const onSetPrimary = async ({ id }) => {
        if (!hasOnlyUserRole) {
            alert('Employees cannot manage addresses. Please use guest checkout.');
            return;
        }
        
        try {
            dispatch({ type: 'SET_LOADING', payload: true })
            await api.primary(id)
        } catch (e) {
            // Handle error
        }
        dispatch({ type: 'SET_LOADING', payload: false })
    };

    // If user is an employee, show message instead of addresses
    if (!hasOnlyUserRole) {
        return (
            <div style={{ 
                padding: '20px', 
                textAlign: 'center',
                border: '1px dashed #ddd',
                borderRadius: '4px',
                marginBottom: '20px'
            }}>
                <FormattedMessage
                    id='employeeAddressMessage'
                    defaultMessage='Employees should use guest checkout to enter customer addresses. Your saved addresses are not available.'
                />
            </div>
        );
    }

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
                            onChange={() => hasOnlyUserRole ? onSetPrimary(item) : null}
                            onEdit={() => hasOnlyUserRole ? handleModal(UpdateAddress, item) : null}
                            onDelete={() => hasOnlyUserRole ? handleOnDelete(item) : null}
                            disabled={!hasOnlyUserRole}
                        />
                    )}
                    secondaryComponent={
                        hasOnlyUserRole ? (
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
                        ) : null
                    }
                />
            </ButtonGroup>
        </>
    );
};

export default Address;