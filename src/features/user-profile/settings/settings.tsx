import React, {useContext, useEffect, useState} from 'react';
import { ProfileContext } from 'contexts/profile/profile.context';
import {
    SettingsForm,
    SettingsFormContent,
    HeadingSection,
    Title,
    Row,
    Col,
} from './settings.style';
import { Button } from 'components/button/button';
import { Input } from 'components/forms/input';
import { FormattedMessage } from 'react-intl';
import { Label } from 'components/forms/label';
import Contact from 'features/contact/contact';
import Address from 'features/address/address';
import useUser from 'data/use-user';
import { toast } from 'react-toastify';
import {useAppDispatch} from "../../../contexts/app/app.provider";

type SettingsContentProps = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
};

const SettingsContent: React.FC<SettingsContentProps> = ({ deviceType }) => {

    const { user, loading, updateProfile, changePassword } = useUser();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        if(user) {
            setName(user.name)
            setEmail(user.email)
        }
    }, [user])


    const handleSave = async () => {
        try {
            await updateProfile({ name, email });
            toast.success('Your profile updated!');
        } catch (e) {
        }
    };

    const handleChangePassword = async () => {
        try {
            await changePassword(password, newPassword);
            toast.success('Your password changed!');
        } catch (e) {
        }
    };


    return (
        <SettingsForm>
            <SettingsFormContent>
                <HeadingSection>
                    <Title>
                        <FormattedMessage
                            id='profilePageTitle'
                            defaultMessage='Your Profile'
                        />
                    </Title>
                </HeadingSection>
               <Row style={{ marginBottom: '50px', display: 'flex', flexWrap: 'wrap' }}>
                    <Col style={{ flex: 1, minWidth: '250px', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                        <Label style={{ marginBottom: '8px' }}>
                            <FormattedMessage
                                id='profileNameField'
                                defaultMessage='Your Name'
                            />
                        </Label>
                        <div style={{ marginTop: 'auto' }}>
                            <Input
                                type='text'
                                label='Name'
                                name='name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                backgroundColor='#F7F7F7'
                                height='48px'
                                style={{ width: '100%' }}
                            />
                        </div>
                    </Col>

                    <Col style={{ flex: 1, minWidth: '250px', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                        <Label style={{ marginBottom: '8px' }}>
                            <FormattedMessage
                                id='profileEmailField'
                                defaultMessage='Your Email'
                            />
                        </Label>
                        <div style={{ marginTop: 'auto' }}>
                            <Input
                                type='email'
                                name='email'
                                label='Email Address'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                backgroundColor='#F7F7F7'
                                height='48px'
                                style={{ width: '100%' }}
                            />
                        </div>
                    </Col>

                    <Col style={{ flex: 1, minWidth: '250px', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '28px', marginBottom: '8px' }}></div> {/* Spacer for label alignment */}
                        <div style={{ marginTop: 'auto' }}>
                            <Button size='big' style={{ width: '100%', height: '48px' }} onClick={handleSave}>
                                <FormattedMessage id='profileSaveBtn' defaultMessage='Save'/>
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '50px', display: 'flex', flexWrap: 'wrap' }}>
                    <Col style={{ flex: 1, minWidth: '250px', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                        <Label style={{ marginBottom: '8px' }}>
                            <FormattedMessage
                                id='profileCurrentPasswordField'
                                defaultMessage='Current Password'
                            />
                        </Label>
                        <div style={{ marginTop: 'auto' }}>
                            <Input
                                type='password'
                                label='Current Password'
                                name='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                backgroundColor='#F7F7F7'
                                height='48px'
                                style={{ width: '100%' }}
                            />
                        </div>
                    </Col>

                    <Col style={{ flex: 1, minWidth: '250px', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                        <Label style={{ marginBottom: '8px' }}>
                            <FormattedMessage
                                id='profileNewPasswordField'
                                defaultMessage='New Password'
                            />
                        </Label>
                        <div style={{ marginTop: 'auto' }}>
                            <Input
                                type='password'
                                name='newPassword'
                                label='New Password'
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                backgroundColor='#F7F7F7'
                                height='48px'
                                style={{ width: '100%' }}
                            />
                        </div>
                    </Col>

                    <Col style={{ flex: 1, minWidth: '250px', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '28px', marginBottom: '8px' }}></div> {/* Spacer for label alignment */}
                        <div style={{ marginTop: 'auto' }}>
                            <Button size='big' style={{ width: '100%', height: '48px' }} onClick={handleChangePassword}>
                                <FormattedMessage id='profileChangePasswordBtn' defaultMessage='Change Password'/>
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ position: 'relative' }}>
                        <SettingsFormContent>
                            <Address/>
                        </SettingsFormContent>
                    </Col>
                </Row>
            </SettingsFormContent>
        </SettingsForm>
    );
};

export default SettingsContent;

