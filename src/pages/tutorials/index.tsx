import { NextPage } from 'next';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  StyledContainer,
  StyledContent,
} from 'features/terms-and-services/terms-and-services';
import { SEO } from 'components/seo';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Box,
  useMediaQuery,
  IconButton
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Image from 'next/image';
import { useArticles } from "../../data/use-website";
import Link from "next/link";
import { useState, useEffect, useMemo } from 'react';
import ShareIcon from '@material-ui/icons/Share';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Footer from '../../layouts/footer';
import YoutubeIcon from '@material-ui/icons/Youtube';

// Brand colors
const primaryColor = '#fe5e00'; // Orange
const secondaryColor = '#133695'; // Dark Blue

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 12px 20px -10px rgba(19, 54, 149, 0.3)`,
        backgroundColor: '#fff',
      },
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 16,
      overflow: 'hidden',
      border: '1px solid #eef2f6',
      backgroundColor: '#fff',
    },
    cardAction: {
      backgroundColor: '#fff',
      '&:hover': {
        backgroundColor: '#fff !important',
      },
    },
    mediaContainer: {
      position: 'relative',
      height: 0,
      paddingTop: '56.25%',
      overflow: 'hidden',
      backgroundColor: '#f8fafc',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2.5),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
      },
    },
    title: {
      fontWeight: 700,
      marginBottom: 0,
      color: theme.palette.text.primary,
      fontSize: '1.15rem',
      minHeight: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '20px',
      paddingBottom: '0',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.05rem',
        minHeight: 'auto',
      },
    },
    actions: {
      padding: theme.spacing(0, 2.5, 2.5, 2.5),
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2, 2, 2),
      },
    },
    button: {
      borderRadius: 24,
      padding: theme.spacing(1, 3),
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.9rem',
      boxShadow: 'none',
      transition: 'all 0.2s',
      backgroundColor: primaryColor,
      color: '#fff',
      '&:hover': {
        transform: 'scale(1.03)',
        backgroundColor: '#e04a00',
        boxShadow: '0 4px 12px rgba(254, 94, 0, 0.3)',
      },
    },
    gridItem: {
      display: 'flex',
      justifyContent: 'center',
    },
    gridContainer: {
      justifyContent: 'center',
    },
    hero: {
      background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor} 100%)`,
      color: 'white',
      padding: theme.spacing(10, 0, 5, 0),
      marginBottom: theme.spacing(5),
      marginX: '0 !important',
      textAlign: 'center',
      boxShadow: '0 8px 24px rgba(19, 54, 149, 0.2)',
      position: 'relative',
      overflow: 'hidden',
      width: '100% !important',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(10, 0, 5, 0),
      },
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, transparent 40%)',
      }
    },
    heroContent: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: theme.spacing(0, 4),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
      }
    },
    heroTitle: {
      fontWeight: 900,
      fontSize: '2.8rem',
      marginBottom: theme.spacing(1.5),
      textShadow: '0 4px 8px rgba(0,0,0,0.2)',
      position: 'relative',
      letterSpacing: '-0.5px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.7rem',
      },
    },
    heroSubtitle: {
      fontWeight: 400,
      fontSize: '1.3rem',
      maxWidth: 800,
      margin: '0 auto',
      opacity: 0.9,
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.1rem',
        padding: theme.spacing(0, 2),
      },
    },
    sectionTitle: {
      fontWeight: 800,
      marginBottom: theme.spacing(4),
      color: secondaryColor,
      position: 'relative',
      paddingBottom: theme.spacing(2),
      fontSize: '2rem',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.7rem',
        marginBottom: theme.spacing(3),
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120px',
        height: '5px',
        background: primaryColor,
        borderRadius: '10px',
      },
    },
    skeletonCard: {
      height: 380,
      borderRadius: 16,
      transform: 'none',
      boxShadow: theme.shadows[2],
      [theme.breakpoints.down('sm')]: {
        height: 320,
      },
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: theme.spacing(4),
      gap: theme.spacing(2),
      flexWrap: 'wrap',
      [theme.breakpoints.down('xs')]: {
        gap: theme.spacing(1),
      },
    },
    customTrainingButton: {
      borderRadius: 24,
      fontWeight: 600,
      padding: theme.spacing(1, 3),
      backgroundColor: secondaryColor,
      color: '#fff',
      flexShrink: 0,
      '&:hover': {
        backgroundColor: '#0d2a7d',
        boxShadow: '0 4px 12px rgba(19, 54, 149, 0.3)',
      },
      whiteSpace: 'nowrap',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.7, 2),
        fontSize: '0.85rem',
        height: 36,
      },
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0.7, 1.5),
        fontSize: '0.8rem',
      },
    },
    filterButtonsContainer: {
      display: 'flex',
      gap: theme.spacing(2),
      flexWrap: 'wrap',
      flexGrow: 1,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-start',
      },
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'flex-start',
      },
    },
    actionBarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      flexWrap: 'wrap', 
      marginBottom: theme.spacing(4),
      gap: theme.spacing(1.5),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing(1),
      },
    },
    filterButton: {
      textTransform: 'none',
      fontWeight: 600,
      borderBottom: '2px solid #133695',
      borderRadius: 0,
      boxShadow: 'none',
      padding: theme.spacing(1, 3),
      transition: 'all 0.3s',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.7, 2),
        fontSize: '0.85rem',
        whiteSpace: 'nowrap',
        height: 36,
      },
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0.7, 1.5),
        fontSize: '0.8rem',
      },
    },
    footerWrapper: {
      marginTop: theme.spacing(8),
      backgroundColor: '#f8fafc',
      borderTop: `1px solid #e2e8f0`,
      width: '100%',
    },
    mainContent: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: theme.spacing(0, 4),
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
      }
    }
  })
);

