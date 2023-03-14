import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { SEO } from 'components/seo';
import Order from 'features/user-profile/order/order';
import {
    PageWrapper,
    SidebarSection,
} from 'features/user-profile/user-profile.style';
import Sidebar from 'features/user-profile/sidebar/sidebar';
import { Modal } from '@redq/reuse-modal';
import Router from "next/router";
import useUser from "../data/use-user";

const OrderPage: NextPage = () => {

    const { error } = useUser();

    useEffect(() => {
        if (error) Router.push('/');
    }, [error]);

    return (
        <>
            <SEO title="Order - Mikroelectron" description="Order Details"/>
            <Modal>
                <PageWrapper>
                    <SidebarSection>
                        <Sidebar/>
                    </SidebarSection>
                    <Order/>
                </PageWrapper>
            </Modal>
        </>
    );
};

export default OrderPage;
