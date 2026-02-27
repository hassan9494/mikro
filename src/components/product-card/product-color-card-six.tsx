import React from 'react';
import Link from 'next/link';
import { AddItemToCart } from 'components/add-item-to-cart';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from 'components/box';
import { RadioButtonChecked } from '@mui/icons-material';
import MoneyFormat from "../money-format/money-format";
import {FormattedMessage} from "react-intl";
import Image from "next/image";

const Card = styled.div({
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '0',
    cursor: 'pointer',
    transition: '0.25s ease-in-out',
    '&:hover': {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
        transform: 'translateY(-5px)',
    },
});
const ImageWrapper = styled.div(
    css({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        height: ['190px', '210px'],

        img: {
            display: 'block',
            maxHeight: '100%',
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
        },
    })
);
const Discount = styled.div<any>(
    css({
        position: 'absolute',
        zIndex: 1,
        top: '10px',
        right: '10px',
        backgroundColor: 'rgba(201,37,60,.5)',
        color: '#fff',
        overflow: 'hidden',
        padding: '0.25rem 0.5rem',
        fontSize: 12,
        borderRadius: 6,
        pointerEvents: 'none',
    })
);

const Stock = styled.div<any>(
    css({
        position: 'absolute',
        zIndex: 1,
        top: '10px',
        left: '10px',
        overflow: 'hidden',
        padding: '0.25rem 0.5rem',
        fontSize: 12,
        borderRadius: 6,
        pointerEvents: 'none',
    })
);



const CounterWrapper = styled.div<any>(
    css({
        position: 'absolute',
        zIndex: 1,
        // top: '10px',
        right: '10px',
    })
);

const PriceWrapper = styled.div({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
});

const Price = styled.span(
    css({
        display: 'block',
        color: 'text.bold',
        fontSize: 16,
        fontWeight: 'semiBold',
    })
);

const SalePrice = styled.span(
    css({
        color: 'text.success',
        display: 'block',
        fontSize: 16,
        fontWeight: 'semiBold',
    })
);


const OldPrice = styled.span(
    css({
        color: 'text.red',
        fontSize: 13,
        lineHeight: 1,
        fontWeight: 'regular',
        padding: '0 5px',
        overflow: 'hidden',
        position: 'relative',
        marginLeft: 10,
        display: 'flex',
        alignItems: 'center',

        ':before': {
            content: '""',
            width: '100%',
            height: 1,
            display: 'inline-block',
            backgroundColor: 'text.regular',
            position: 'absolute',
            top: '50%',
            left: 0,
        },
    })
);

const Title = styled.h2(
    css({
        color: 'text.regular',
        fontSize: 'sm',
        fontWeight: 'regular',
        marginBottom: '20px',
        whiteSpace: 'nowrap'
    })
);

interface Props {
    data: any;
}

export const ProductColorCard = ({ data }: Props) => {
    const { title, image, price, sale_price, slug, discountInPercent, availableQty,is_available,is_retired  } = data;



    const stockColor = availableQty > 10 ? 'green' : (availableQty < 1 ? 'red' : 'orange');

    // const myLoader = ({ src, width, quality }) => {
    //     return `${src}?w=${width}&q=${quality || 75}`
    // }
    return (
        <Card>
            <Link href="/product/[slug]" as={`/product/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Box position="relative">
                        <Stock>
                            <RadioButtonChecked style={{width: 16, color: stockColor }} />
                        </Stock>
                        <ImageWrapper>
                            {/*<img src={image} alt={title} width={200} height={200}/>*/}
                            <Image
                                src={image}
                                alt={title}
                                width={200}
                                height={200}
                            />
                        </ImageWrapper>
                        {sale_price ? (
                            <Discount>On Sale</Discount>
                        ) : null}
                    </Box>
            </Link>

            <Box padding={20}>
                <Title>
                    {title.substring(0,32) + (title.length > 32 ? '...' : '')}
                </Title>
                {
                    !is_retired ?
                    is_available ?
                        <PriceWrapper>
                            {
                                sale_price ? (
                                    <>
                                        <SalePrice>
                                            <MoneyFormat value={sale_price} />
                                        </SalePrice>
                                        <OldPrice>
                                            <MoneyFormat value={price} />
                                        </OldPrice>
                                    </>

                                ) : (
                                    <Price>
                                        <MoneyFormat value={price} />
                                    </Price>
                                )
                            }
                            <CounterWrapper>
                                {
                                    availableQty ?
                                        <AddItemToCart data={data} variant={'lightHorizontal'}/>:
                                        <FormattedMessage id='outOfStock' defaultMessage='Out Of Stock' />
                                }
                            </CounterWrapper>

                        </PriceWrapper>  :

                        <FormattedMessage id='available' defaultMessage="This product is't available now" />:

                        <FormattedMessage id='retired' defaultMessage="This product is retired now" />
                }


            </Box>

        </Card>
    );
};