const TermsPage: NextPage<{}> = () => {
  const classes = useStyles();
  const { data: items, loading } = useArticles('TUTORIAL'); // Changed to TUTORIAL
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    if (items) {
      setFilteredItems(items);
    }
  }, [items]);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    setFilteredItems(items);
  };

  return (
    <>
      <SEO title={'Tutorials'} description="Explore our step-by-step tutorials to enhance your skills" />

      <StyledContainer style={{ padding: 0, margin: '0', maxWidth: '100%', width: 'auto' }}>
        {/* Hero Section */}
        <Box className={classes.hero}>
          <Box className={classes.heroContent}>
            <Typography variant="h1" component="h1" className={classes.heroTitle}>
              Step-by-Step Tutorials
            </Typography>
            <Typography variant="h5" className={classes.heroSubtitle}>
              Master new skills with our easy-to-follow tutorials designed for all levels
            </Typography>
          </Box>
        </Box>
        
        {/* Main Content Container */}
        <Box className={classes.mainContent}>
          <div className={classes.actionBarContainer}>
            <div className={classes.filterButtonsContainer}>
              <Button 
                variant={activeFilter === 'all' ? 'contained' : 'outlined'} 
                color="primary"
                className={classes.filterButton}
                onClick={() => handleFilter('all')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#133695', 
                  fontWeight: activeFilter === 'all' ? 700 : 400,
                }}
              >
                All Tutorials
              </Button>
            </div>
            <Button
                  variant="contained"
                  className={classes.customTrainingButton}
                  href="https://www.youtube.com/@mikroelectronjo"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<YoutubeIcon />}
                >
              {isMobile ? "Watch on YouTube" : "Watch All Tutorials on YouTube"}
                </Button>
          </div>
          
          {/* Tutorial Grid */}
          <Grid container spacing={4} className={classes.gridContainer}>
            {loading ? (
              Array.from(new Array(8)).map((_, index) => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={index} className={classes.gridItem}>
                  <Skeleton variant="rect" className={classes.skeletonCard} />
                </Grid>
              ))
            ) : (
              filteredItems.map(e => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={e.id} className={classes.gridItem}>
                  <Card className={classes.root} elevation={3}>
                    <CardActionArea component="div" className={classes.cardAction}>
                      <div className={classes.mediaContainer}>
                        {e.image ? (
                          <Image
                            src={e.image}
                            alt={e.title}
                            layout="fill"
                            objectFit="cover"
                            quality={90}
                            unoptimized={true}
                          />
                        ) : (
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: '#eef2f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#94a3b8',
                            fontWeight: 600
                          }}>
                            Tutorial Image
                          </div>
                        )}
                      </div>
                      <CardContent className={classes.content}>
                        <Typography variant="h6" component="h3" className={classes.title}>
                          {e.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.actions}>
                      <Link href={`/tutorials/${e.id}`} passHref>
                        <Button 
                          variant="contained" 
                          className={classes.button}
                          component="a"
                          fullWidth
                        >
                          View Tutorial
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
          
          {!loading && filteredItems.length === 0 && (
            <Box textAlign="center" py={10}>
              <Typography variant="h5" color="textSecondary">
                No tutorials found.
              </Typography>
            </Box>
          )}
        </Box>
        
        {/* Footer Section */}
        <div className={classes.footerWrapper}>
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
      </StyledContainer>
    </>
  );
};

export default TermsPage;