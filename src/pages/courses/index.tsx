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
import React from "react";
import { Fade, Zoom } from 'react-reveal';
import Image from 'next/image';
import Footer from '../../layouts/footer';

// Import all course images as webp
import arduino from '../../assets/courses/arduino.webp';
import android from '../../assets/courses/android.webp';
import advancedarduino from '../../assets/courses/advancedarduino.webp';
import indutrialarduino from '../../assets/courses/indutrialarduino.webp';
import aspnet from '../../assets/courses/asp.net(mvc3).webp';
import solidworks from '../../assets/courses/solidworks.webp';
import raspberrypi from '../../assets/courses/RASPBERRYPI.webp';
import plc from '../../assets/courses/PLC.webp';
import robotics from '../../assets/courses/ROBOTICS.webp';
import plcscadasystem from '../../assets/courses/PLCSCADASYSEM.webp';
import matlab from '../../assets/courses/MATLAB.webp';
import electronicspcb from '../../assets/courses/ELECTRONICSANDPCB.webp';
import ccna from '../../assets/courses/CCNA.webp';
import legorobots from '../../assets/courses/LEGOROBOTS.webp';
import threedprinting from '../../assets/courses/3DPRINTING.webp';
import iot from '../../assets/courses/INTERNETOFTHINGS.webp';
import drones from '../../assets/courses/DRONES.webp';
import pvsolarsystem from '../../assets/courses/PVSOLARSYSTEM.webp';
import littleengineer from '../../assets/courses/LITTLEENGINEER.jpg';

// Create image mapping object
const courseImages = {
  ARDUINO: arduino,
  ANDROID: android,
  "ADVANCED ARDUINO": advancedarduino,
  "INDUSTRIAL ARDUINO": indutrialarduino,
  "ASP.NET (MVC3)": aspnet,
  SOLIDWORKS: solidworks,
  "RASPBERRY PI": raspberrypi,
  "PLC (INDUSTRIAL CONTROL)": plc,
  ROBOTICS: robotics,
  "PLC SCADA SYSTEM": plcscadasystem,
  MATLAB: matlab,
  "ELECTRONICS & PCB": electronicspcb,
  CCNA: ccna,
  "LEGO ROBOTS": legorobots,
  "3D PRINTING": threedprinting,
  "INTERNET OF THINGS": iot,
  DRONES: drones,
  "PV SOLAR SYSTEM": pvsolarsystem,
  "LITTLE ENGINEER": littleengineer
};

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
        background: '#f5f7fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    courseTitle: {
        color: secondaryColor,
        fontWeight: 800,
        fontSize: '1.5rem',
        marginBottom: theme.spacing(1),
        lineHeight: 1.3,
        letterSpacing: '-0.3px',
        textAlign: 'center',
    },
    requestBtn: {
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
    requestSection: {
        textAlign: 'center',
        marginTop: 0,
        marginBottom: theme.spacing(8),
        padding: theme.spacing(4),
        background: '#f9fafc',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    },
    requestTitle: {
        fontWeight: 700,
        marginBottom: theme.spacing(2),
        color: secondaryColor,
        fontSize: '2.2rem',
    },
    requestSubtitle: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(3),
        maxWidth: 600,
        margin: '0 auto',
        fontSize: '1.1rem',
        lineHeight: 1.6,
    },
    requestButton: {
        fontWeight: 700,
        textTransform: 'none',
        padding: theme.spacing(1.2, 4),
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        backgroundColor: primaryColor,
        color: theme.palette.common.white,
        fontSize: '1.1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        '&:hover': {
            backgroundColor: '#d95000',
            transform: 'translateY(-2px)',
            boxShadow: `0 6px 16px ${primaryColor}80`,
        }
    },
    gridContainer: {
        justifyContent: 'center',
        alignItems: 'stretch',
        rowGap: '40px',
        columnGap: '20px',
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
    categoryBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: primaryColor,
        color: 'white',
        fontWeight: 600,
        fontSize: '0.8rem',
        padding: '6px 12px',
        borderRadius: 20,
        zIndex: 3,
    }
}));

