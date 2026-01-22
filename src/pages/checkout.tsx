import React from 'react';
import { NextPage } from 'next';
import { Modal } from 'components/modal/modal-provider';
import { SEO } from 'components/seo';
import Checkout from 'features/checkouts/checkout-two/checkout-two';
import CheckoutGuest from 'features/checkouts/checkout-guest/checkout-guest';
import CheckoutEmployee from 'features/checkouts/checkout-employee/checkout-employee';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import useUser from 'data/use-user';

const CheckoutPage: NextPage<void> = () => {
    const { user, hasOnlyUserRole } = useUser();
    
    // Use the hasOnlyUserRole from the hook, which already handles no roles correctly
    const showUserCheckout = user && hasOnlyUserRole;
    const showEmployeeCheckout = user && !hasOnlyUserRole;
    const showGuestCheckout = !user;

    return (
        <>
            <SEO title='Checkout'  description='Checkout Details' />
            <ProfileProvider initData={user}>
                <Modal>
                    { showUserCheckout && <Checkout /> }
                    { showEmployeeCheckout && <CheckoutEmployee user={user} /> }
                    { showGuestCheckout && <CheckoutGuest /> }
                </Modal>
            </ProfileProvider>
        </>
    );
};

export default CheckoutPage;