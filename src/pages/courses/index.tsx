import { NextPage } from 'next';
import {
    StyledContainer,
    StyledContent, StyledLeftContent, StyledLeftInnerContent, StyledLink, StyledRightContent,
} from 'features/terms-and-services/terms-and-services';
import { Heading } from 'components/heading/heading';
import { SEO } from 'components/seo';
import { siteTermsAndServices } from 'site-settings/site-terms-and-services';
import {Button, Card, CardActions, CardContent, Grid, makeStyles, Typography} from "@material-ui/core";
import Image from 'next/image';
import React from "react";
import {useArticles} from "../../data/use-website";
import Sticky from "react-stickynode";
import {useMedia} from "../../utils/use-media";
import Link from "next/link";

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

const TermsPage: NextPage<{}> = () => {

    const classes = useStyles();
    const { data: items } = useArticles('COURSE');
    const mobile = useMedia('(max-width: 580px)');

    return (
        <>
            <SEO title={'Courses'} />

            <StyledContainer>
                <Heading title={'Courses'} />
                <StyledContent>
                    <Grid container spacing={2}>
                        {
                            items.map(e =>
                                <Grid item lg={3} md={6} xs={12}>
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>
                                            <Image
                                                // loader={myLoader}
                                                src={e.image}
                                                alt={e.title}
                                                width={400}
                                                height={200}
                                            />
                                            <Typography variant="h6" component="h2">
                                                {e.title}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link href={`/courses/${e.id}`} passHref>
                                                <Button size="small">Show</Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        }
                    </Grid>
                </StyledContent>
            </StyledContainer>
        </>
    );
};

export default TermsPage;
