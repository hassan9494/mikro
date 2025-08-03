import { NextPage } from 'next';
import {
    StyledContainer,
    StyledContent,
} from 'features/terms-and-services/terms-and-services';
import { SEO } from 'components/seo';
import { 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    Grid, 
    makeStyles, 
    Typography,
    Box,
    Container
} from "@material-ui/core";
import Image from 'next/image';
import React from "react";
import { useArticles } from "../../data/use-website";
import { useMedia } from "../../utils/use-media";
import Link from "next/link";
import { Fade, Zoom } from 'react-reveal';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 180,
        maxWidth: 350,
        transition: 'all 0.3s ease-in-out',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        border: 'none',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        },
    },
    mediaContainer: {
        position: 'relative',
        height: 160,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
            '& img': {
                transform: 'scale(1.03)',
            }
        },
        [theme.breakpoints.down('sm')]: {
            height: 140,
        },
    },
    cardContent: {
        flexGrow: 1,
        padding: theme.spacing(2),
        background: theme.palette.background.paper,
    },
    tutorialTitle: {
        color: theme.palette.primary.main,
        fontWeight: 700,
        fontSize: '1.5rem',
        marginBottom: theme.spacing(1),
        position: 'relative',
        display: 'inline-block',
    },
    tutorialDescription: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2),
        fontSize: '1rem',
        lineHeight: '1.6',
    },
    watchBtn: {
        fontWeight: 600,
        textTransform: 'none',
        padding: theme.spacing(1, 3),
        borderRadius: '50px',
        transition: 'all 0.3s ease',
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[4],
        }
    },
    sectionTitle: {
        fontWeight: 800,
        marginBottom: theme.spacing(2),
        color: theme.palette.common.white,
        fontSize: '3rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.2rem',
        }
    },
    sectionSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        marginBottom: theme.spacing(4),
        fontSize: '1.3rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.1rem',
        }
    },
    heroSection: {
        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
        color: theme.palette.common.white,
        padding: theme.spacing(13, 0, 3, 0),
        marginBottom: theme.spacing(6),
        borderRadius: '0 0 30px 30px',
        boxShadow: theme.shadows[10],
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("https://www.transparenttextures.com/patterns/brushed-alum.png")',
            opacity: 0.15,
        }
    },
    heroContent: {
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
    },
    socialSection: {
        textAlign: 'center',
        padding: theme.spacing(8, 0),
        backgroundColor: theme.palette.background.default,
        marginTop: theme.spacing(6),
        borderRadius: '30px',
    },
    socialTitle: {
        fontWeight: 700,
        marginBottom: theme.spacing(3),
        color: theme.palette.text.primary,
    },
    socialSubtitle: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(4),
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    socialIcons: {
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing(4),
        marginTop: theme.spacing(3),
    },
    socialIcon: {
        width: 60,
        height: 60,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        color: theme.palette.common.white,
        '&:hover': {
            transform: 'translateY(-5px)',
        }
    },
    youtubeIcon: {
        backgroundColor: '#FF0000',
    },
    facebookIcon: {
        backgroundColor: '#1877F2',
    },
    instagramIcon: {
        background: 'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)',
    },
}));

// Sample tutorial data (replace with your actual YouTube videos)
const featuredTutorials = [
    {
        id: 'intro-electronics',
        title: 'Introduction to Electronics',
        description: 'Learn the fundamentals of electronic components and circuits',
        image: 'https://img.youtube.com/vi/abc123/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=abc123'
    },
    {
        id: 'arduino-basics',
        title: 'Arduino Programming Basics',
        description: 'Get started with Arduino programming and projects',
        image: 'https://img.youtube.com/vi/def456/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=def456'
    },
    {
        id: 'pcb-design',
        title: 'PCB Design for Beginners',
        description: 'Step-by-step guide to designing your first PCB',
        image: 'https://img.youtube.com/vi/ghi789/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=ghi789'
    },
    {
        id: 'iot-projects',
        title: 'IoT Projects with ESP32',
        description: 'Build smart IoT devices using ESP32 microcontroller',
        image: 'https://img.youtube.com/vi/jkl012/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=jkl012'
    }
];

