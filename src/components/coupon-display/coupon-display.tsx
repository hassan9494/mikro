import React from 'react';
import { useCart } from 'contexts/cart/use-cart';
import { Box, Typography, Chip, Divider } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

// Define types for the coupon data
interface CouponProduct {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    total: number;
}

interface CouponValidationData {
    calculation?: {
        excluded_items: CouponProduct[];
        eligible_items: CouponProduct[];
    };
}

interface CouponType {
    code: string;
    is_percentage: boolean;
    calculatedDiscount?: number;
    validationData?: CouponValidationData;
}

const CouponDisplay: React.FC = () => {
    const { coupon } = useCart() as { coupon: CouponType | null };

    if (!coupon || !coupon.validationData) return null;

    const { calculation } = coupon.validationData;
    const excludedItems = calculation?.excluded_items || [];
    const eligibleItems = calculation?.eligible_items || [];

    return (
        <Box mt={2} p={2} border={1} borderColor="grey.300" borderRadius={4}>
            <Typography variant="h6" gutterBottom>
                <FormattedMessage id="couponApplied" defaultMessage="Coupon Applied" />
                <Chip
                    label={coupon.code}
                    color="primary"
                    size="small"
                    style={{ marginLeft: '8px' }}
                />
            </Typography>

            <Typography variant="body2" color="textSecondary" gutterBottom>
                <FormattedMessage
                    id="couponDiscount"
                    defaultMessage="Discount: {discount}"
                    values={{
                        discount: `$${coupon.calculatedDiscount?.toFixed(2) || '0.00'}`
                    }}
                />
            </Typography>

            {coupon.is_percentage && excludedItems.length > 0 && (
                <Box
                    mt={1}
                    p={1}
                    bgcolor="info.light"
                    borderRadius={1}
                    border={1}
                    borderColor="info.main"
                >
                    <Typography variant="body2" gutterBottom>
                        <FormattedMessage
                            id="excludedProductsInfo"
                            defaultMessage="The following products are excluded from this percentage discount:"
                        />
                    </Typography>
                    <Box mt={1}>
                        {excludedItems.map((item: CouponProduct) => (
                            <Chip
                                key={item.id}
                                label={item.name}
                                variant="outlined"
                                size="small"
                                style={{ margin: '2px' }}
                            />
                        ))}
                    </Box>
                </Box>
            )}

            {coupon.is_percentage && eligibleItems.length > 0 && (
                <Box mt={1}>
                    <Typography variant="body2" color="textSecondary">
                        <FormattedMessage
                            id="eligibleProductsInfo"
                            defaultMessage="Discount applied to {count} eligible products"
                            values={{ count: eligibleItems.length }}
                        />
                    </Typography>
                </Box>
            )}

            {!coupon.is_percentage && (
                <Box
                    mt={1}
                    p={1}
                    bgcolor="success.light"
                    borderRadius={1}
                    border={1}
                    borderColor="success.main"
                >
                    <Typography variant="body2">
                        <FormattedMessage
                            id="fixedCouponInfo"
                            defaultMessage="Fixed amount discount applied to all products"
                        />
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default CouponDisplay;