import React, {useContext, useEffect} from 'react';
import {SEO} from "../components/seo";
import {PageWrapper} from "../features/user-profile/user-profile.style";
import { Modal } from 'components/modal/modal-provider';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    CssBaseline,
    FormControl,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {useAppDispatch} from "../contexts/app/app.provider";
import useTranslation from "../utils/use-translation";
import {AuthContext} from "../contexts/auth/auth.context";
import useAuth from "../data/use-auth";
import {useRouter} from "next/router";
import {FormattedMessage} from "react-intl";
import { Alert } from '@mui/material';
import useUser from "../data/use-user";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function PasswordReset()
{
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const router = useRouter();
    const { passwordReset } = useAuth();
    const { user, loading } = useUser();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [router.query, user]);


    const onSubmit = async (e) => {
        e.preventDefault();
        const token = router.query.token;
        try {
            dispatch({ type: 'SET_LOADING', payload: true })
            await passwordReset({ email, password, password_confirmation: passwordConfirmation, token });
            setSuccess(true)
        } catch (e) {
        }
        dispatch({ type: 'SET_LOADING', payload: false })
    };

    const classes = useStyles();


    return (
        <>
            <SEO title="Password Reset" description="Password Reset"/>
            <Modal>
                {
                    !loading &&
                    <PageWrapper>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Typography component="h1" variant="h5" align='center'>
                                            Password Reset
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

                                                <FormControl fullWidth variant="outlined">
                                                    <TextField
                                                        label={t('emailAddressPlaceholder')}
                                                        variant="outlined"
                                                        margin="normal"
                                                        value={email}
                                                        onChange={e => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </FormControl>

                                                <FormControl fullWidth variant="outlined">
                                                    <TextField
                                                        label={t('passwordPlaceholder')}
                                                        variant="outlined"
                                                        margin="normal"
                                                        value={password}
                                                        type='password'
                                                        onChange={e => setPassword(e.target.value)}
                                                        required
                                                    />
                                                </FormControl>


                                                <FormControl fullWidth variant="outlined">
                                                    <TextField
                                                        label={t('passwordConfirmationPlaceholder', 'Password Confirmation')}
                                                        variant="outlined"
                                                        margin="normal"
                                                        value={passwordConfirmation}
                                                        type='password'
                                                        onChange={e => setPasswordConfirmation(e.target.value)}
                                                        required
                                                    />
                                                </FormControl>

                                                <Button
                                                    className={classes.submit}
                                                    disableElevation
                                                    fullWidth
                                                    variant='contained'
                                                    color='primary'
                                                    type='submit'
                                                >
                                                    <FormattedMessage id='continueBtn' defaultMessage='Continue'/>
                                                </Button>

                                            </form>
                                        }
                                    </CardContent>
                                </Card>
                            </div>
                        </Container>
                    </PageWrapper>
                }
            </Modal>
        </>
    );
}
