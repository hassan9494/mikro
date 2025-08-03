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
    useTheme
} from "@material-ui/core";
import React from "react";
import { useArticles } from "../../data/use-website";
import Link from "next/link";
import Footer from '../../layouts/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fade, Zoom } from 'react-reveal';
import Image from 'next/image';

// Import local images
import componentSales from '../../assets/services/components-sale.webp';
import technicalConsulting from '../../assets/services/technical-consulting.webp';
import threeDPrinting from '../../assets/services/3d-printing.webp';
import labSetup from '../../assets/services/lab-setup.webp';
import industrialSolutions from '../../assets/services/industrial-solutions.webp';
import trainingPrograms from '../../assets/services/training-programs.webp';
import engineeringExhibitions from '../../assets/services/engineering-exhibitions.webp';

const serviceImages = {
    'component-sales': {
        src: componentSales,
        blurDataURL: 'data:image/webp;base64,UklGRl...'
    },
    'engineering-consultations': {
        src: technicalConsulting,
        blurDataURL: 'data:image/webp;base64,UklGRl...' 
    },
    '3d-printing': {
        src: threeDPrinting,
        blurDataURL: 'data:image/webp;base64,UklGRl...'
    },
    'engineering-labs-setup': {
        src: labSetup,
        blurDataURL: 'data:image/webp;base64,UklGRl...'
    },
    'industrial-solutions': {
        src: industrialSolutions,
        blurDataURL: 'data:image/webp;base64,UklGRl...'
    },
    'training-courses': {
        src: trainingPrograms,
        blurDataURL: 'data:image/webp;base64,UklGRl...'
    },
    'engineering-exhibitions': {
        src: engineeringExhibitions,
        blurDataURL: 'data:image/webp;base64,UklGRl...'
    }
};

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
    serviceTitle: {
        color: theme.palette.primary.main,
        fontWeight: 700,
        fontSize: '1.5rem',
        marginBottom: theme.spacing(2),
        position: 'relative',
        display: 'inline-block',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '50%',
            height: '3px',
            bottom: '-8px',
            left: '0',
            backgroundColor: theme.palette.secondary.main,
            transform: 'scaleX(0)',
            transformOrigin: 'bottom right',
            transition: 'transform 0.3s ease-out',
        },
        '&:hover:after': {
            transform: 'scaleX(1)',
            transformOrigin: 'bottom left',
        }
    },
    serviceDescription: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(3),
        fontSize: '1.1rem',
        lineHeight: '1.6',
    },
    learnMoreBtn: {
        fontWeight: 600,
        textTransform: 'none',
        padding: theme.spacing(1.5, 3),
        borderRadius: '50px',
        transition: 'all 0.3s ease',
        '&:hover': {
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
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #fe5d00 100%)`,
        color: theme.palette.common.white,
        padding: theme.spacing(13, 0, 3, 0),
        marginBottom: theme.spacing(10),
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
    iconWrapper: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        marginRight: theme.spacing(2),
        color: theme.palette.primary.main,
        fontSize: '1.8rem',
    },
    StyledContainer: {
        padding: 0,
    }
}));

const localServices = [
    {
        id: 'component-sales',
        title: 'Component Sales',
        description: 'Wide range of high-quality electronic components in stock for all your project needs with competitive pricing.',
        icon: '💎'
    },
    {
        id: 'engineering-consultations',
        title: 'Engineering Consultations',
        description: 'Expert technical guidance for electronics projects, system design, and implementation strategies.',
        icon: '📊'
    },
    {
        id: '3d-printing',
        title: '3D Printing Services',
        description: 'High-precision additive manufacturing for prototypes, custom parts, and engineering components.',
        icon: '🖨️'
    },
    {
        id: 'engineering-labs-setup',
        title: 'Engineering Labs Setup',
        description: 'Complete design and installation of specialized laboratories for educational institutions.',
        icon: '🔬'
    },
    {
        id: 'industrial-solutions',
        title: 'Industrial Engineering Solutions',
        description: 'Customized automation, control systems, and process optimization for manufacturing environments.',
        icon: '🏭'
    },
    {
        id: 'training-courses',
        title: 'Technical Training Courses',
        description: 'Professional development programs in electronics, automation, and emerging technologies.',
        icon: '🎓'
    },
    {
        id: 'engineering-exhibitions',
        title: 'Engineering Exhibitions',
        description: 'Showcasing cutting-edge technologies and innovations through curated technical exhibitions.',
        icon: '🎪'
    },
];

const ServicesPage: NextPage<{}> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const { data: services } = useArticles('SERVICE');

    const displayServices = services?.length > 0 ? services : localServices;

    return (
        <>
            <SEO 
                title={'Our Services | Mikroelectron'} 
                description="Explore our professional engineering services including component sales, technical consultations, 3D printing, lab setup, industrial solutions, training, and exhibitions."
            />

            {/* Hero Section */}
            <Box className={classes.heroSection}>
                <Container maxWidth="md" className={classes.heroContent}>
                    <Fade top duration={1000}>
                        <Typography variant="h1" className={classes.sectionTitle} gutterBottom>
                            Our Engineering Services
                        </Typography>
                        <Typography variant="h5" className={classes.sectionSubtitle}>
                            Comprehensive solutions for educational institutions, industries, and technical professionals
                        </Typography>
                    </Fade>
                </Container>
            </Box>

            <StyledContainer style={{ paddingTop: '0' }}>
                <StyledContent>
                    <Grid container spacing={3} style={{ rowGap: '32px', justifyContent: 'center' }}>
                        {displayServices.map((service, index) => (
                            <Grid item xs={10} sm={6} md={4} key={service.id} style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <Zoom delay={index * 100} duration={800}>
                                    <Card className={`${classes.root} animate__animated animate__fadeInUp`}>
                                        <div className={classes.mediaContainer}>
                                            <Image
                                                src={serviceImages[service.id].src}
                                                alt={service.title}
                                                layout="fill"
                                                objectFit="cover"
                                                quality={85}
                                                placeholder="blur"
                                                blurDataURL={serviceImages[service.id].blurDataURL}
                                            />
                                        </div>
                                        <CardContent className={classes.cardContent}>
                                            <Box display="flex" alignItems="center" mb={2}>
                                                <Box className={classes.iconWrapper}>
                                                    {service.icon}
                                                </Box>
                                                <Typography className={classes.serviceTitle} variant="h5" component="h3">
                                                    {service.title}
                                                </Typography>
                                            </Box>
                                            <Typography className={classes.serviceDescription} variant="body1">
                                                {service.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions style={{ padding: '0 24px 24px' }}>
                                            <Link href={`/services/${service.id}`} passHref>
                                                <Button 
                                                    size="large" 
                                                    color="primary" 
                                                    variant="contained"
                                                    className={`${classes.learnMoreBtn} animate__animated animate__pulse animate__infinite`}
                                                    fullWidth
                                                    style={{ animationDuration: '2s' }}
                                                >
                                                    Learn More
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

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
};

export default ServicesPage;