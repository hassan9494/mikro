import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import css from '@styled-system/css';

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

interface Props {
    data: any;
}

export const ReplacementProductCard = ({ data }: Props) => {
    const { title, slug } = data;



    return (
        <Card>
            <Link href="/product/[slug]" as={`/product/${slug}`}>
                <a>
                <Title>
                    {title.substring(0,32) + (title.length > 32 ? '...' : '')}
                </Title>
                </a>
            </Link>



        </Card>
    );
};
