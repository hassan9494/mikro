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

    // Check if we're likely in a cart context (compact view)
    const isCompactView = window.innerWidth < 768 || excludedItems.length > 0; // Mobile or has excluded items

    return (
        <Box
            mt={1}
            p={isCompactView ? 1 : 2}
            border={1}
            borderColor="grey.300"
            borderRadius={4}
            style={{
                maxWidth: '100%',
                height: 'max-content'
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant={isCompactView ? "body2" : "h6"} component="div">
                    <FormattedMessage id="couponApplied" defaultMessage="Coupon Applied" />
                    <Chip
                        label={coupon.code}
                        color="primary"
                        size="small"
                        style={{ marginLeft: '8px' }}
                    />
                </Typography>
                <Typography variant={isCompactView ? "body2" : "body1"} component="div">
                    -${coupon.calculatedDiscount?.toFixed(2) || '0.00'}
                </Typography>
            </Box>

            {coupon.is_percentage && excludedItems.length > 0 && (
                <Box
                    mt={1}
                    p={1}
                    bgcolor="info.light"
                    borderRadius={1}
                    border={1}
                    borderColor="info.main"
                >
                    <Typography variant="body2" gutterBottom style={{ fontSize: isCompactView ? '12px' : '14px' }}>
                        <FormattedMessage
                            id="excludedProductsInfo"
                            defaultMessage="Excluded from discount:"
                        />
                    </Typography>
                    <Box mt={1} style={{ maxHeight: isCompactView ? '80px' : 'none', overflowY: 'auto' }}>
                        {excludedItems.slice(0, isCompactView ? 3 : excludedItems.length).map((item: CouponProduct) => (
                            <Chip
                                key={item.id}
                                label={
                                    <Box style={{
                                        maxWidth: isCompactView ? '120px' : '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {item.name}
                                    </Box>
                                }
                                variant="outlined"
                                size="small"
                                style={{
                                    margin: '2px',
                                    fontSize: isCompactView ? '10px' : '12px'
                                }}
                            />
                        ))}
                        {isCompactView && excludedItems.length > 3 && (
                            <Typography variant="caption" color="textSecondary" style={{ marginLeft: '8px' }}>
                                <FormattedMessage
                                    id="andMoreItems"
                                    defaultMessage="+{count} more"
                                    values={{ count: excludedItems.length - 3 }}
                                />
                            </Typography>
                        )}
                    </Box>
                </Box>
            )}

            {coupon.is_percentage && eligibleItems.length > 0 && !isCompactView && (
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

            {!coupon.is_percentage && !isCompactView && (
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