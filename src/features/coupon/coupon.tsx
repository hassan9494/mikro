import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';
import { TextField, Button, Box } from '@material-ui/core';
import { toast } from 'react-toastify';
import CouponDisplay from 'components/coupon-display/coupon-display';
import { CouponBoxWrapper, Error } from './coupon.style';
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
    const [couponCode, setCouponCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { applyCoupon, removeCoupon, coupon } = useCart();

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const data = await verifyCoupon(couponCode);
            const result = await applyCoupon({...data, code: couponCode});

            if (result.success) {
                toast.success('Coupon applied successfully');
                setCouponCode('');
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
        setCouponCode('');
    };

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setCouponCode(e.currentTarget.value.toUpperCase());
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
                <Box style={{ width: '100%' }}>
                    <CouponDisplay />
                    <Button
                        color="secondary"
                        onClick={handleRemoveCoupon}
                        style={{ marginTop: '10px' }}
                        fullWidth
                        variant="outlined"
                        disabled={disabled}
                    >
                        <FormattedMessage id='removeCoupon' defaultMessage='Remove Coupon' />
                    </Button>
                </Box>
            </CouponBoxWrapper>
        );
    }

    return (
        <>
            <CouponBoxWrapper
                className={className ? className : 'boxedCoupon'}
                style={style}
            >
                <Box style={{ width: '100%' }}>
                    <TextField
                        label={intl.formatMessage({
                            id: 'couponPlaceholder',
                            defaultMessage: 'Enter Coupon Here',
                        })}
                        variant="outlined"
                        size="small"
                        value={couponCode}
                        onChange={handleOnChange}
                        onKeyPress={handleKeyPress}
                        disabled={disabled || loading}
                        fullWidth
                        style={{ marginBottom: '10px' }}
                        error={!!error}
                        {...props}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApplyCoupon}
                        disabled={disabled || loading || !couponCode.trim()}
                        fullWidth
                    >
                        {loading ? (
                            <FormattedMessage id='applying' defaultMessage='Applying...' />
                        ) : (
                            <FormattedMessage id='applyCoupon' defaultMessage='Apply Coupon' />
                        )}
                    </Button>
                </Box>
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