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
import {useAppDispatch} from "../../contexts/app/app.provider";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginBottom: theme.spacing(2),
    },
}));

export default function ForgotPasswordModal()
{
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const { t } = useTranslation();
    const { authDispatch } = useContext<any>(AuthContext);
    const { forgotPassword } = useAuth();

    const [email, setEmail] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const toggleSignInForm = () => authDispatch({ type: 'SIGNIN' });

    const onSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false)
        try {
            dispatch({ type: 'SET_LOADING', payload: true })
            await forgotPassword({ email });
            setSuccess(true)
        } catch (e) {
        }
        dispatch({ type: 'SET_LOADING', payload: false })
    };

    return (
        <Box textAlign='center' p={3} bgcolor='white'>

            <Typography variant='h5' color='primary'>
                <FormattedMessage
                    id='forgotPassText'
                    defaultMessage='Forgot Password'
                />
            </Typography>

            {
                success &&
                <Box paddingY={2}>
                    <Alert severity='success' icon={false}>
                        <FormattedMessage
                            id='msgResetPasswordEmailSent'
                        />
                    </Alert>
                </Box>
            }

            {
                !success &&
                <form onSubmit={onSubmit}>


                    <Typography className={classes.margin}>
                        <FormattedMessage
                            id='sendResetPassText'
                            defaultMessage="We'll send you a link to reset your password"
                        />
                    </Typography>

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

                    <Button
                        disableElevation
                        fullWidth
                        variant='contained'
                        color='primary'
                        type='submit'
                    >
                        <FormattedMessage
                            id='resetPasswordBtn'
                            defaultMessage='Reset Password'
                        />
                    </Button>

                </form>
            }

            <Box m={2}>
                <FormattedMessage id='backToSign' defaultMessage='Back to'/>
                {' '}
                <Link href="#"  onClick={toggleSignInForm}>
                    <FormattedMessage id='loginBtnText' defaultMessage='Login'/>
                </Link>
            </Box>

        </Box>
    );
}
