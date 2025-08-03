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
    Container,
    Chip
} from "@material-ui/core";
import React from "react";
import { Fade, Zoom } from 'react-reveal';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Footer from '../../layouts/footer';

// Brand colors
const primaryColor = '#fe5e00'; // Orange
const secondaryColor = '#133695'; // Dark Blue

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 180,
        maxWidth: 380,
        transition: 'all 0.3s ease-in-out',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        border: `1px solid ${secondaryColor}20`,
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: `0 16px 32px ${primaryColor}30`,
        },
    },
    mediaContainer: {
        position: 'relative',
        height: 200,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        backgroundColor: '#f5f5f5', // Fallback background
    },
    cardContent: {
        flexGrow: 1,
        padding: theme.spacing(2.5),
        background: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 0,
        marginBottom: 0,
    },
    tutorialTitle: {
        color: secondaryColor,
        fontWeight: 800,
        fontSize: '1.5rem',
        marginBottom: theme.spacing(1),
        lineHeight: 1.3,
        letterSpacing: '-0.3px',
    },
    tutorialDescription: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2),
        fontSize: '1rem',
        lineHeight: 1.6,
        flexGrow: 1,
    },
    watchBtn: {
        fontWeight: 700,
        textTransform: 'none',
        padding: theme.spacing(1.2, 3),
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        backgroundColor: primaryColor,
        color: theme.palette.common.white,
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: '#d95000',
            transform: 'translateY(-2px)',
            boxShadow: `0 6px 12px ${primaryColor}80`,
        }
    },
    sectionTitle: {
        fontWeight: 900,
        marginBottom: theme.spacing(2),
        color: theme.palette.common.white,
        fontSize: '3.5rem',
        textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
        letterSpacing: '-1px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.5rem',
        }
    },
    sectionSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        marginBottom: theme.spacing(3),
        fontSize: '1.4rem',
        fontWeight: 400,
        maxWidth: 800,
        margin: '0 auto',
        lineHeight: 1.6,
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.15rem',
        }
    },
    heroSection: {
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor} 100%), url("https://www.transparenttextures.com/patterns/white-paper.png")`,
        color: theme.palette.common.white,
        padding: theme.spacing(10, 0, 4, 0),
        marginBottom: 0,
        borderRadius: '0 0 40px 40px',
        boxShadow: `0 10px 30px ${secondaryColor}60`,
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
        padding: theme.spacing(0, 3),
    },
    communitySection: {
        textAlign: 'center',
        marginTop: 0,
        padding: 0,
    },
    communityTitle: {
        fontWeight: 700,
        marginBottom: theme.spacing(1),
        color: theme.palette.common.black,
        fontSize: '2rem',
    },
    communitySubtitle: {
        color: 'rgba(7, 0, 0, 0.85)',
        marginBottom: theme.spacing(3),
        maxWidth: 500,
        margin: '0 auto',
        fontSize: '1.1rem',
        lineHeight: 1.6,
    },
    communityButton: {
        fontWeight: 700,
        textTransform: 'none',
        padding: theme.spacing(1.2, 4),
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        backgroundColor: primaryColor,
        color: theme.palette.common.white,
        fontSize: '1rem',
        marginBottom: theme.spacing(4),
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        '&:hover': {
            backgroundColor: '#d95000',
            transform: 'translateY(-2px)',
            boxShadow: `0 6px 16px ${primaryColor}80`,
        }
    },
    playOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(to top, ${secondaryColor}80 0%, ${primaryColor}30 100%)`,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
            opacity: 1,
        }
    },
    playIcon: {
        fontSize: 70,
        color: 'rgba(255,255,255,0.95)',
        transition: 'transform 0.3s ease',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        '&:hover': {
            transform: 'scale(1.15)',
        }
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.5s ease',
    },
    durationChip: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.75)',
        color: 'white',
        fontWeight: 600,
        fontSize: '0.8rem',
        padding: '4px 10px',
        borderRadius: 4,
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
    },
    viewsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontSize: '0.9rem',
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1),
    },
    viewsIcon: {
        fontSize: '1rem',
        marginRight: 4,
        color: secondaryColor,
    },
    gridContainer: {
        justifyContent: 'center',
        alignItems: 'stretch',
        rowGap: '40px',
    },
    gridItem: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    cardWrapper: {
        width: '100%',
        maxWidth: 380,
    },
    thumbnailFallback: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        color: '#666',
        fontSize: '0.9rem',
        textAlign: 'center',
        padding: theme.spacing(2),
    }
}));

