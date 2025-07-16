import styled from 'styled-components';
import css from '@styled-system/css';
import {FormattedMessage} from 'react-intl';
import {IconButton} from '@material-ui/core';
import {
    Facebook,
    Instagram,
    Mail,
    Phone,
    Room,
    Telegram,
    WhatsApp,
    YouTube,
} from '@material-ui/icons';
import React from 'react';
import LocationImage from '../assets/location-image.png';
import {margin, width} from 'styled-system';


const Box = styled.div(
    css({
        fontFamily: 'body',
        fontSize: 'sm',
        fontWeight: 'regular',
        color: 'text.regular',
        padding: '0 !important',
        width: '100%',
        background: '#fff',
        borderTop: '1px solid #f2f2f2',
        overflow: 'hidden',
        margin: '0 !important',

        '@media (max-width: 980px)': {
            padding: 'o',
            margin: '0 !important',

        }
    })
);

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  padding: 0 75px 0 20px !important;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Copyright = styled.div`
  flex-shrink: 0;
  font-size: 14px;
  text-align: right;
  align-self: center;

  @media (max-width: 800px) {
    text-align: left;
  }
`;

const LocationWrapper = styled.div`
  width: 80%;
  margin: 0 -30px; // Negative margin to counter the Box padding
  position: relative;

  img {
    width: 80%;
    display: block;
    overflow: hidden;
    object-fit:fill;
  }


span {
    display: block;
    margin: 12px 30px 0; // Add back the padding for text
    font-size: 15px;
    color: #333;
    text-align: center;
    margin-buttom: 0;
    padding-buttom: 0;
  }


    @media (min-width: 990px) {
    img {
      height: 400px !important;
    }
  }
}`;

const Footer = ({social}) => {
    const currentYear = new Date().getFullYear();

    return (
        <Box>
            <TopRow>
                <Copyright>
                    <FormattedMessage
                        id="test"
                        defaultMessage={`${currentYear} © Mikroelectron. ALL Rights Reserved.`}
                    />
                </Copyright>
                <SocialIcons>
                    <a href={`tel:+${social?.call}`} title="Call">
                        <IconButton>
                            <Phone style={{color: '#55795d'}}/>
                        </IconButton>
                    </a>
                    <a href={`${social?.location}`} target="_blank" title="Location">
                        <IconButton>
                            <Room style={{color: '#e74c3c'}}/>
                        </IconButton>
                    </a>
                    <a href={`mailto:${social?.email}`} target="_blank" title="Email">
                        <IconButton>
                            <Mail style={{color: '#e74c3c'}}/>
                        </IconButton>
                    </a>
                    <a href={`${social?.facebook}`} target="_blank" title="Facebook">
                        <IconButton>
                            <Facebook style={{color: '#4867aa'}}/>
                        </IconButton>
                    </a>
                    <a href={`${social?.instagram}`} target="_blank" title="Instagram">
                        <IconButton>
                            <Instagram style={{color: '#8a3ab9'}}/>
                        </IconButton>
                    </a>
                    <a href={`${social?.telegram}`} target="_blank" title="Telegram">
                        <IconButton>
                            <Telegram style={{color: '#0088cc'}}/>
                        </IconButton>
                    </a>
                    <a href={`${social?.youtube}`} target="_blank" title="YouTube">
                        <IconButton>
                            <YouTube style={{color: '#FF0000'}}/>
                        </IconButton>
                    </a>
                    <a href={`https://wa.me/${social?.whatsapp}`} target="_blank" title="WhatsApp">
                        <IconButton>
                            <WhatsApp style={{color: '#1ad03f'}}/>
                        </IconButton>
                    </a>
                </SocialIcons>


            </TopRow>

            <LocationWrapper style={{width: '100vw', marginLeft: 'calc(-50vw + 50%)'}}>
                <a href={`${social?.location}`} target="_blank" title="Show Location">
                    <img
                        src={LocationImage}
                        alt="Location"
                        style={{
                            width: '100%',
                            maxWidth: '100vw',
                            display: 'block',
                            padding: '0 !important',
                            margin: '0 !important',
                        }}
                    />
                </a>
                <span>AMMAN, Jordan. University Street, Khalifa Building 3rd floor</span>
            </LocationWrapper>
        </Box>
    );
};

export default Footer;
