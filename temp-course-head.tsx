import { NextPage } from 'next';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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
  IconButton,
  Avatar,
  Grid
} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { useArticles, useArticle, getArticle } from "../../data/use-website";
import Sticky from "react-stickynode";
import { useMedia } from "../../utils/use-media";
import { useRouter } from "next/router";
import css from '@styled-system/css';
import styled from "styled-components";
import Link from "next/link";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShareIcon from '@material-ui/icons/Share';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SchoolIcon from '@material-ui/icons/School';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useState, useEffect } from 'react';

// Brand colors
const primaryColor = '#fe5e00'; // Orange
const secondaryColor = '#133695'; // Dark Blue
const tertiaryColor = '#0ea5e9'; // Sky Blue

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
    courseTitle: {
      fontWeight: 900,
      marginBottom: theme.spacing(2),
      color: secondaryColor,
      fontSize: '2.4rem',
      lineHeight: 1.2,
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: -10,
        left: 0,
        width: 80,
        height: 4,
        background: primaryColor,
        borderRadius: 2,
      }
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
        color: secondaryColor,
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
          content: '"ظت"',
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
      boxShadow: '0 5px 15px rgba(0,0,0,0.03)',
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
    difficultyChip: {
      fontWeight: 700,
      borderRadius: 6,
      padding: theme.spacing(0.5, 1),
      fontSize: '0.9rem',
      height: 'auto',
      marginLeft: theme.spacing(1),
      backgroundColor: '#ffefe5',
      color: primaryColor,
    },
    hero: {
      background: secondaryColor,
      color: 'white',
      borderRadius: 24,
      marginTop:'0 !important',
      marginBottom: theme.spacing(6),
      textAlign: 'center',
      boxShadow: theme.shadows[6],
      position: 'relative',
      overflow: 'hidden',
      padding: theme.spacing(4, 2),
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
      maxWidth: 800,
      margin: '0 auto',
      position: 'relative',
    },
    heroTitle: {
      fontWeight: 900,
      fontSize: '2.5rem',
      marginBottom: theme.spacing(1.5),
      textShadow: '0 4px 8px rgba(0,0,0,0.2)',
      position: 'relative',
      lineHeight: 1.2,
    },
    heroSubtitle: {
      fontWeight: 400,
      fontSize: '1.25rem',
      opacity: 0.9,
      position: 'relative',
      marginBottom: theme.spacing(3),
    },
    actionContainer: {
      display: 'flex',
      justifyContent: 'right',
      alignItems: 'right',
      gap: theme.spacing(1.5),
      marginBottom: theme.spacing(1),
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
    actionBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(4),
      flexWrap: 'wrap',
      gap: theme.spacing(2),
      padding: theme.spacing(3),
      backgroundColor: '#f8fafc',
      borderRadius: 16,
      border: `1px solid ${primaryColor}20`,
    },
    actionButtons: {
      display: 'flex',
      gap: theme.spacing(1.5),
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
    buttonIcon: {
      fontSize: '1.5rem !important',
      marginRight: theme.spacing(0.5),
    },
    contentCard: {
      borderRadius: 20,
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0',
      backgroundColor: '#fff',
      padding: theme.spacing(5),
      marginBottom: theme.spacing(5),
      position: 'relative',
      overflow: 'hidden',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 5,
        height: '100%',
        background: primaryColor,
      }
    },
    instructorCard: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(3),
      backgroundColor: '#f0f7ff',
      borderRadius: 16,
      border: `1px solid ${tertiaryColor}20`,
      marginTop: theme.spacing(5),
      boxShadow: '0 5px 15px rgba(0,0,0,0.03)',
    },
    instructorAvatar: {
      width: 80,
      height: 80,
      borderRadius: '50%',
      marginRight: theme.spacing(3),
      backgroundColor: secondaryColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 700,
    },
    mobileSidebarTitle: {
      fontWeight: 800,
      margin: theme.spacing(3, 0, 2, 3),
      color: secondaryColor,
      fontSize: '1.5rem',
      paddingBottom: theme.spacing(1.5),
      borderBottom: `3px solid ${primaryColor}`,
    },
    sidebarContainer: {
      position: 'relative',
      paddingTop: 10,
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(2),
    },
    starIcon: {
      color: '#f59e0b',
      fontSize: '1.2rem',
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
      backgroundColor: '#e2e8f0',
      overflow: 'hidden',
      margin: theme.spacing(1, 0),
    },
    progressFill: {
      height: '100%',
      backgroundColor: primaryColor,
    },
    badge: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: secondaryColor,
      color: 'white',
      padding: '6px 12px',
      borderRadius: 20,
      fontWeight: 700,
      fontSize: '0.8rem',
      zIndex: 1,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    // Mobile-specific styles
    mobileHeroTitle: {
      fontWeight: 800,
      fontSize: '1.8rem',
      marginBottom: theme.spacing(1),
      color: 'white',
      lineHeight: 1.3,
      [theme.breakpoints.up('sm')]: {
        fontSize: '2.5rem',
      },
    },
    mobileHeroSubtitle: {
      fontWeight: 400,
      fontSize: '1rem',
      opacity: 0.9,
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.25rem',
      },
    },
    mobileMetaContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
      marginTop: '0 !important',
      marginBottom: theme.spacing(4),
      backgroundColor: '#f8fafc',
      padding: theme.spacing(3),
      borderRadius: 16,
      border: '1px solid #e2e8f0',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
      },
    },
    mobileMetaItem: {
      display: 'flex',
      alignItems: 'center',
      color: '#475569',
      fontSize: '0.95rem',
    },
    mobileEnrollButton: {
      borderRadius: '30px !important',
      padding: '10px 16px !important',
      marginBottom: '0 !important',
      fontWeight: 700,
      fontSize: '1rem !important',
      flex: 1,
      textTransform: 'none',
      boxShadow: '0 4px 16px rgba(254,94,0,0.3) !important',
      background: primaryColor,
      color: 'white !important',
      transition: 'all 0.3s ease !important',
      '&:hover': {
        background: '#8f3204ff !important',
        transform: 'translateY(-2px) !important',
        boxShadow: '0 6px 20px rgba(254,94,0,0.4) !important',
      },
    },
    mobileShareButton: {
      width: 50,
      height: 50,
      borderRadius: '50% !important',
      border: `1px solid ${primaryColor} !important`,
      background: 'white !important',
      color: `${primaryColor} !important`,
    },
  })
);

