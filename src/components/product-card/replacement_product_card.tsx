import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import css from '@styled-system/css';
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
    marginLeft: 25,

});




const Title = styled.h2(
    css({
        color: 'text.regular',
        fontSize: 'sm',
        fontWeight: 'regular',
        marginBottom: '20px',
        whiteSpace: 'nowrap'
    })
);

const ImageWrapper = styled.div(
    css({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        height: ['100px', '100px'],

        img: {
            display: 'block',
            maxHeight: '100%',
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
        },
    })
);

interface Props {
    data: any;
}

export const ReplacementProductCard = ({ data }: Props) => {
    const { title, slug,image } = data;



    return (
        <Card>
            <Link href="/product/[slug]" as={`/product/${slug}`}>
                <a>
                    <ImageWrapper>
                        {/*<img src={image} alt={title} width={200} height={200}/>*/}
                        <Image
                            // loader={myLoader}
                            src={image}
                            alt={title}
                            width={100}
                            height={100}
                            unoptimized={true}
                        />
                    </ImageWrapper>
                <Title>
                    {title.substring(0,32) + (title.length > 32 ? '...' : '')}
                </Title>
                </a>
            </Link>



        </Card>
    );
};
