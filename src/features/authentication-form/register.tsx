import React, { useContext } from 'react';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage } from 'react-intl';
import useAuth from 'data/use-auth';
import { Box, Button, FormControl, Link, TextField, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {
    HelperText,
} from './authentication-form.style';

import useTranslation from "../../utils/use-translation";
import { closeModal } from 'components/modal/modal-provider';
import {useAppDispatch} from "../../contexts/app/app.provider";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginBottom: theme.spacing(2),
    },
}));

export default function SignUpModal()
{
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const { t } = useTranslation();
    const { authDispatch } = useContext<any>(AuthContext);
    const { register } = useAuth();

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

    const toggleSignInForm = () => authDispatch({ type: 'SIGNIN' });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'SET_LOADING', payload: true })
            await register({ name, email, password, password_confirmation: passwordConfirmation });
            authDispatch({ type: 'SIGNIN_SUCCESS' });
            closeModal();
        } catch (e) {
        }
        dispatch({ type: 'SET_LOADING', payload: false })
    };

    return (
        <Box textAlign='center' p={3} bgcolor='white'>
            <Typography variant='h5' color='primary'>
                <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up'/>
            </Typography>

            <Typography className={classes.margin}>
                <FormattedMessage
                    id='signUpText'
                    defaultMessage='Every fill is required in sign up'
                />
            </Typography>

            <form onSubmit={onSubmit}>

                <FormControl fullWidth variant="outlined" className={classes.margin}>
                    <TextField
                        label={t('namePlaceholder')}
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </FormControl>

                <FormControl fullWidth variant="outlined" className={classes.margin}>
                    <TextField
                        type='email'
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
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </FormControl>

                <FormControl fullWidth variant="outlined" className={classes.margin}>
                    <TextField
                        label={t('passwordConfirmationPlaceholder', 'Password Confirmation')}
                        variant="outlined"
                        fullWidth
                        type='password'
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        required
                    />
                </FormControl>

                <HelperText style={{ padding: '20px 0 30px' }}>
                    <FormattedMessage
                        id='signUpText'
                        defaultMessage="By signing up, you agree to Mikroelectron's"
                    />
                    &nbsp;
                    <Link href='/'>
                        <FormattedMessage
                            id='termsConditionText'
                            defaultMessage='Terms &amp; Condition'
                        />
                    </Link>
                </HelperText>

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
                    id='alreadyHaveAccount'
                    defaultMessage='Already have an account?'
                />
                {' '}
                <Link href="#"  onClick={toggleSignInForm}>
                    <FormattedMessage id='loginBtnText' defaultMessage='Login'/>
                </Link>
            </Box>

        </Box>
    );
}