const socialLinks = {
    youtube: 'https://www.youtube.com/@mikroelectronjo',
    facebook: 'https://www.facebook.com/Mikroelectron',
    instagram: 'https://www.instagram.com/mikroelectron',
};

const TutorialsPage: NextPage<{}> = () => {
    const classes = useStyles();
    const { data: tutorials } = useArticles('TUTORIAL');
    const mobile = useMedia('(max-width: 580px)');

    // Use fetched tutorials if available, otherwise use featured tutorials
    const displayTutorials = tutorials?.length > 0 ? tutorials : featuredTutorials;

    return (
        <>
            <SEO 
                title={'Electronics Tutorials | Mikroelectron'} 
                description="Learn electronics with our step-by-step tutorials covering Arduino, PCB design, IoT projects, and more."
            />

            {/* Hero Section */}
            <Box className={classes.heroSection}>
                <Container maxWidth="md" className={classes.heroContent}>
                    <Fade top duration={1000}>
                        <Typography variant="h1" className={classes.sectionTitle} gutterBottom>
                            Electronics Tutorials
                        </Typography>
                        <Typography variant="h5" className={classes.sectionSubtitle}>
                            Step-by-step guides to help you master electronics, programming, and hardware projects
                        </Typography>
                    </Fade>
                </Container>
            </Box>

            <StyledContainer>
                <StyledContent>
                    <Grid container spacing={3} style={{ rowGap: '32px', justifyContent: 'center' }}>
                        {displayTutorials.map((tutorial, index) => (
                            <Grid item xs={10} sm={6} md={4} key={tutorial.id} style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <Zoom delay={index * 100} duration={800}>
                                    <Card className={`${classes.root} animate__animated animate__fadeInUp`}>
                                        <div className={classes.mediaContainer}>
                                            <Image
                                                src={tutorial.image}
                                                alt={tutorial.title}
                                                layout="fill"
                                                objectFit="cover"
                                                quality={85}
                                                unoptimized={true}
                                            />
                                        </div>
                                        <CardContent className={classes.cardContent}>
                                            <Typography className={classes.tutorialTitle} variant="h5" component="h3">
                                                {tutorial.title}
                                            </Typography>
                                            <Typography className={classes.tutorialDescription} variant="body1">
                                                {tutorial.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions style={{ padding: '0 24px 24px' }}>
                                            <Link href={`/tutorials/${tutorial.id}`} passHref>
                                                <Button 
                                                    size="medium" 
                                                    variant="contained"
                                                    className={classes.watchBtn}
                                                    fullWidth
                                                >
                                                    Watch Tutorial
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Zoom>
                            </Grid>
                        ))}
                    </Grid>
                </StyledContent>
            </StyledContainer>

            {/* Social Media Section */}
            <Box className={classes.socialSection}>
                <Container maxWidth="md">
                    <Typography variant="h3" className={classes.socialTitle} gutterBottom>
                        Want More Tutorials?
                    </Typography>
                    <Typography variant="h6" className={classes.socialSubtitle}>
                        Follow us on social media for the latest tutorials, project ideas, 
                        and electronics tips. We regularly post new content to help you 
                        enhance your skills!
                    </Typography>
                    
                    <Box className={classes.socialIcons}>
                        <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                            <Box className={`${classes.socialIcon} ${classes.youtubeIcon}`}>
                                <YouTubeIcon fontSize="large" />
                            </Box>
                        </a>
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <Box className={`${classes.socialIcon} ${classes.facebookIcon}`}>
                                <FacebookIcon fontSize="large" />
                            </Box>
                        </a>
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <Box className={`${classes.socialIcon} ${classes.instagramIcon}`}>
                                <InstagramIcon fontSize="large" />
                            </Box>
                        </a>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default TutorialsPage;