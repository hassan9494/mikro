import styled from 'styled-components';
import css from '@styled-system/css';
import { FormattedMessage } from 'react-intl';
import {IconButton} from "@material-ui/core";
import {Facebook, Instagram, Mail, Room, Telegram, WhatsApp, YouTube} from "@material-ui/icons";

const Box = styled.div(
    css({

        fontFamily: 'body',
        fontSize: 'sm',
        fontWeight: 'regular',
        color: 'text.regular',
        padding: '30px',
        minHeight: '70px',
        a: {
            color: 'primary.regular',
        },
        '@media (max-width: 800px)': {
            flexDirection: 'column',
            paddingBottom: '0px',
            justifyContent: 'space-between',

        },
    }),
    {

        background: '#fff',
        borderTop: '1px solid #f2f2f2',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
);

const Copyright = styled.div(
    css({
        flexGrow: '1',
        '@media (max-width: 800px)': {
            marginY: '20px',
        },
    }),
);

const Footer = () => {
    return (
        <Box>
            <Copyright>
                <FormattedMessage
                    id='siteFooter'
                    defaultMessage='PickBazar is a product of'
                />
                <p>
                    AMMAN, Jordan. University Street, Khalifa Building 3rd floor
                </p>
            </Copyright>
            <p>
                <a href='https://www.google.com/maps/place/32.015643,35.867292' target='_blank'>
                    <IconButton>
                            <Room style={{color: '#e74c3c'}}/>
                    </IconButton>
                </a>
                <a href='https://www.google.com/maps/place/32.015643,35.867292' target='_blank'>
                    <IconButton>
                        <Mail style={{color: '#e74c3c'}}/>
                    </IconButton>
                </a>
                <a href='https://www.facebook.com/Mikroelectron' target='_blank'>
                    <IconButton>
                        <Facebook  style={{color: '#4867aa'}}/>
                    </IconButton>
                </a>
                <a href='https://www.facebook.com/Mikroelectron' target='_blank'>
                    <IconButton>
                        <Instagram  style={{color: '#8a3ab9'}}/>
                    </IconButton>
                </a>
                <a href='https://www.facebook.com/Mikroelectron' target='_blank'>
                    <IconButton>
                        <Telegram  style={{color: '#0088cc'}}/>
                    </IconButton>
                </a>
                <a href='https://www.youtube.com/channel/UCaDg6xg1a2Zbiee8qo8KvFw' target='_blank'>
                    <IconButton>
                        <YouTube  style={{color: '#FF0000'}}/>
                    </IconButton>
                </a>
                <a href='https://wa.me/962790062196' target='_blank'>
                    <IconButton>
                        <WhatsApp  style={{color: '#1ad03f'}}/>
                    </IconButton>
                </a>
            </p>
            {/*<p>Crafted By IKoujar</p>*/}
        </Box>
    );
};
export default Footer;
