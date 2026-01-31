import { NextPage } from 'next';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import {
  StyledContent,
  StyledLeftContent,
} from 'features/terms-and-services/terms-and-services';
import { SEO } from 'components/seo';
import { 
  Typography, 
  Box, 
  Chip, 
  Button, 
  IconButton 
} from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import { useArticles, useArticle, getArticle } from "../../data/use-website";
import { useMedia } from "../../utils/use-media";
import { useRouter } from "next/router";
import css from '@styled-system/css';
import styled from "styled-components";
import Link from "next/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BuildIcon from '@mui/icons-material/Build';
import ShareIcon from '@mui/icons-material/Share';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

// Brand colors
const primaryColor = '#fe5e00'; // Orange
const secondaryColor = '#133695'; // Dark Blue

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   sidebarTitle: {
      fontWeight: 800,
      marginBottom: theme.spacing(2.5),
      color: secondaryColor,
      fontSize: '1.5rem',
      paddingBottom: theme.spacing(1.5),
      borderBottom: `3px solid ${primaryColor}`,
    },
    serviceTitle: {
      fontWeight: 900,
      marginBottom: theme.spacing(2),
      color: secondaryColor,
      fontSize: '2.4rem',
      lineHeight: 1.2,
      flex: '1 1 auto', // Allow title to grow and shrink
      minWidth: 0, // Important for text truncation
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('md')]: {
        fontSize: '1.8rem',
        flex: '1 1 60%', // Take 60% of space on small screens
      },
      [theme.breakpoints.down('sm')]: {
        flex: '1 1 100%', // Full width on extra small screens
      },
    },
    actionContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: theme.spacing(1.5),
      marginBottom: theme.spacing(1),
      flexShrink: 0, // Prevent shrinking
      [theme.breakpoints.down('md')]: {
        flex: '0 0 auto', // Maintain natural width
      },
    },
    contentContainer: {
      lineHeight: 1.8,
      fontSize: '1.1rem',
      color: '#334155',
      '& h2': {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(3),
        color: secondaryColor,
        fontWeight: 800,
        fontSize: '1.8rem',
        paddingBottom: theme.spacing(1),
        borderBottom: `2px solid ${theme.palette.grey[200]}`,
      },
      '& h3': {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
        fontWeight: 700,
        fontSize: '1.5rem',
      },
      '& p': {
        marginBottom: theme.spacing(3),
        fontSize: '1.1rem',
      },
      '& ul': {
        paddingLeft: theme.spacing(4),
        marginBottom: theme.spacing(4),
      },
      '& li': {
        marginBottom: theme.spacing(2),
        position: 'relative',
        paddingLeft: theme.spacing(3),
        fontSize: '1.1rem',
        '&:before': {
          content: '"•"',
          position: 'absolute',
          left: 0,
          color: primaryColor,
          fontWeight: 'bold',
          fontSize: '1.5rem',
        }
      },
    },
    metaContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(5),
      flexWrap: 'wrap',
      backgroundColor: '#f8fafc',
      padding: theme.spacing(3),
      borderRadius: 16,
      border: '1px solid #e2e8f0',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(4),
      color: '#475569',
      fontSize: '1rem',
    },
    metaIcon: {
      marginRight: theme.spacing(1.5),
      color: primaryColor,
      fontSize: '1.3rem',
    },
    hero: {
      background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor} 100%)`,
      color: 'white',
      padding: theme.spacing(10, 2),
      borderRadius: 24,
      marginBottom: theme.spacing(6),
      textAlign: 'center',
      boxShadow: theme.shadows[6],
      position: 'relative',
      overflow: 'hidden',
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
    heroTitle: {
      fontWeight: 900,
      fontSize: '2.8rem',
      marginBottom: theme.spacing(1.5),
      textShadow: '0 4px 8px rgba(0,0,0,0.2)',
      position: 'relative',
      [theme.breakpoints.down('md')]: {
        fontSize: '2.2rem',
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
      },
    },
    actionBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(4),
      gap: theme.spacing(2),
      flexWrap: 'nowrap', // Prevent wrapping
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap', // Allow wrapping only on extra small screens
      },
    },
    enrollButton: {
      borderRadius: '30px !important',
      padding: '12px 36px !important',
      fontWeight: 700,
      fontSize: '1.1rem !important',
      textTransform: 'none',
      boxShadow: '0 4px 16px rgba(254,94,0,0.3) !important',
      background: primaryColor,
      color: 'white !important',
      transition: 'all 0.3s ease !important',
      letterSpacing: '0.5px !important',
      '&:hover': {
        background: '#8f3204ff !important',
        transform: 'translateY(-2px) !important',
        boxShadow: '0 6px 20px rgba(254,94,0,0.4) !important',
      },
    },
    shareButton: {
      backdropFilter: 'blur(10px)',
      color: primaryColor,
      width: 60,
      height: 50,
      transition: 'all 0.3s ease !important',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.25) !important',
        transform: 'translateY(-2px)',
      },
    },
    mobileActionButton: {
      borderRadius: '30px !important',
      padding: '8px 16px !important',
      fontWeight: 700,
      fontSize: '0.9rem !important',
      textTransform: 'none',
      boxShadow: '0 4px 16px rgba(254,94,0,0.3) !important',
      background: primaryColor,
      color: 'white !important',
      transition: 'all 0.3s ease !important',
      letterSpacing: '0.5px !important',
      '&:hover': {
        background: '#8f3204ff !important',
        transform: 'translateY(-2px) !important',
        boxShadow: '0 6px 20px rgba(254,94,0,0.4) !important',
      },
    },
    contentCard: {
      borderRadius: 20,
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0',
      backgroundColor: '#fff',
      padding: theme.spacing(5),
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(3),
      },
    },
    mobileSidebarTitle: {
      fontWeight: 800,
      margin: theme.spacing(3, 0, 2, 3),
      color: primaryColor,
      fontSize: '1.5rem',
      paddingBottom: theme.spacing(1.5),
      borderBottom: `3px solid ${primaryColor}`,
    },
    sidebarContainer: {
      position: 'relative',
      paddingTop: 10,
    },
    topBarMobile: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(3),
      gap: theme.spacing(1),
      flexWrap: 'wrap',
      [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(0.5),
      },
    },
    breadcrumbContainer: {
      flex: 1,
      minWidth: '50%',
    },
  })
);

const ArticleLink = styled("a")(
  css({
    '&.active': {
      color: 'white !important',
      backgroundColor: 'primary.regular',
      borderLeft: '4px solid',
      borderColor: 'primary.dark',
      transform: 'scale(1.02)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    },
    '&:hover:not(.active)': {
      color: 'primary.regular',
      backgroundColor: '#f0f7ff',
      borderLeft: '4px solid',
      borderColor: 'primary.regular',
    },
  }),
  {
    fontSize: 16,
    textDecoration: 'none',
    padding: '16px 28px',
    display: 'block',
    color: '#334155',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    borderLeft: '4px solid transparent',
    borderRadius: '0 10px 10px 0',
    marginBottom: 6,
    fontWeight: 600,
    position: 'relative',
  }
);

export const StyledContainer = styled.div(
  css({
    width: ['100%', '90vw'],
    paddingTop: ['80px', '100px'], 
  }),
  {
    margin: 'auto',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 80,
  }
);

export const StyledLeftInnerContent = styled.div(
  css({
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: '16px 0',
    boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0',
    maxHeight: '80vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 6,
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f5f9',
      borderRadius: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#cbd5e1',
      borderRadius: 10,
    },
  })
);

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 16px;
  margin-bottom: 40px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  background: #000;
  border: 1px solid #e2e8f0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 100%);
    pointer-events: none;
    border-radius: 16px;
  }
`;