const featuredTutorials = [
    {
        id: 'eOBwHWoBrGk',
        title: 'JY-924 Multi-Coin Selector',
        description: 'Advanced coin acceptor for vending machines & arcade games. Handles 4 coin types with material/weight/size detection.',
        image: 'https://img.youtube.com/vi/eOBwHWoBrGk/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=eOBwHWoBrGk',
        duration: '2:15',
        views: '1.2K'
    },
    {
        id: 'nELHOOltVW0',
        title: 'GSM SIM 808 Module Tutorial',
        description: 'Complete guide to using the SIM808 GSM/GPS module for IoT projects and communication systems.',
        image: 'https://img.youtube.com/vi/nELHOOltVW0/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=nELHOOltVW0',
        duration: '4:22',
        views: '850'
    },
    {
        id: '0Lwdzpr_TxM',
        title: 'Load Cell Sensor Guide',
        description: 'How to interface and use load cells for weight measurement applications and projects.',
        image: 'https://img.youtube.com/vi/0Lwdzpr_TxM/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=0Lwdzpr_TxM',
        duration: '3:45',
        views: '1.4K'
    },
    {
        id: 'genV0WUpd8k',
        title: 'Voice Recognition Module HD',
        description: 'Implement voice control in your projects with this high-definition voice recognition module.',
        image: 'https://img.youtube.com/vi/genV0WUpd8k/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=genV0WUpd8k',
        duration: '5:18',
        views: '1.5K '
    },
    {
        id: 'NuC18ItGZaE',
        title: 'GSM SIM 800 Module Setup',
        description: 'Tutorial for integrating SIM800 GSM module into your electronics projects and communication systems.',
        image: 'https://img.youtube.com/vi/NuC18ItGZaE/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=NuC18ItGZaE',
        duration: '4:05',
        views: '1.1K'
    },
    {
        id: 'iM1EvdSdjZY',
        title: 'Technic 9686 Learning Kit',
        description: 'DIY building blocks kit compatible with Lego Technic. Includes motor, battery box, and MOC components.',
        image: 'https://img.youtube.com/vi/iM1EvdSdjZY/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=iM1EvdSdjZY',
        duration: '3:30',
        views: '2.3K'
    }
];

const HoverVideoPlayer = ({ 
    videoId, 
    thumbnail, 
    onClick, 
    duration,
    title
}: {
    videoId: string;
    thumbnail: string;
    onClick: () => void;
    duration: string;
    title: string;
}) => {
    const classes = useStyles();
    const [imgError, setImgError] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState(thumbnail);
    
    const handleImageError = () => {
        if (!imgError) {
            // First fallback to YouTube hqdefault
            setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
            setImgError(true);
        }
    };
    
    return (
        <div 
            className={classes.mediaContainer}
            onClick={onClick}
        >
            {imgError ? (
                <div className={classes.thumbnailFallback}>
                    <div>
                        <p>Thumbnail not available</p>
                        <p>Click to play video</p>
                    </div>
                </div>
            ) : (
                <img 
                    src={imgSrc} 
                    alt={`Thumbnail for ${title}`} 
                    className={classes.thumbnail}
                    onError={handleImageError}
                />
            )}
            
            <div 
                className={classes.playOverlay}
                role="button"
                aria-label={`Play video: ${title}`}
                tabIndex={0}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        onClick();
                    }
                }}
            >
                <PlayCircleOutlineIcon className={classes.playIcon} />
            </div>
            
            <Chip 
                icon={<AccessTimeIcon style={{ color: 'white', fontSize: '1rem' }} />}
                label={duration}
                className={classes.durationChip}
            />
        </div>
    );
};

