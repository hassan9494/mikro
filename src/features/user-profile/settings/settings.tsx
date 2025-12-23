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
            setEmail(user.name)
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
                <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
                    <Col>
                        <Label>
                            <FormattedMessage
                                id='profileNameField'
                                defaultMessage='Your Name'
                            />
                        </Label>
                        <Input
                            type='text'
                            label='Name'
                            name='name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            backgroundColor='#F7F7F7'
                            height='48px'
                        />
                    </Col>

                    <Col>
                        <Label>
                            <FormattedMessage
                                id='profileEmailField'
                                defaultMessage='Your Email'
                            />
                        </Label>
                        <Input
                            type='email'
                            name='email'
                            label='Email Address'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            backgroundColor='#F7F7F7'
                        />
                    </Col>

                    <Col>
                        <Button size='big' style={{ width: '100%' }} onClick={handleSave}>
                            <FormattedMessage id='profileSaveBtn' defaultMessage='Save'/>
                        </Button>
                    </Col>
                </Row>
                <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
                    <Col>
                        <Label>
                            <FormattedMessage
                                id='profileCurrentPasswordField'
                                defaultMessage='Current Password'
                            />
                        </Label>
                        <Input
                            type='password'
                            label='Current Password'
                            name='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            backgroundColor='#F7F7F7'
                            height='48px'
                        />
                    </Col>

                    <Col>
                        <Label>
                            <FormattedMessage
                                id='profileNewPasswordField'
                                defaultMessage='New Password'
                            />
                        </Label>
                        <Input
                            type='password'
                            name='newPassword'
                            label='New Password'
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            backgroundColor='#F7F7F7'
                        />
                    </Col>

                    <Col>
                        <Button size='big' style={{ width: '100%' }} onClick={handleChangePassword}>
                            <FormattedMessage id='profileChangePasswordBtn' defaultMessage='Change Password'/>
                        </Button>
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

