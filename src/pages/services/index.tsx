import { NextPage } from 'next';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
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
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';
import { useArticles } from "../../data/use-website";
import Link from "next/link";
import { useState, useEffect } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Footer from '../../layouts/footer';

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
        width: '400px',
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
        paddingTop: '56.25%', // 16:9 aspect ratio
        overflow: 'hidden',
        backgroundColor: '#f8fafc',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(2.5),
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(2),
        },
      },
      cardContent: {
        flexGrow: 1, // This makes the content area grow to fill space
        display: 'flex',
        flexDirection: 'column',
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
        [theme.breakpoints.down('md')]: {
          fontSize: '1.05rem',
          minHeight: 'auto',
        },
      },
      actions: {
        padding: theme.spacing(0, 2.5, 2.5, 2.5),
        justifyContent: 'center',
        marginTop: 'auto',
        [theme.breakpoints.down('md')]: {
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
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(19, 54, 149, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        [theme.breakpoints.down('md')]: {
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
        [theme.breakpoints.down('md')]: {
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
        [theme.breakpoints.down('md')]: {
          fontSize: '2rem',
        },
        [theme.breakpoints.down('sm')]: {
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
        [theme.breakpoints.down('md')]: {
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
        [theme.breakpoints.down('md')]: {
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
        [theme.breakpoints.down('md')]: {
          height: 320,
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
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(0.7, 2),
          fontSize: '0.85rem',
          height: 36,
        },
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(0.7, 1.5),
          fontSize: '0.8rem',
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
        [theme.breakpoints.down('md')]: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing(1),
        },
      },
      filterButtonsContainer: {
        display: 'flex',
        gap: theme.spacing(2),
        flexWrap: 'wrap',
        flexGrow: 1,
        [theme.breakpoints.down('md')]: {
          justifyContent: 'flex-start',
        },
        [theme.breakpoints.down('sm')]: {
          justifyContent: 'flex-start',
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
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(0.7, 2),
          fontSize: '0.85rem',
          whiteSpace: 'nowrap',
          height: 36,
        },
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(0.7, 1.5),
          fontSize: '0.8rem',
        },
      },
      mainContent: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: theme.spacing(0, 4),
        width: '100%',
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(0, 2),
        }
      },
      footerWrapper: {
        marginTop: theme.spacing(8),
        backgroundColor: '#f8fafc',
        borderTop: `1px solid #e2e8f0`,
        width: '100%',
      },
    })
);

const ServicesPage: NextPage<{}> = () => {
  const classes = useStyles();
  const { data: items, loading } = useArticles('SERVICE');
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

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
      <SEO title={'Services'} description="Explore our professional services to enhance your business operations" />
      <StyledContainer style={{ padding: 0, margin: '0', maxWidth: '100%', width: 'auto' }}>
        {/* Hero Section */}
        <Box className={classes.hero}>
          <Box className={classes.heroContent}>
            <Typography variant="h1" component="h1" className={classes.heroTitle}>
              Professional Services
            </Typography>
            <Typography variant="h5" className={classes.heroSubtitle}>
              Discover our expert services designed to solve your business challenges
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
                    fontSize: isMobile ? '1.4rem' : '2rem',
                  }}
              >
                Our Services
              </Button>
            </div>

            <Button
                variant="contained"
                className={classes.customTrainingButton}
                href="https://wa.me/962790062196"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WhatsAppIcon />}
            >
              {isMobile ? "Contact Us" : "Request Service Consultation"}
            </Button>
          </div>

          {/* Service Grid */}
          <Grid container spacing={4} className={classes.gridContainer}>
            {loading ? (
                Array.from(new Array(8)).map((_, index) => (
                    <Grid item lg={3} md={4} sm={6} xs={12} key={index} className={classes.gridItem}>
                      <Skeleton variant="rectangular" className={classes.skeletonCard} />
                    </Grid>
                ))
            ) : (
                filteredItems.map(e => (
                    <Grid item lg={3} md={4} sm={6} xs={12} key={e.id} className={classes.gridItem}>
                      <Card className={classes.root} elevation={3}>
                        <CardActionArea component="div" className={classes.cardAction}>
                          <div className={classes.mediaContainer}>
                            {e.image ? (
                                <>
                                  <Image
                                      src={e.image}
                                      alt={e.title}
                                      layout="fill"
                                      objectFit="cover"
                                      quality={90}
                                      unoptimized={true}
                                  />
                                </>
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
                                  Service Image
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
                          <Button
                              component={Link}
                              href={`/services/${e.id}`}
                              variant="contained"
                              className={classes.button}
                              fullWidth
                          >
                            View Details
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                ))
            )}
          </Grid>

          {!loading && filteredItems.length === 0 && (
              <Box textAlign="center" py={10}>
                <Typography variant="h5" color="textSecondary">
                  No services found.
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

export default ServicesPage;
