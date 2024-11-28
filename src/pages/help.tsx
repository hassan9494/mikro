import React from 'react';
import styled from 'styled-components';
import { Modal } from '@redq/reuse-modal';
import { SEO } from 'components/seo';
import Footer from 'layouts/footer';
// import Accordion from 'components/accordion/accordion';
import { sitePages } from 'site-settings/site-pages';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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


export default function () {
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
                        accordionData.map((item, index) =>
                            <Accordion >
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
                        )
                    }
                </Container>
                <Footer social={social}/>
            </HelpPageWrapper>
        </Modal>
    );
}
