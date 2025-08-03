// pages/services/[id].tsx
import { NextPage } from 'next';
import { Heading } from 'components/heading/heading';
import { SEO } from 'components/seo';
import { 
    Button, 
    makeStyles, 
    Typography,
    CircularProgress,
    Box,
    Grid,
    Container,
    Divider
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getArticle, useArticles } from "../../data/use-website";
import { useMedia } from "../../utils/use-media";
import { useRouter } from "next/router";
import Footer from '../../layouts/footer';
import { CheckCircle, Settings, Build, ShoppingBasket, School, HelpOutline, WhatsApp, Print, Business, Event, EmojiObjects  } from "@material-ui/icons";
import Image from 'next/image';

// Import service images
import componentSales from '../../assets/services/components-sale.webp';
import technicalConsulting from '../../assets/services/technical-consulting.webp';
import threeDPrinting from '../../assets/services/3d-printing.webp';
import labSetup from '../../assets/services/lab-setup.webp';
import industrialSolutions from '../../assets/services/industrial-solutions.webp';
import trainingPrograms from '../../assets/services/training-programs.webp';
import engineeringExhibitions from '../../assets/services/engineering-exhibitions.webp';

// Service images mapping
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
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
    },
    serviceHero: {
        color: theme.palette.common.white,
        padding: theme.spacing(12, 0, 8, 0),
        marginBottom: theme.spacing(6),
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottomRadius: '8px',
        '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, #fe5d0049  0%, #fe5d0033 100%)`,
            opacity: 0.85,
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(8, 0, 6, 0),
        },
    },
    serviceTitle: {
        fontWeight: 800,
        marginBottom: theme.spacing(3),
        fontSize: '3.5rem',
        textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
        letterSpacing: '-0.5px',
        position: 'relative',
        zIndex: 1,
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.5rem',
        },
    },
    serviceSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: '1.5rem',
        maxWidth: '800px',
        margin: '0 auto',
        lineHeight: 1.6,
        position: 'relative',
        zIndex: 1,
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2rem',
            padding: theme.spacing(0, 2),
        },
    },
    mainContainer: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: theme.spacing(0, 4),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 2),
        },
    },
    contentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    contentArea: {
        flex: 1,
        maxWidth: '800px',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
        },
    },
    contentCard: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '16px',
        padding: theme.spacing(4),
        boxShadow: theme.shadows[3],
        marginBottom: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3),
        },
    },
    serviceImage: {
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: theme.spacing(4),
        boxShadow: theme.shadows[4],
    },
    featureGrid: {
        margin: theme.spacing(4, 0),
    },
    featureItem: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3),
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        backgroundColor: theme.palette.background.default,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[4],
        },
    },
    featureIcon: {
        color: theme.palette.primary.main,
        marginRight: theme.spacing(3),
        fontSize: '2rem',
    },
    videoContainer: {
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        margin: theme.spacing(4, 0),
        borderRadius: '16px',
        boxShadow: theme.shadows[6],
        '& iframe': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
        },
    },
    content: {
        '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '12px',
            margin: theme.spacing(4, 0),
            boxShadow: theme.shadows[4],
        },
        '& h2': {
            color: theme.palette.primary.main,
            margin: theme.spacing(5, 0, 3),
            fontWeight: 700,
            fontSize: '2rem',
            position: 'relative',
            paddingBottom: theme.spacing(1),
            '&:after': {
                content: '""',
                position: 'absolute',
                width: '80px',
                height: '5px',
                bottom: 0,
                left: 0,
                background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                borderRadius: '3px',
            },
        },
        '& h3': {
            color: theme.palette.text.primary,
            margin: theme.spacing(4, 0, 2),
            fontWeight: 600,
            fontSize: '1.6rem',
        },
        '& p': {
            marginBottom: theme.spacing(3),
            lineHeight: 1.8,
            fontSize: '1.15rem',
            color: theme.palette.text.secondary,
        },
        '& ul, & ol': {
            paddingLeft: theme.spacing(3),
            marginBottom: theme.spacing(4),
        },
        '& li': {
            marginBottom: theme.spacing(2),
            fontSize: '1.15rem',
            lineHeight: 1.8,
            color: theme.palette.text.secondary,
            position: 'relative',
            paddingLeft: theme.spacing(3),
            '&:before': {
                content: '"•"',
                color: theme.palette.primary.main,
                position: 'absolute',
                left: 0,
                fontWeight: 'bold',
                fontSize: '1.5rem',
            },
        },
        '& ol': {
            counterReset: 'list-counter',
            '& li': {
                counterIncrement: 'list-counter',
                '&:before': {
                    content: 'counter(list-counter) "."',
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                },
            },
        },
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: theme.spacing(3),
        margin: theme.spacing(6, 0, 2),
    },
    ctaButton: {
        padding: theme.spacing(2, 5),
        fontSize: '1.2rem',
        fontWeight: 600,
        borderRadius: '50px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[6],
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: theme.spacing(2, 3),
        },
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
    },
    divider: {
        margin: theme.spacing(6, 0),
        backgroundColor: theme.palette.divider,
        height: '2px',
        background: `linear-gradient(90deg, transparent 0%, ${theme.palette.divider} 50%, transparent 100%)`,
    },
}));

