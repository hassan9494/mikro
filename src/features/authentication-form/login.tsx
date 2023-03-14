import React, { useContext } from 'react';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage } from 'react-intl';
import useAuth from 'data/use-auth';
import {
    Box,
    Button,
    FormControl,
    Link,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import useTranslation from "../../utils/use-translation";
import { closeModal } from '@redq/reuse-modal';
import {toast} from "react-toastify";
import {useAppDispatch} from "../../contexts/app/app.provider";
import Router from 'next/router';

const useStyles = makeStyles((theme) => ({
    margin: {
        marginBottom: theme.spacing(2),
    },
}));

export default function SignInModal()
{
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const { t } = useTranslation();
    const { authDispatch } = useContext<any>(AuthContext);
    const { login } = useAuth();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const toggleSignUpForm = () => authDispatch({
        type: 'SIGNUP',
    });

    const toggleForgotPassForm = () => authDispatch({
        type: 'FORGOTPASS',
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'SET_LOADING', payload: true })
            await login({ email, password });
            authDispatch({ type: 'SIGNIN_SUCCESS' });
            closeModal();
            Router.reload();
        } catch (e) {
        }
        dispatch({ type: 'SET_LOADING', payload: false })
    };

    return (
        <Box textAlign='center' p={3} bgcolor='white'>

            <Typography variant='h5' color='primary'>
                <FormattedMessage id='welcomeBack' defaultMessage='Welcome Back'/>
            </Typography>

            <Typography className={classes.margin}>
                <FormattedMessage id='loginText' defaultMessage='Login with your email &amp; password' />
            </Typography>

            <form onSubmit={onSubmit}>

                <FormControl fullWidth variant="outlined" className={classes.margin}>
                    <TextField
                        label={t('emailAddressPlaceholder')}
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </FormControl>

                <FormControl fullWidth variant="outlined" className={classes.margin}>
                    <TextField
                        label={t('passwordPlaceholder')}
                        variant="outlined"
                        fullWidth
                        value={password}
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </FormControl>

                <Button
                    disableElevation
                    fullWidth
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    <FormattedMessage id='continueBtn' defaultMessage='Continue'/>
                </Button>

            </form>

            <Box m={2}>
                <FormattedMessage
                    id='dontHaveAccount'
                    defaultMessage="Don't have any account?"
                />
                {' '}
                <Link href="#"  onClick={toggleSignUpForm}>
                    <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up'/>
                </Link>
            </Box>

            <Box p={2} bgcolor='#F7F7F7'>
                <FormattedMessage
                    id='forgotPasswordText'
                    defaultMessage='Forgot your password?'
                />
                {' '}
                <Link href="#"  onClick={toggleForgotPassForm}>
                    <FormattedMessage id='resetText' defaultMessage='Reset It'/>
                </Link>
            </Box>

        </Box>
    );
}
