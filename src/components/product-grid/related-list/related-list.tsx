import React from 'react';
import dynamic from 'next/dynamic';
import {
    ProductsRow,
    ProductsCol,
    LoaderWrapper,
    LoaderItem,
    ProductCardWrapper,
} from './related-list.style';
import { CURRENCY } from 'utils/constant';
import Placeholder from 'components/placeholder/placeholder';
import Fade from 'react-reveal/Fade';
import NoResultFound from 'components/no-result/no-result';
import useRelatedProducts from "../../../data/use-related-products";
import { FormattedMessage } from "react-intl";

const ErrorMessage = dynamic(() =>
    import('components/error-message/error-message')
);
import { ProductCard } from 'components/product-card/product-card-six';

type ProductsProps = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    slug?: any;
};
export const RelatedProducts: React.FC<ProductsProps> = ({
    deviceType,
    slug
}) => {

    const { data, error } = useRelatedProducts({
        sku: slug
    });

    if (error) return <ErrorMessage message={error.message}/>;

    if (!data) {
        return (
            <LoaderWrapper>
                <LoaderItem>
                    <Placeholder uniqueKey="1"/>
                </LoaderItem>
                <LoaderItem>
                    <Placeholder uniqueKey="2"/>
                </LoaderItem>
                <LoaderItem>
                    <Placeholder uniqueKey="3"/>
                </LoaderItem>
                <LoaderItem>
                    <Placeholder uniqueKey="4"/>
                </LoaderItem>
            </LoaderWrapper>
        );
    }

    if (data.length === 0) {
        return <></>;
    }

    const renderCard = (props) => (
        <ProductCard data={props} key={props.id}/>
    );

    return (
        <>
            <h2>
                <FormattedMessage
                    id="intlReletedItems"
                    defaultMessage="Related Items"
                />
            </h2>
            <ProductsRow>
                {data.map((item: any, index: number) => (
                    <ProductsCol key={index}>
                        <ProductCardWrapper>
                            <Fade
                                duration={800}
                                delay={index * 10}
                                style={{ height: '100%' }}
                            >
                                {renderCard(item)}
                            </Fade>
                        </ProductCardWrapper>
                    </ProductsCol>
                ))}
            </ProductsRow>
        </>
    );
};
export default RelatedProducts;