// Updated service details to match new services
const serviceDetails = {
    'component-sales': {
        id: 'component-sales',
        title: 'Electronic Components Sales',
        subtitle: 'Wide range of high-quality electronic components for all your project and repair needs',
        content: `
            <h2>Premium Electronic Components</h2>
            <p>We stock thousands of electronic components from trusted manufacturers worldwide. Whether you're working on a hobby project or industrial equipment, we have what you need.</p>
            
            <h3>Available Components:</h3>
            <ul>
                <li>Passive components (resistors, capacitors, inductors)</li>
                <li>Semiconductors (diodes, transistors, ICs)</li>
                <li>Microcontrollers and development boards</li>
                <li>Sensors and modules for IoT applications</li>
                <li>Connectors, switches, and electromechanical parts</li>
                <li>Power components and voltage regulators</li>
                <li>Displays and touch panels</li>
            </ul>
            
            <h3>Why Buy From Us?</h3>
            <ul>
                <li>Genuine components with authenticity guarantee</li>
                <li>Competitive pricing and bulk discounts</li>
                <li>Same-day shipping for in-stock items</li>
                <li>Technical support for component selection</li>
                <li>Wide selection from common to hard-to-find parts</li>
            </ul>
        `,
        video_url: 'https://www.youtube.com/embed/example2',
        features: [
            "Genuine parts guarantee",
            "Competitive pricing",
            "Same-day shipping",
            "Bulk discounts",
            "Technical support",
            "Wide selection"
        ]
    },
    'engineering-consultations': {
        id: 'engineering-consultations',
        title: 'Engineering Consultations',
        subtitle: 'Expert technical guidance for electronics projects, system design, and implementation strategies',
        content: `
            <h2>Professional Engineering Consultations</h2>
            <p>Our team of experienced engineers provides expert guidance to help you solve complex technical challenges and optimize your electronic systems.</p>
            
            <h3>Consultation Services:</h3>
            <ul>
                <li>Circuit design review and optimization</li>
                <li>PCB layout and manufacturing guidance</li>
                <li>Component selection and sourcing strategies</li>
                <li>System integration solutions</li>
                <li>Technical troubleshooting and failure analysis</li>
                <li>Product development lifecycle consulting</li>
            </ul>
            
            <h3>Our Approach:</h3>
            <p>We follow a structured process to ensure effective solutions:</p>
            <ol>
                <li>Initial problem assessment and requirements gathering</li>
                <li>Technical analysis and solution exploration</li>
                <li>Proposal of multiple solution options</li>
                <li>Implementation guidance and support</li>
                <li>Post-implementation review and optimization</li>
            </ol>
        `,
        features: [
            "Experienced engineering team",
            "Practical solutions",
            "Cost-effective advice",
            "Quick turnaround",
            "Confidentiality guaranteed",
            "Multiple consultation formats"
        ]
    },
    '3d-printing': {
        id: '3d-printing',
        title: '3D Printing Services',
        subtitle: 'High-precision 3D printing for prototypes, custom parts, and engineering components',
        content: `
            <h2>Professional 3D Printing Solutions</h2>
            <p>We provide high-quality 3D printing services using state-of-the-art printers and materials for various applications.</p>
            
            <h3>Our 3D Printing Capabilities:</h3>
            <ul>
                <li>FDM (Fused Deposition Modeling) printing</li>
                <li>SLA (Stereolithography) resin printing</li>
                <li>Multi-material and multi-color printing</li>
                <li>Engineering-grade materials (ABS, PETG, Nylon, TPU)</li>
                <li>High-resolution prototypes and functional parts</li>
                <li>Custom enclosures and mechanical components</li>
            </ul>
            
            <h3>Applications:</h3>
            <ul>
                <li>Prototyping for electronic enclosures</li>
                <li>Custom mounting brackets and fixtures</li>
                <li>Mechanical parts replacement</li>
                <li>Educational models and demonstrations</li>
                <li>Architectural models and design visualization</li>
                <li>Custom tools and jigs for manufacturing</li>
            </ul>
        `,
        features: [
            "High precision printing",
            "Wide material selection",
            "Fast turnaround time",
            "Design consultation",
            "Post-processing options",
            "Competitive pricing"
        ]
    },
    'engineering-labs-setup': {
        id: 'engineering-labs-setup',
        title: 'Engineering Labs Setup',
        subtitle: 'Complete design and installation of specialized laboratories for educational institutions',
        content: `
            <h2>Comprehensive Lab Setup Solutions</h2>
            <p>We design, equip, and install state-of-the-art engineering laboratories for schools, colleges, and universities.</p>
            
            <h3>Our Lab Setup Services:</h3>
            <ul>
                <li>Complete lab design and layout planning</li>
                <li>Equipment specification and procurement</li>
                <li>Electronics workstations setup</li>
                <li>Microcontroller and embedded systems labs</li>
                <li>Robotics and automation labs</li>
                <li>IoT and wireless communication labs</li>
                <li>Renewable energy and power electronics labs</li>
            </ul>
            
            <h3>Our Process:</h3>
            <ol>
                <li>Needs assessment and curriculum alignment</li>
                <li>Space planning and design proposal</li>
                <li>Equipment selection and procurement</li>
                <li>Installation and configuration</li>
                <li>Faculty training and documentation</li>
                <li>Ongoing support and maintenance</li>
            </ol>
        `,
        features: [
            "Curriculum-aligned design",
            "Turnkey solutions",
            "Latest equipment",
            "Faculty training",
            "Safety compliance",
            "Ongoing support"
        ]
    },
    'industrial-solutions': {
        id: 'industrial-solutions',
        title: 'Industrial Engineering Solutions',
        subtitle: 'Customized automation, control systems, and process optimization for manufacturing',
        content: `
            <h2>Industrial Engineering Expertise</h2>
            <p>We develop custom engineering solutions to enhance efficiency, productivity, and automation in industrial settings.</p>
            
            <h3>Our Industrial Solutions:</h3>
            <ul>
                <li>Process automation and control systems</li>
                <li>PLC programming and SCADA systems</li>
                <li>Industrial IoT implementation</li>
                <li>Machine vision and quality control systems</li>
                <li>Energy monitoring and optimization</li>
                <li>Predictive maintenance solutions</li>
                <li>Custom machinery design and development</li>
            </ul>
            
            <h3>Industry Applications:</h3>
            <ul>
                <li>Manufacturing process optimization</li>
                <li>Assembly line automation</li>
                <li>Quality control and inspection systems</li>
                <li>Energy management solutions</li>
                <li>Material handling automation</li>
                <li>Data acquisition and analysis</li>
            </ul>
        `,
        features: [
            "Customized solutions",
            "Industry expertise",
            "Cost-saving implementations",
            "Scalable systems",
            "24/7 technical support",
            "ROI-focused approach"
        ]
    },
    'training-courses': {
        id: 'training-courses',
        title: 'Technical Training Courses',
        subtitle: 'Professional development programs in electronics, automation, and emerging technologies',
        content: `
            <h2>Comprehensive Technical Training</h2>
            <p>We offer hands-on training programs designed to enhance technical skills and knowledge in electronics and engineering.</p>
            
            <h3>Training Programs:</h3>
            <ul>
                <li>Basic electronics fundamentals</li>
                <li>PCB design and fabrication</li>
                <li>Microcontroller programming (Arduino, ESP32, STM32)</li>
                <li>Embedded systems development</li>
                <li>Industrial automation (PLC programming)</li>
                <li>3D printing and CAD design</li>
                <li>IoT development and cloud integration</li>
                <li>Customized corporate training</li>
            </ul>
            
            <h3>Training Formats:</h3>
            <ul>
                <li>On-site workshops</li>
                <li>Online live sessions</li>
                <li>Self-paced e-learning modules</li>
                <li>Corporate training programs</li>
                <li>University partnership programs</li>
            </ul>
        `,
        features: [
            "Hands-on practical training",
            "Certified instructors",
            "Industry-relevant curriculum",
            "Customizable content",
            "Flexible formats",
            "Certification upon completion"
        ]
    },
    'engineering-exhibitions': {
        id: 'engineering-exhibitions',
        title: 'Engineering Exhibitions',
        subtitle: 'Showcasing cutting-edge technologies and innovations through curated technical exhibitions',
        content: `
            <h2>Professional Engineering Exhibitions</h2>
            <p>We organize and manage technical exhibitions to showcase innovations, promote knowledge sharing, and foster industry connections.</p>
            
            <h3>Our Exhibition Services:</h3>
            <ul>
                <li>Complete exhibition planning and management</li>
                <li>Technical demonstration setups</li>
                <li>Interactive exhibit design</li>
                <li>Educational institution showcases</li>
                <li>Industry innovation exhibitions</li>
                <li>STEM promotion events</li>
            </ul>
            
            <h3>Exhibition Types:</h3>
            <ul>
                <li>University engineering project showcases</li>
                <li>Industry innovation expos</li>
                <li>STEM education fairs</li>
                <li>Technology innovation competitions</li>
                <li>Maker fairs and DIY exhibitions</li>
                <li>Corporate technology showcases</li>
            </ul>
        `,
        features: [
            "Professional event management",
            "Technical expertise",
            "Interactive exhibits",
            "Marketing and promotion",
            "Participant coordination",
            "Post-event reporting"
        ]
    }
};