const featuredCourses = [
    { 
        title: "ARDUINO", 
        category: "Electronics", 
        image: courseImages.ARDUINO
    },
    { 
        title: "ANDROID", 
        category: "Programming", 
        image: courseImages.ANDROID
    },
    { 
        title: "ADVANCED ARDUINO", 
        category: "Electronics", 
        image: courseImages["ADVANCED ARDUINO"]
    },
    { 
        title: "ASP.NET (MVC3)", 
        category: "Programming", 
        image: courseImages["ASP.NET (MVC3)"]
    },
    { 
        title: "INDUSTRIAL ARDUINO", 
        category: "Industrial", 
        image: courseImages["INDUSTRIAL ARDUINO"]
    },
    { 
        title: "SOLIDWORKS", 
        category: "Design", 
        image: courseImages.SOLIDWORKS
    },
    { 
        title: "RASPBERRY PI", 
        category: "Electronics", 
        image: courseImages["RASPBERRY PI"]
    },
    { 
        title: "PLC (INDUSTRIAL CONTROL)", 
        category: "Industrial", 
        image: courseImages["PLC (INDUSTRIAL CONTROL)"]
    },
    { 
        title: "ROBOTICS", 
        category: "Robotics", 
        image: courseImages.ROBOTICS
    },
    { 
        title: "PLC SCADA SYSTEM", 
        category: "Industrial", 
        image: courseImages["PLC SCADA SYSTEM"]
    },
    { 
        title: "MATLAB", 
        category: "Programming", 
        image: courseImages.MATLAB
    },
    { 
        title: "ELECTRONICS & PCB", 
        category: "Electronics", 
        image: courseImages["ELECTRONICS & PCB"]
    },
    { 
        title: "CCNA", 
        category: "Networking", 
        image: courseImages.CCNA
    },
    { 
        title: "LEGO ROBOTS", 
        category: "Robotics", 
        image: courseImages["LEGO ROBOTS"]
    },
    { 
        title: "3D PRINTING", 
        category: "Design", 
        image: courseImages["3D PRINTING"]
    },
    { 
        title: "INTERNET OF THINGS", 
        category: "IoT", 
        image: courseImages["INTERNET OF THINGS"]
    },
    { 
        title: "DRONES", 
        category: "Robotics", 
        image: courseImages.DRONES
    },
    { 
        title: "PV SOLAR SYSTEM", 
        category: "Energy", 
        image: courseImages["PV SOLAR SYSTEM"]
    },
    { 
        title: "LITTLE ENGINEER", 
        category: "Education", 
        image: courseImages["LITTLE ENGINEER"]
    },
];

const CourseCard = ({ course }) => {
    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
            <div className={classes.mediaContainer}>
                <div className={classes.categoryBadge}>
                    {course.category}
                </div>
                <Image 
                    src={course.image}
                    alt={course.title}
                    width={300}
                    height={150}
                    objectFit="contain"
                />
            </div>
            
            <CardContent className={classes.cardContent}>
                <Typography className={classes.courseTitle} variant="h5" component="h3">
                    {course.title}
                </Typography>
                
                <CardActions style={{ padding: '16px 0 0 0' }}>
                    <Button 
                        size="large"
                        variant="contained"
                        className={classes.requestBtn}
                        fullWidth
                        onClick={() => {
                            // Handle course request
                            window.location.href = `mailto:info@mikroelectron.com?subject=Course Request: ${course.title}`;
                        }}
                    >
                        Request Course
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};

const CoursesPage: NextPage<{}> = () => {
    const classes = useStyles();

    return (
        <>
            <SEO 
                title={'Training Courses | Mikroelectron'} 
                description="Professional training courses in electronics, programming, robotics, industrial automation, and IoT. Enhance your skills with our specialized programs."
            />

            {/* Hero Section */}
            <Box className={classes.heroSection}>
                <Container maxWidth="lg" className={classes.heroContent}>
                    <Fade top duration={1000}>
                        <Typography variant="h1" className={classes.sectionTitle} gutterBottom>
                            Mikroelectron Training Courses
                        </Typography>
                        <Typography variant="h5" className={classes.sectionSubtitle}>
                            Professional training programs in electronics, programming, robotics, and industrial automation
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
                        {featuredCourses.map((course, index) => (
                            <Grid 
                                item 
                                xs={12}   // 1 column on extra small screens
                                sm={4}    // 2 columns on small screens
                                md={3}    // 3 columns on medium screens
                                lg={3}    // 4 columns on large screens
                                key={index} 
                                className={classes.gridItem}
                            >
                                <Zoom delay={index * 100} duration={800}>
                                    <div className={classes.cardWrapper}>
                                        <CourseCard course={course} />
                                    </div>
                                </Zoom>
                            </Grid>
                        ))}
                    </Grid>
                </StyledContent>
            </StyledContainer>

            {/* Request Section */}
            <Container maxWidth="md" className={classes.requestSection}>
                <Typography variant="h3" className={classes.requestTitle} gutterBottom>
                    Don't see your desired course?
                </Typography>
                <Typography variant="h6" className={classes.requestSubtitle}>
                    We offer customized training programs tailored to your specific needs. 
                    Contact us to request a specialized course or schedule a training session 
                    for your team or institution.
                </Typography>
                
                <Button
                    variant="contained"
                    className={classes.requestButton}
                    href="mailto:info@mikroelectron.com?subject=Custom Course Request"
                >
                    Request Custom Training
                </Button>
            </Container>

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

export default CoursesPage;