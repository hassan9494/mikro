import React, { useEffect, useState } from 'react';
import {
    SettingsForm,
    SettingsFormContent,
    ProfileOverviewCard,
    AvatarCircle,
    ProfileInfo,
    ProfileName,
    ProfileDetail,
    ProfileBadge,
    SectionCard,
    SectionHeader,
    SectionIcon,
    SectionTitle,
    FormRow,
    FormField,
    FormActions,
} from './settings.style';
import { Button } from 'components/button/button';
import { Input } from 'components/forms/input';
import { FormattedMessage } from 'react-intl';
import { Label } from 'components/forms/label';
import Address from 'features/address/address';
import useUser from 'data/use-user';
import { toast } from 'react-toastify';

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
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSave = async () => {
        try {
            await updateProfile({ name, email });
            toast.success('Your profile updated!');
        } catch (e) {}
    };

    const handleChangePassword = async () => {
        try {
            await changePassword(password, newPassword);
            toast.success('Your password changed!');
            setPassword('');
            setNewPassword('');
        } catch (e) {}
    };

    const getInitials = () => {
        if (!user?.name) return '?';
        const parts = user.name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return parts[0][0].toUpperCase();
    };

    return (
        <SettingsForm>
            <SettingsFormContent>
                {/* ======== PROFILE OVERVIEW CARD ======== */}
                <ProfileOverviewCard>
                    <AvatarCircle>{getInitials()}</AvatarCircle>
                    <ProfileInfo>
                        <ProfileName>{user?.name || '...'}</ProfileName>
                        <ProfileDetail>
                            <i className="bi bi-envelope" />
                            {user?.email || '...'}
                        </ProfileDetail>
                        {user?.phone && (
                            <ProfileDetail>
                                <i className="bi bi-telephone" />
                                {user.phone}
                            </ProfileDetail>
                        )}
                        <ProfileBadge>
                            <i className="bi bi-person-check" />
                            <FormattedMessage
                                id="profileVerifiedMember"
                                defaultMessage="Member"
                            />
                        </ProfileBadge>
                    </ProfileInfo>
                </ProfileOverviewCard>

                {/* ======== EDIT PROFILE ======== */}
                <SectionCard>
                    <SectionHeader>
                        <SectionIcon>
                            <i className="bi bi-person-gear" />
                        </SectionIcon>
                        <SectionTitle>
                            <FormattedMessage
                                id="profileEditTitle"
                                defaultMessage="Edit Profile"
                            />
                        </SectionTitle>
                    </SectionHeader>

                    <FormRow>
                        <FormField>
                            <Label style={{ marginBottom: '8px' }}>
                                <FormattedMessage
                                    id="profileNameField"
                                    defaultMessage="Your Name"
                                />
                            </Label>
                            <Input
                                type="text"
                                label="Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                backgroundColor="#F7F7F7"
                                height="48px"
                            />
                        </FormField>

                        <FormField>
                            <Label style={{ marginBottom: '8px' }}>
                                <FormattedMessage
                                    id="profileEmailField"
                                    defaultMessage="Your Email"
                                />
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                label="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                backgroundColor="#F7F7F7"
                                height="48px"
                            />
                        </FormField>
                    </FormRow>

                    <FormActions>
                        <Button size="big" style={{ minWidth: '150px' }} onClick={handleSave}>
                            <FormattedMessage
                                id="profileSaveBtn"
                                defaultMessage="Save"
                            />
                        </Button>
                    </FormActions>
                </SectionCard>

                {/* ======== CHANGE PASSWORD ======== */}
                <SectionCard>
                    <SectionHeader>
                        <SectionIcon>
                            <i className="bi bi-shield-lock" />
                        </SectionIcon>
                        <SectionTitle>
                            <FormattedMessage
                                id="profileChangePasswordTitle"
                                defaultMessage="Change Password"
                            />
                        </SectionTitle>
                    </SectionHeader>

                    <FormRow>
                        <FormField>
                            <Label style={{ marginBottom: '8px' }}>
                                <FormattedMessage
                                    id="profileCurrentPasswordField"
                                    defaultMessage="Current Password"
                                />
                            </Label>
                            <Input
                                type="password"
                                label="Current Password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                backgroundColor="#F7F7F7"
                                height="48px"
                            />
                        </FormField>

                        <FormField>
                            <Label style={{ marginBottom: '8px' }}>
                                <FormattedMessage
                                    id="profileNewPasswordField"
                                    defaultMessage="New Password"
                                />
                            </Label>
                            <Input
                                type="password"
                                name="newPassword"
                                label="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                backgroundColor="#F7F7F7"
                                height="48px"
                            />
                        </FormField>
                    </FormRow>

                    <FormActions>
                        <Button
                            size="big"
                            style={{ minWidth: '200px' }}
                            onClick={handleChangePassword}
                        >
                            <FormattedMessage
                                id="profileChangePasswordBtn"
                                defaultMessage="Change Password"
                            />
                        </Button>
                    </FormActions>
                </SectionCard>

                {/* ======== SHIPPING ADDRESSES ======== */}
                <SectionCard>
                    <SectionHeader>
                        <SectionIcon>
                            <i className="bi bi-geo-alt" />
                        </SectionIcon>
                        <SectionTitle>
                            <FormattedMessage
                                id="deliveryAddressTitle"
                                defaultMessage="Delivery Address"
                            />
                        </SectionTitle>
                    </SectionHeader>

                    <Address />
                </SectionCard>
            </SettingsFormContent>
        </SettingsForm>
    );
};

export default SettingsContent;