const TutorialsPage: NextPage<{}> = () => {
    const classes = useStyles();

    return (
        <>
            <SEO 
                title={'Product Tutorials | Mikroelectron'} 
                description="Explore our collection of product tutorials covering coin selectors, GSM modules, sensors, and learning kits."
            />

            {/* Hero Section */}
            <Box className={classes.heroSection}>
                <Container maxWidth="lg" className={classes.heroContent}>
                    <Fade top duration={1000}>
                        <Typography variant="h1" className={classes.sectionTitle} gutterBottom>
                            Mikroelectron Tutorials
                        </Typography>
                        <Typography variant="h5" className={classes.sectionSubtitle}>
                            Learn how to use our products with step-by-step video guides and technical demonstrations
                        </Typography>
                    </Fade>
                </Container>
            </Box>

            <StyledContainer>
                <StyledContent>
                    <Grid 
                        container 
                        spacing={0}
                        className={classes.gridContainer}
                    >
                        {featuredTutorials.map((tutorial, index) => (
                            <Grid 
                                item 
                                xs={12}   // 1 column on extra small screens
                                sm={6}   // 1 column on small screens
                                md={6}    // 2 columns on medium screens
                                lg={4} 
                                key={tutorial.id} 
                                className={classes.gridItem}
                            >
                                <Zoom delay={index * 100} duration={800}>
                                    <div className={classes.cardWrapper}>
                                        <Card className={classes.root}>
                                            <HoverVideoPlayer 
                                                videoId={tutorial.id} 
                                                thumbnail={tutorial.image} 
                                                onClick={() => window.open(tutorial.videoUrl, '_blank')}
                                                duration={tutorial.duration}
                                                title={tutorial.title}
                                            />
                                            
                                            <CardContent className={classes.cardContent}>
                                                <div className={classes.viewsContainer}>
                                                    <YouTubeIcon className={classes.viewsIcon} />
                                                    <span>{tutorial.views} views</span>
                                                </div>
                                                
                                                <Typography className={classes.tutorialTitle} variant="h5" component="h3">
                                                    {tutorial.title}
                                                </Typography>
                                                
                                                <Typography className={classes.tutorialDescription} variant="body1">
                                                    {tutorial.description}
                                                </Typography>
                                                
                                                <CardActions style={{ padding: '16px 0 0 0' }}>
                                                    <Button 
                                                        size="large"
                                                        variant="contained"
                                                        className={classes.watchBtn}
                                                        fullWidth
                                                        onClick={() => window.open(tutorial.videoUrl, '_blank')}
                                                        startIcon={<PlayCircleOutlineIcon />}
                                                        aria-label={`Watch tutorial: ${tutorial.title}`}
                                                    >
                                                        Watch Tutorial
                                                    </Button>
                                                </CardActions>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </Zoom>
                            </Grid>
                        ))}
                    </Grid>
                </StyledContent>
            </StyledContainer>

            {/* Community Section */}
            <Box className={classes.communitySection}>
                <Container maxWidth="sm">
                    <Typography variant="h2" className={classes.communityTitle} gutterBottom>
                        Want to see more tutorials?
                    </Typography>
                    <Typography variant="h6" className={classes.communitySubtitle}>
                        Visit our YouTube channel for complete tutorials and project guides
                    </Typography>
                    
                    <Button
                        variant="contained"
                        className={classes.communityButton}
                        startIcon={<YouTubeIcon style={{ fontSize: '1.8rem' }} />}
                        href="https://www.youtube.com/@mikroelectronjo"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit YouTube Channel"
                    >
                        Visit YouTube Channel
                    </Button>
                </Container>
            </Box>

            {/* Footer */}
            <Footer 
                social={{
                    call: "96265344772",
                    whatsapp: "962790062196",
                    email: "info@mikroelectron.com",
                    facebook: "https://www.facebook.com/Mikroelectron",
                    instagram: "https://www.instagram.com/mikroelectron",
                    youtube: "https://www.youtube.com/@mikroelectronjo",
                    location: "https://maps.app.goo.gl/ghdvRSR2uGSfkfAq7",
                    telegram: "https://t.me/mikroelectron",
                }}
            />
        </>
    );
};

export default TutorialsPage;