const ServiceBreadcrumb = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 1rem;
  color: #64748b;
  
  a {
    color: #64748b;
    text-decoration: none;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    
    &:hover {
      color: #3f51b5;
      text-decoration: underline;
    }
  }
  
  span {
    margin: 0 10px;
    color: #cbd5e1;
  }
`;

const SidebarToggleButton = styled(Button)`
  margin-bottom: 20px;
  background-color: #f1f5f9 !important;
  font-weight: 600 !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px;
`;

const MobileSidebarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
  width: 85%;
  height: 100vh;
  background: white;
  z-index: 1200;
  transition: all 0.3s ease;
  box-shadow: 5px 0 25px rgba(0,0,0,0.1);
  overflow-y: auto;
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1100;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const CloseButton = styled(IconButton)`
  position: absolute !important;
  top: 10px;
  right: 10px;
  background: #f1f5f9 !important;
  z-index: 10;
`;

const MobileActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SidebarSticky = styled.div<{ $top?: number; $zIndex?: number }>`
  position: sticky;
  top: ${({ $top }) => ($top ?? 0)}px;
  z-index: ${({ $zIndex }) => ($zIndex ?? 1)};
`;

type Props = {
  data: any;
};

const ServiceDetailPage: NextPage<Props> = ({ data }) => {
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: items, loading: isServicesLoading } = useArticles('SERVICE');
  const { data: item, loading: isServiceLoading } = useArticle(data?.id);
  const mobile = useMedia('(max-width: 900px)');
  const router = useRouter();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [router.query.id]);

  useEffect(() => {
    if (mobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [sidebarOpen, mobile]);

  return (
    <>
      <SEO title={item?.title || 'Service'} description={item?.excerpt || ''} />
      <StyledContainer>
        {mobile ? (
          <div className={classes.topBarMobile}>
            <div className={classes.breadcrumbContainer}>
              <ServiceBreadcrumb>
                <Link href="/">
                  <a>
                    <ArrowBackIcon style={{ fontSize: 18, marginRight: 8 }} /> 
                    Home
                  </a>
                </Link>
                <span>›</span>
                <Link href="/services">
                  <a>Services</a>
                </Link>
                <span>›</span>
                <span>{item?.title || 'Service Detail'}</span>
              </ServiceBreadcrumb>
            </div>
            
            <MobileActionsContainer>
              <IconButton
                aria-label="share"
                className={classes.shareButton}
                onClick={handleShare}
                size="large">
                <ShareIcon fontSize="small" />
              </IconButton>
              
              <Button 
                variant="contained" 
                color="primary" 
                size="small"
                className={classes.mobileActionButton}
                startIcon={<BuildIcon style={{ fontSize: '1rem' }} />}
                onClick={() => window.open('https://wa.me/962790062196', '_blank')}
              >
                Request
              </Button>
            </MobileActionsContainer>
          </div>
        ) : (
          <ServiceBreadcrumb>
            <Link href="/">
              <a>
                <ArrowBackIcon style={{ fontSize: 18, marginRight: 8 }} /> 
                Home
              </a>
            </Link>
            <span>›</span>
            <Link href="/services">
              <a>Services</a>
            </Link>
            <span>›</span>
            <span>{item?.title || 'Service Detail'}</span>
          </ServiceBreadcrumb>
        )}

        {mobile && (
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <SidebarToggleButton 
              variant="outlined"
              onClick={() => setSidebarOpen(true)}
              startIcon={<MenuIcon />}
              style={{ flex: 1 }}
            >
              Service Catalog
            </SidebarToggleButton>
          </Box>
        )}

        {mobile && (
          <>
            <MobileSidebarContainer $isOpen={sidebarOpen}>
              <CloseButton onClick={() => setSidebarOpen(false)}>
                <CloseIcon />
              </CloseButton>
              <Typography variant="h5" component="h2" className={classes.mobileSidebarTitle}>
                Service Catalog
              </Typography>
              <StyledLeftInnerContent>
                {isServicesLoading ? (
                  Array.from(new Array(6)).map((_, index) => (
                    <Box key={index} p={2}>
                      <Skeleton variant="text" width="90%" height={30} />
                    </Box>
                  ))
                ) : (
                  items.map((service) => (
                    <Link href={`/services/${service.id}`} passHref key={service.id}>
                      <ArticleLink 
                        className={router.query.id === service.id ? 'active' : ''}
                      >
                        <span style={{ color: secondaryColor }}>{service.title}</span>
                        {router.query.id === service.id && (
                          <Chip 
                            label="Current" 
                            size="small" 
                            color="primary" 
                            style={{ 
                              position: 'absolute', 
                              right: 20,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                            }}
                          />
                        )}
                      </ArticleLink>
                    </Link>
                  ))
                )}
              </StyledLeftInnerContent>
            </MobileSidebarContainer>
            <Overlay 
              $isOpen={sidebarOpen} 
              onClick={() => setSidebarOpen(false)} 
            />
          </>
        )}

        <StyledContent>
          {!mobile && (
            <StyledLeftContent>
              <div className={classes.sidebarContainer}>
                <SidebarSticky $top={100} $zIndex={1}>
                  <div>
                    <Typography variant="h5" component="h2" className={classes.sidebarTitle}>
                      Service Catalog
                    </Typography>
                    <StyledLeftInnerContent>
                      {isServicesLoading ? (
                        Array.from(new Array(6)).map((_, index) => (
                          <Box key={index} p={2}>
                            <Skeleton variant="text" width="90%" height={30} />
                          </Box>
                        ))
                      ) : (
                        items.map((service) => (
                          <Link href={`/services/${service.id}`} passHref key={service.id}>
                            <ArticleLink 
                              className={router.query.id === service.id ? 'active' : ''}
                            >
                              <span style={{ color: secondaryColor }}>{service.title}</span>
                              {router.query.id === service.id && (
                                <Chip 
                                  label="Current" 
                                  size="small" 
                                  color="primary" 
                                  style={{ 
                                    position: 'absolute', 
                                    right: 20,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                  }}
                                />
                              )}
                            </ArticleLink>
                          </Link>
                        ))
                      )}
                    </StyledLeftInnerContent>
                  </div>
                </SidebarSticky>
              </div>
            </StyledLeftContent>
          )}
          
          <Box flex={1} pl={mobile ? 0 : 4}>
            {isServiceLoading ? (
              <Box>
                <Skeleton variant="rectangular" height={60} width="80%" style={{ marginBottom: 30 }} />
                <Skeleton variant="rectangular" height={400} style={{ marginBottom: 40, borderRadius: 16 }} />
                <Skeleton variant="text" height={50} width="70%" style={{ marginBottom: 20 }} />
                <Skeleton variant="text" height={30} width="90%" style={{ marginBottom: 10 }} />
                <Skeleton variant="text" height={30} width="85%" style={{ marginBottom: 10 }} />
                <Skeleton variant="text" height={30} width="95%" />
              </Box>
            ) : item ? (
              <>
                <div className={classes.actionBar}>
                  <Typography variant="h3" component="h1" className={classes.serviceTitle}>
                    {item.title}
                  </Typography>
                  
                  {!mobile && (
                    <div className={classes.actionContainer}>
                      <IconButton
                        aria-label="share"
                        className={classes.shareButton}
                        onClick={handleShare}
                        size="large">
                        <ShareIcon />
                      </IconButton>
                      
                      <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.enrollButton}
                        startIcon={<BuildIcon style={{ fontSize: '1.5rem' }} />}
                        onClick={() => window.open('https://wa.me/962790062196', '_blank')}
                      >
                        Request Service
                      </Button>
                    </div>
                  )}
                </div>
                
                {item.video_url && (
                  <VideoContainer>
                    <iframe
                      width="100%" 
                      height="400" 
                      src={item.video_url.replace('watch?v=', 'embed/')}
                      title="YouTube video player" 
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </VideoContainer>
                )}
                
                <Box className={classes.contentCard}>
                  <div 
                    className={classes.contentContainer}
                    dangerouslySetInnerHTML={{__html: item.content}} 
                  />
                </Box>
              </>
            ) : (
              <Box textAlign="center" py={10}>
                <Typography variant="h5" color="textSecondary">
                  Service not found. Please try another service.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style={{ marginTop: 20 }}
                  onClick={() => router.push('/services')}
                >
                  Browse Services
                </Button>
              </Box>
            )}
          </Box>
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
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default ServiceDetailPage;