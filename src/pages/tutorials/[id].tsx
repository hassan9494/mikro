import { NextPage } from 'next';
import {
    StyledContent, StyledLeftContent, StyledLink, StyledRightContent,
} from 'features/terms-and-services/terms-and-services';
import { Heading } from 'components/heading/heading';
import { SEO } from 'components/seo';
import {Button, Card, CardActions, CardContent, Grid, makeStyles, Typography} from "@material-ui/core";
import Image from 'next/image';
import React from "react";
import {getArticle, useArticle, useArticles} from "../../data/use-website";
import Sticky from "react-stickynode";
import {useMedia} from "../../utils/use-media";
import {useRouter} from "next/router";
import Link from "next/link";
import css from '@styled-system/css';
import styled from "styled-components";
import {getProductBySlug} from "../../utils/api/product";
import ProductPage from "../product/[slug]";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const ArticleLink = styled("a")(
    css({
        '&.active, :hover': {
            color: 'primary.regular',
        },
    }),
    {
        fontSize: 14,
        textDecoration: 'none',
        padding: '10px 0',
        display: 'block',
        color: '#222222',
        textTransform: 'uppercase',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    }
);
export const StyledContainer = styled.div(
    css({
        width: ['100%', '90vw'],
    }),
    {
        margin: 'auto',
        paddingTop: 100,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 150,
    }
);

export const StyledLeftInnerContent = styled.div(
    css({
        backgroundColor: ['#fff', 'transparent'],
    })
);

type Props = {
    data: any;
};
const TutorialPage: NextPage<Props> = ({ data }) => {
    const classes = useStyles();
    const {query} = useRouter();
    const { data: items } = useArticles('TUTORIAL');
    const { data: item } = useArticle(data?.id);
    const mobile = useMedia('(max-width: 580px)');

    return (
        <>
            <SEO title={'Tutorials'}/>

            <StyledContainer>
                <StyledContent>
                    <StyledLeftContent>
                        <Typography variant="h5" component="h2" gutterBottom color='primary'>
                            Tutorials
                        </Typography>
                        <Sticky top={mobile ? 68 : 150} innerZ="1">
                            <StyledLeftInnerContent>
                                {items.map((item) => (
                                    <Link href={`/tutorials/${item.id}`} passHref>
                                        <ArticleLink key={item}>
                                            {item.title}
                                        </ArticleLink>
                                    </Link>
                                ))}
                            </StyledLeftInnerContent>
                        </Sticky>
                    </StyledLeftContent>
                    {
                        item &&
                        <StyledRightContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {item.title}
                            </Typography>
                            {
                                item.video_url &&
                                <iframe
                                    width="100%" height="400" src={item.video_url.replace('watch?v=', 'embed/')}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            }
                            <div dangerouslySetInnerHTML={{__html: item.content}} />
                        </StyledRightContent>

                    }
                </StyledContent>
            </StyledContainer>
        </>
    );
};

export async function getStaticProps({ params }) {
    const data = await getArticle(params.id);
    return {
        props: {
            data,
        },
    };
}
export async function getStaticPaths() {
    // const products = await getAllProducts();
    return {
        paths: [],
        fallback: true,
    };
}
export default TutorialPage;
