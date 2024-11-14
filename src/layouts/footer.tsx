import styled from 'styled-components';
import css from '@styled-system/css';
import { FormattedMessage } from 'react-intl';
import {IconButton} from "@material-ui/core";
import {Facebook, Instagram, Mail, Phone, Room, Telegram, WhatsApp, YouTube} from "@material-ui/icons";
import NavLink from "../components/nav-link/nav-link";
import React from "react";

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
    const currentYear = new Date().getFullYear();

    return (
        <Box>
            <Copyright>
                <FormattedMessage
                    id='test'
                    defaultMessage={`${currentYear} © Mikroelectron. ALL Rights Reserved.`}
                />
                <p>
                    AMMAN, Jordan. University Street, Khalifa Building 3rd floor
                </p>
            </Copyright>
            <p>

                <a href='tel:+96265344772' title={'Call +96265344772'}>
                    <IconButton>
                        <Phone  style={{color: '#55795d'}}/>
                    </IconButton>
                </a>
                <a href='https://maps.app.goo.gl/PJGqCJnubZWaJqrSA' target='_blank' title={'Show Location'}>
                    <IconButton>
                            <Room style={{color: '#e74c3c'}}/>
                    </IconButton>
                </a>
                <a href='mailto:info@mikroelectron.com' target='_blank' title={'Send Email'}>
                    <IconButton>
                        <Mail style={{color: '#e74c3c'}}/>
                    </IconButton>
                </a>
                <a href='https://www.facebook.com/Mikroelectron' target='_blank' title={'Facebook Page'}>
                    <IconButton>
                        <Facebook  style={{color: '#4867aa'}}/>
                    </IconButton>
                </a>
                <a href='https://www.instagram.com/mikroelectron' target='_blank' title={'Instagram Page'}>
                    <IconButton>
                        <Instagram  style={{color: '#8a3ab9'}}/>
                    </IconButton>
                </a>
                <a href='https://t.me/mikroelectron' target='_blank' title={'Telegram'}>
                    <IconButton>
                        <Telegram  style={{color: '#0088cc'}}/>
                    </IconButton>
                </a>
                <a href='https://www.youtube.com/@mikroelectron8608' target='_blank' title={'Youtube Channel'}>
                    <IconButton>
                        <YouTube  style={{color: '#FF0000'}}/>
                    </IconButton>
                </a>
                <a href='https://wa.me/962790062196' target='_blank' title={'Whatsapp'}>
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
