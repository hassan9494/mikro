import React from 'react';
import { NextPage } from 'next';
import { Modal } from '@redq/reuse-modal';
import { SEO } from 'components/seo';
import Checkout from 'features/checkouts/checkout-two/checkout-two';
import CheckoutGuest from 'features/checkouts/checkout-guest/checkout-guest';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import useUser from 'data/use-user';

const CheckoutPage: NextPage<void> = () => {
    const { user } = useUser();
    return (
        <>
            <SEO title='Checkout'  description='Checkout Details' />
            <ProfileProvider initData={user}>
                <Modal>
                    {  user && <Checkout /> }
                    { !user && <CheckoutGuest /> }
                </Modal>
            </ProfileProvider>
        </>
    );
};

export default CheckoutPage;