const ServiceDetailPage: NextPage<{ data: any }> = ({ data }) => {
    const classes = useStyles();
    const { data: services, error: servicesError } = useArticles('SERVICE');
    const [service, setService] = useState(data || null);
    const [loading, setLoading] = useState(!data);
    const router = useRouter();
    const mobile = useMedia('(max-width: 580px)');

    useEffect(() => {
        if (!data && router.query.id) {
            const fetchService = async () => {
                try {
                    const result = await getArticle(router.query.id as string);
                    setService(result);
                } catch (err) {
                    console.error('API Error:', err);
                    // Use local data if API fails
                    const localService = serviceDetails[router.query.id as keyof typeof serviceDetails];
                    if (localService) {
                        setService(localService);
                    }
                } finally {
                    setLoading(false);
                }
            };
            fetchService();
        }
    }, [data, router.query.id]);

    const getServiceIcon = (serviceId: string) => {
        switch(serviceId) {
            case 'component-sales': return <ShoppingBasket className={classes.featureIcon} />;
            case 'engineering-consultations': return <EmojiObjects className={classes.featureIcon} />;            case '3d-printing': return <Print className={classes.featureIcon} />;
            case 'engineering-labs-setup': return <Build className={classes.featureIcon} />;
            case 'industrial-solutions': return <Settings className={classes.featureIcon} />;
            case 'training-courses': return <School className={classes.featureIcon} />;
            case 'engineering-exhibitions': return <Event className={classes.featureIcon} />;
            default: return <HelpOutline className={classes.featureIcon} />;
        }
    };

    const whatsappNumber = router.query.id === 'component-sales' 
        ? '962790062196' // Sales number
        : '962795909648'; // Tech support number

    const whatsappMessage = router.query.id === 'component-sales'
        ? 'Hello, I would like to inquire about purchasing components.'
        : `Hello, I need technical support regarding your ${service?.title} service.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    if (loading) {
        return (
            <Box className={classes.loadingContainer}>
                <CircularProgress size={80} thickness={4} />
            </Box>
        );
    }

    if (!service) {
        return (
            <Container maxWidth="md" className={classes.mainContainer}>
                <Box textAlign="center" py={10}>
                    <Heading title="Service Not Found" />
                    <Typography variant="h6" color="textSecondary">
                        The requested service could not be found.
                    </Typography>
                </Box>
            </Container>
        );
    }

    // Get service ID safely
    const serviceId = service.id || router.query.id;
    
    // Get image for this service
    const serviceImage = serviceId ? serviceImages[serviceId as keyof typeof serviceImages] : null;

    return (
        <div className={classes.root}>
            <SEO 
                title={`${service?.title} | Mikroelectron`} 
                description={service?.subtitle || `Learn about our ${service?.title} service`}
            />

            {/* Hero Section with service-specific background */}
            <Box 
                className={classes.serviceHero}
                style={{
                    backgroundImage: serviceImage 
                        ? `url(${serviceImage.src})` 
                        : 'none'
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h1" className={classes.serviceTitle}>
                        {service?.title}
                    </Typography>
                    {service?.subtitle && (
                        <Typography variant="h5" className={classes.serviceSubtitle}>
                            {service.subtitle}
                        </Typography>
                    )}
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxWidth={false} className={classes.mainContainer}>
                <div className={classes.contentWrapper}>
                    {/* Content Area */}
                    <div className={classes.contentArea}>
                      
                        {/* Features Section */}
                        {service?.features && (
                            <Box className={classes.contentCard}>
                                <Grid container spacing={3} className={classes.featureGrid}>
                                    {service.features.map((feature, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <Box className={classes.featureItem}>
                                                {getServiceIcon(service.id)}
                                                <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                                                    {feature}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}

                        {/* Main Content Section */}
                        <Box className={classes.contentCard}>
                            <div 
                                className={classes.content}
                                dangerouslySetInnerHTML={{ __html: service?.content }} 
                            />
                        </Box>

                        <Divider className={classes.divider} />

                        {/* Call-to-Action Buttons */}
                        <Box className={classes.buttonContainer}>
                            {router.query.id === 'component-sales' ? (
                                <>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        size="large"
                                        className={classes.ctaButton}
                                        onClick={() => router.push('/')}
                                        startIcon={<ShoppingBasket />}
                                    >
                                        Browse Components
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="primary" 
                                        size="large"
                                        className={classes.ctaButton}
                                        onClick={() => window.open(whatsappUrl, '_blank')}
                                        startIcon={<WhatsApp />}
                                    >
                                        Contact Sales
                                    </Button>
                                </>
                            ) : (
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="large"
                                    className={classes.ctaButton}
                                    onClick={() => window.open(whatsappUrl, '_blank')}
                                    startIcon={<WhatsApp />}
                                >
                                    Contact Support
                                </Button>
                            )}
                        </Box>
                    </div>
                </div>
            </Container>

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
        </div>
    );
};

export async function getStaticProps({ params }) {
    try {
        const data = await getArticle(params.id);
        return {
            props: {
                data: data || serviceDetails[params.id] || null,
            },
            revalidate: 3600,
        };
    } catch (error) {
        console.error('Error fetching service:', error);
        return {
            props: {
                data: serviceDetails[params.id] || null,
            },
        };
    }
}

export async function getStaticPaths() {
    const paths = Object.keys(serviceDetails).map(id => ({
        params: { id },
    }));
    
    return {
        paths,
        fallback: true,
    };
}

export default ServiceDetailPage;