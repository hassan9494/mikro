import { NextPage } from 'next';
import { Modal } from '@redq/reuse-modal';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import SettingsContent from 'features/user-profile/settings/settings';
import {
    PageWrapper,
    SidebarSection,
    ContentBox,
} from 'features/user-profile/user-profile.style';
import Sidebar from 'features/user-profile/sidebar/sidebar';
import { SEO } from 'components/seo';
import Footer from 'layouts/footer';
import ErrorMessage from 'components/error-message/error-message';
import useUser from 'data/use-user';
import { useEffect } from "react";
import Router from "next/router";

type Props = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {

    const { error } = useUser();

    useEffect(() => {
        if (error) Router.push('/');
    }, [error]);

    return (
        <>
            <SEO title="Profile - Mikroelectron" description="Profile Details"/>
            {/*<ProfileProvider initData={user}>*/}
                <Modal>
                    <PageWrapper>
                        <SidebarSection>
                            <Sidebar/>
                        </SidebarSection>
                        <ContentBox>
                            <SettingsContent deviceType={deviceType}/>
                        </ContentBox>
                    </PageWrapper>
                    <Footer/>
                </Modal>
            {/*</ProfileProvider>*/}
        </>
    );
};

export default ProfilePage;