const ArticleLink = styled("div")(
  css({
    '&.active': {
      color: 'white !important',
      backgroundColor: primaryColor,
      borderLeft: `4px solid ${secondaryColor}`,
      transform: 'scale(1.02)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    },
    '&:hover:not(.active)': {
      color: primaryColor,
      backgroundColor: '#f0f7ff',
      borderLeft: `4px solid ${primaryColor}`,
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
    paddingTop: ['0', '100px'], 
    paddingBottom: ['20px', '80px'], // Reduced for mobile
  }),
  {
    margin: 'auto',
    paddingRight: 15, // Reduced for mobile
    paddingLeft: 15, // Reduced for mobile
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
      background: primaryColor,
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
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  }

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

const CourseBreadcrumb = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  font-size: 1rem;
  color: #64748b;
  
  a {
    color: #64748b;
    text-decoration: none;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    
    &:hover {
      color: ${primaryColor};
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
  color: ${secondaryColor} !important;
  border: 1px solid ${secondaryColor}20 !important;
  transition: all 0.3s !important;
  
  &:hover {
    background-color: ${secondaryColor}10 !important;
    transform: translateY(-2px);
  }
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
  color: ${secondaryColor} !important;
`;

// Mobile-specific components
const MobileHeader = styled.div`
  margin-top: 60px;
  // padding: 12px 16px;
  display: flex;
  align-items: center;
  margin-bottom: 0 !important;

`;

const MobileTitle = styled.div`
  flex: 1;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${secondaryColor};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px;
`;

const MobileActionBar = styled.div`
  background: transparent;
  display: flex;
  gap: 10px;
  align-items: center;
  border-top:none;
  margin: 0 !important;
`;

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

type Props = {
  data: any;
};

const CoursePage: NextPage<Props> = ({ data }) => {
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rating, setRating] = useState(4.7);
  const { data: items, loading: isCoursesLoading } = useArticles('COURSE');
  const { data: item, loading: isCourseLoading } = useArticle(data?.id);
  const mobile = useMedia('(max-width: 900px)');
  const router = useRouter();

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

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} className={classes.starIcon} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarBorderIcon key="half" className={classes.starIcon} />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarBorderIcon key={`empty-${i}`} className={classes.starIcon} />);
    }
    
    return stars;
  };

  return (
    <>
      <SEO title={item?.title || 'Course'} description={item?.excerpt || ''} />
      
      <StyledContainer>
        {/* Mobile Header */}
        {mobile && (
          <MobileHeader>
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon style={{ color: secondaryColor }} />
            </IconButton>
            <MobileTitle>
              {item?.title || 'Course Detail'}
            </MobileTitle>
          </MobileHeader>
        )}

        {/* Desktop Breadcrumbs */}
        {!mobile && (
          <CourseBreadcrumb>
            <Link href="/">
              <a>
                <ArrowBackIcon style={{ fontSize: 18, marginRight: 8 }} /> 
                Home
              </a>
            </Link>
            <span>ظ║</span>
            <Link href="/courses">
              <a>Courses</a>
            </Link>
            <span>ظ║</span>
            <span>{item?.title || 'Course Detail'}</span>
          </CourseBreadcrumb>
        )}

        {/* Mobile Sidebar Toggle */}
        {mobile && (
          <SidebarToggleButton 
            variant="outlined"
            onClick={() => setSidebarOpen(true)}
            startIcon={<MenuIcon />}
            fullWidth
            style={{ 
              // marginTop: '70px', 
              marginBottom: '20px',
              borderRadius: '12px',
              padding: '10px',
              fontSize: '1rem'
            }}
          >
            Browse Course Catalog
          </SidebarToggleButton>
        )}

        {/* Mobile Sidebar */}
        {mobile && (
          <>
          
        <MobileActionBar>
            <Button
                      variant="contained"
                      className={classes.mobileEnrollButton}
                      startIcon={<PlayCircleOutlineIcon />}
                      onClick={() => window.open('https://wa.me/962790062196', '_blank')}
                    >
                      Request to Reopen
                    </Button>
                    
                  </MobileActionBar>
            <MobileSidebarContainer $isOpen={sidebarOpen}>
              <CloseButton onClick={() => setSidebarOpen(false)}>
                <CloseIcon />
              </CloseButton>
              <Typography variant="h5" component="h2" className={classes.mobileSidebarTitle}>
                Course Catalog
              </Typography>
              <StyledLeftInnerContent>
                {isCoursesLoading ? (
                  Array.from(new Array(6)).map((_, index) => (
                    <Box key={index} p={2}>
                      <Skeleton variant="text" width="90%" height={30} />
                    </Box>
                  ))
                ) : (
                  items.map((course) => (
                    <Link href={`/courses/${course.id}`} passHref key={course.id}>
                      <ArticleLink 
                        className={router.query.id === course.id ? 'active' : ''}
                      >
                        <span style={{ color: secondaryColor }}>{course.title}</span>

                        {router.query.id === course.id && (
                          <Chip 
                            label="Current" 
                            size="small" 
                            style={{ 
                              position: 'absolute', 
                              right: 20,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              backgroundColor: primaryColor,
                              color: 'white'
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
          {/* Desktop Sidebar */}
          {!mobile && (
            <StyledLeftContent>
              <div className={classes.sidebarContainer}>
                <Sticky top={100} innerZ="1">
                  <div>
                    <Typography variant="h5" component="h2" className={classes.sidebarTitle}>
                      Course Catalog
                    </Typography>
                    <StyledLeftInnerContent>
                      {isCoursesLoading ? (
                        Array.from(new Array(6)).map((_, index) => (
                          <Box key={index} p={2}>
                            <Skeleton variant="text" width="90%" height={30} />
                          </Box>
                        ))
                      ) : (
                        items.map((course) => (
                          <Link href={`/courses/${course.id}`} passHref key={course.id}>
                            <ArticleLink 
                              className={router.query.id === course.id ? 'active' : ''}
                            >
                              <span style={{ color: secondaryColor }}>{course.title}</span>

                              {router.query.id === course.id && (
                                <Chip 
                                  label="Current" 
                                  size="small" 
                                  style={{ 
                                    position: 'absolute', 
                                    right: 20,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    backgroundColor: primaryColor,
                                    color: 'white'
                                  }}
                                />
                              )}
                            </ArticleLink>
                          </Link>
                        ))
                      )}
                    </StyledLeftInnerContent>
                  </div>
                </Sticky>
              </div>
            </StyledLeftContent>
          )}
          
          <Box flex={1} pl={mobile ? 0 : 4} pt={mobile ? 8 : 0}>
            {isCourseLoading ? (
              <Box>
                <Skeleton variant="rect" height={60} width="80%" style={{ marginBottom: 30, borderRadius: 16 }} />
                <Skeleton variant="rect" height={400} style={{ marginBottom: 40, borderRadius: 16 }} />
                <Skeleton variant="text" height={50} width="70%" style={{ marginBottom: 20 }} />
                <Skeleton variant="text" height={30} width="90%" style={{ marginBottom: 10 }} />
                <Skeleton variant="text" height={30} width="85%" style={{ marginBottom: 10 }} />
                <Skeleton variant="text" height={30} width="95%" />
              </Box>
            ) : item ? (
              <>
                {/* Desktop Action Container */}
                {!mobile && (
                  <div className={classes.actionContainer}>
                    <IconButton
                      aria-label="share"
                      className={classes.shareButton}
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: document.title,
                            url: window.location.href
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Link copied to clipboard!');
                        }
                      }}
                    >
                      <ShareIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      className={classes.enrollButton}
                      startIcon={<PlayCircleOutlineIcon className={classes.buttonIcon} />}
                      onClick={() => window.open('https://wa.me/962790062196', '_blank')}
                    >
                      Request to Reopen
                    </Button>
                  </div>
                )}

                {/* Hero Section */}
                {!mobile && (
                  <div className={classes.hero}>
                    <div className={classes.heroContent}>
                      <Typography variant="h1" component="h1" className={classes.heroTitle}>
                        {item.title}
                      </Typography>
                      <Typography variant="h5" component="p" className={classes.heroSubtitle}>
                        {item.excerpt || 'Master this skill with our comprehensive course'}
                      </Typography>
                    </div>
                  </div>
                )}
                
                {/* Meta Information */}
                <Box className={mobile ? classes.mobileMetaContainer : classes.metaContainer}>
                  <Box className={mobile ? classes.mobileMetaItem : classes.metaItem}>
                    <SchoolIcon className={classes.metaIcon} />
                    <Typography variant="body2">
                      <strong>Level:</strong> 
                    </Typography>
                    <Chip 
                      label={item.difficulty || 'All Levels'} 
                      className={classes.difficultyChip}
                      style={{ marginLeft: mobile ? 0 : 8 }}
                    />
                  </Box>
                 
                  <Box className={mobile ? classes.mobileMetaItem : classes.metaItem}>
                    <AccessTimeIcon className={classes.metaIcon} />
                    <Typography variant="body2">
                      <strong>Total:</strong> {item.duration || '24h'}
                    </Typography>
                  </Box>

                  <Box className={mobile ? classes.mobileMetaItem : classes.metaItem}>
                    <span className={classes.metaIcon} style={{ fontSize: '1.5rem', marginRight: mobile ? 8 : 12 }}>ظêئ</span>
                    <Typography variant="body2">
                      <strong>Lifetime Access</strong>
                    </Typography>
                  </Box>

                  <Box className={mobile ? classes.mobileMetaItem : classes.metaItem}>
                    <SchoolIcon className={classes.metaIcon} />
                    <Typography variant="body2">
                      <strong>Certificate:</strong> <span>Included</span>
                    </Typography>
                  </Box>

                  {(
                    <Box className={classes.metaItem}>
                      <StarIcon className={classes.metaIcon} />
                      <Typography variant="body2">
                        <strong>Rating:</strong> {rating} / 5
                      </Typography>
                    </Box>
                  )}
                </Box>
                
                {/* Video Player */}
                {item.video_url && (
                  <VideoContainer style={{ marginTop: mobile ? 0 : 20 }}>
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
                
                {/* Content Card */}
                <Box className={classes.contentCard} style={{ 
                  padding: mobile ? '20px' : '40px',
                  borderRadius: mobile ? '16px' : '20px',
                  marginBottom: mobile ? '80px' : '40px'
                }}>
                  <div 
                    className={classes.contentContainer}
                    style={{
                      fontSize: mobile ? '1rem' : '1.1rem',
                      lineHeight: mobile ? '1.6' : '1.8'
                    }}
                    dangerouslySetInnerHTML={{__html: item.content}} 
                  />
                </Box>

              </>
            ) : (
              <Box textAlign="center" py={10}>
                <img 
                  src="/course-not-found.svg" 
                  alt="Course not found" 
                  style={{ width: 200, margin: '0 auto 30px' }} 
                />
                <Typography variant="h5" color="textSecondary" style={{ marginBottom: 20 }}>
                  Course not found. Please try another course.
                </Typography>
                <Button 
                  variant="contained" 
                  style={{ 
                    marginTop: 20,
                    background: `linear-gradient(45deg, ${primaryColor} 0%, #ff8c00 100%)`,
                    color: 'white',
                    fontWeight: 700,
                    padding: '12px 32px',
                    borderRadius: 30
                  }}
                  onClick={() => router.push('/courses')}
                >
                  Browse All Courses
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

export default CoursePage;
