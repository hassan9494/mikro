import React from 'react';
import styled from 'styled-components';
import { Modal } from 'components/modal/modal-provider';
import { SEO } from 'components/seo';
import Footer from 'layouts/footer';
// import Accordion from 'components/accordion/accordion';
import { sitePages } from 'site-settings/site-pages';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormattedMessage } from "react-intl";
import {useSocial} from "../data/use-website";

const accordionData = [
    {
        id: 1,
        intlTitleId: 'faqNo1Title',
        intlDetailsId: 'faqNo1Desc',
        values: { number1: 7, number2: 2 },
    },
    {
        id: 2,
        intlTitleId: 'faqNo2Title',
        intlDetailsId: 'faqNo2Desc',
    },
    {
        id: 3,
        intlTitleId: 'faqNo3Title',
        intlDetailsId: 'faqNo3Desc',
    },
    {
        id: 4,
        intlTitleId: 'faqNo4Title',
        intlDetailsId: 'faqNo4Desc',
    },
];

const Heading = styled.h3`
  font-size: 21px;
  font-weight: 700;
  color: #0d1136;
  line-height: 1.2;
  margin-bottom: 25px;
  width: 100%;
  text-align: center;
`;

const HelpPageWrapper = styled.div`
  background-color: #f7f7f7;
  position: relative;
  padding: 130px 0 60px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 989px) {
    padding-top: 70px;
  }
`;

export const HelpPageContainer = styled.div`
  background-color: transparent;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  @media (min-width: 990px) {
    width: 870px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 989px) {
    padding: 30px;
  }
`;

const ContactSection = styled.div`
  margin-top: 40px;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ContactItem = styled.p`
  font-size: 0.95rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;

  i {
    font-size: 1.2rem;
    margin-right: 10px;
  }

  a {
    color: #0d1136;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #fe5e00;
      text-decoration: underline;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #eee;

  a {
    font-size: 1.5rem;
    opacity: 0.85;
    transition: transform 0.2s ease, opacity 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      opacity: 1;
    }

    &.facebook { color: #1877F2; }
    &.instagram { color: #E1306C; }
    &.youtube { color: #FF0000; }
    &.telegram { color: #0088CC; }
  }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));


const HelpPage: React.FC = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const { data: social } = useSocial();
    return (
        <Modal>
            <SEO {...sitePages.faq.seo} />
            <HelpPageWrapper>
                <Container maxWidth={'md'}>
                    <Heading>F.A.Q</Heading>
                    {
                        accordionData.map((item) => (
                            <Accordion key={item.id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={classes.heading}>
                                        <FormattedMessage
                                            id={item.intlTitleId}
                                        />
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <FormattedMessage
                                            id={item.intlDetailsId}
                                        />
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                    <ContactSection>
                        <Heading><FormattedMessage id="contactInfoTitle" defaultMessage="Contact Info" /></Heading>

                        {social?.call && (
                            <ContactItem>
                                <i className="bi bi-telephone-fill" style={{ color: '#0d6efd' }}></i>
                                <a href={`tel:${social.call}`}>{social.call}</a>
                            </ContactItem>
                        )}

                        {social?.whatsapp && (
                            <ContactItem>
                                <i className="bi bi-whatsapp" style={{ color: '#25D366' }}></i>
                                <a href={`https://wa.me/${social.whatsapp}`} target="_blank">{social.whatsapp}</a>
                            </ContactItem>
                        )}

                        <ContactItem>
                            <i className="bi bi-headset" style={{ color: '#FF9800' }}></i>
                            <a href="https://wa.me/+962795909648" target="_blank">+962795909648</a>
                        </ContactItem>

                        {social?.email && (
                            <ContactItem>
                                <i className="bi bi-envelope-fill" style={{ color: '#FF5722' }}></i>
                                <a href={`mailto:${social.email}`}>{social.email}</a>
                            </ContactItem>
                        )}



                        <SocialIcons>
                            {social?.facebook && (
                                <a href={social.facebook} target="_blank" className="facebook">
                                    <i className="bi bi-facebook"></i>
                                </a>
                            )}
                            {social?.instagram && (
                                <a href={social.instagram} target="_blank" className="instagram">
                                    <i className="bi bi-instagram"></i>
                                </a>
                            )}
                            {social?.youtube && (
                                <a href={social.youtube} target="_blank" className="youtube">
                                    <i className="bi bi-youtube"></i>
                                </a>
                            )}
                            {social?.telegram && (
                                <a href={social.telegram} target="_blank" className="telegram">
                                    <i className="bi bi-telegram"></i>
                                </a>
                            )}
                        </SocialIcons>
                    </ContactSection>
                </Container>
                <Footer social={social}/>
            </HelpPageWrapper>
        </Modal>
    );
};

export default HelpPage;
