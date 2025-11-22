import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';
import { toast } from 'react-toastify';
import CouponDisplay from 'components/coupon-display/coupon-display';
import { CouponBoxWrapper, Error } from './coupon.style';
import { Input } from 'components/forms/input';
import { Button } from 'components/button/button';
import { verifyCoupon } from 'data/use-coupon';

type CouponProps = {
    disabled?: boolean;
    className?: string;
    style?: any;
    errorMsgFixed?: boolean;
};

const Coupon: React.FC<CouponProps> = ({
                                           disabled,
                                           className,
                                           style,
                                           errorMsgFixed = false,
                                           ...props
                                       }) => {
    const intl = useIntl();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { applyCoupon, removeCoupon, coupon } = useCart();

    const handleApplyCoupon = async () => {
        if (!code.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const data = await verifyCoupon(code);
            const result = await applyCoupon({...data, code});

            if (result.success) {
                toast.success('Coupon applied successfully');
                setCode('');
            } else {
                setError(result.message);
                toast.error(result.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to apply coupon';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveCoupon = () => {
        removeCoupon();
        setError(null);
        toast.info('Coupon removed');
        setCode('');
    };

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setCode(e.currentTarget.value.toUpperCase());
        setError(null); // Clear error when user starts typing
    };

    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleApplyCoupon();
        }
    };

    if (coupon) {
        return (
            <CouponBoxWrapper
                className={className ? className : 'boxedCoupon'}
                style={style}
            >
                <div style={{ width: '100%' }}>
                    <CouponDisplay />
                    <Button
                        type='button'
                        onClick={handleRemoveCoupon}
                        disabled={disabled}
                        padding='0 30px'
                        style={{ marginTop: '10px', width: '100%' }}
                    >
                        <FormattedMessage id='removeCoupon' defaultMessage='Remove Coupon' />
                    </Button>
                </div>
            </CouponBoxWrapper>
        );
    }

    return (
        <>
            <CouponBoxWrapper
                className={className ? className : 'boxedCoupon'}
                style={style}
            >
                <Input
                    onChange={handleOnChange}
                    onKeyPress={handleKeyPress}
                    value={code}
                    placeholder={intl.formatMessage({
                        id: 'couponPlaceholder',
                        defaultMessage: 'Enter Coupon Here',
                    })}
                    disabled={disabled || loading}
                    {...props}
                />
                <Button
                    type='button'
                    onClick={handleApplyCoupon}
                    disabled={disabled || loading || !code.trim()}
                    padding='0 30px'
                    loading={loading}
                >
                    {loading ? (
                        <FormattedMessage id='applying' defaultMessage='Applying...' />
                    ) : (
                        <FormattedMessage id='voucherApply' defaultMessage='Apply'/>
                    )}
                </Button>
            </CouponBoxWrapper>
            {error && (
                <Error errorMsgFixed={errorMsgFixed}>
                    <FormattedMessage id='couponError' defaultMessage={error} />
                </Error>
            )}
        </>
    );
};

export default Coupon;