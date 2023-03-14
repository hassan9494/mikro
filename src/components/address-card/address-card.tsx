import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form } from 'formik';
import { closeModal } from '@redq/reuse-modal';
import { ProfileContext } from 'contexts/profile/profile.context';
import { FormattedMessage } from 'react-intl';
import { FormControl, makeStyles, TextField, Typography, Button, Box } from "@material-ui/core";
import useTranslation from "../../utils/use-translation";
import { api } from 'data/use-address';
import useCities from "../../data/use-city";
import { Autocomplete } from "@material-ui/lab";
import {useAppDispatch} from "../../contexts/app/app.provider";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginBottom: theme.spacing(2),
    },
}));
// Shape of form values
interface FormValues {
    id?: number | null;
    name?: string;
    email?: string;
    phone?: string;
    content?: string;
    is_primary?: boolean;
    city_id?: string,
}

// The type of props MyForm receives
interface MyFormProps {
    item?: any | null;
}

// Wrap our form with the using withFormik HoC
const FormEnhancer = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: (props) => {
        return {
            id: props.item.id || null,
            name: props.item.name ||null,
            email: props.item.email || '',
            phone: props.item.phone || '',
            content: props.item.content || '',
            city_id: props.item.city_id || null,
        };
    },
    validationSchema: Yup.object().shape({
        // name: Yup.string().required('Title is required!'),
        // sdasd: Yup.string().required('Title is required!'),
        // email: Yup.string().required('Title is required!'),
        // phone: Yup.string().required('Title is required!'),
        // content: Yup.string().required('Title is required!'),
    }),
    handleSubmit: (values) => {
        // do submitting things
    },
});

const UpdateAddress = (props: FormikProps<FormValues> & MyFormProps) => {
    const {
        isValid,
        item,
        values,
        touched,
        errors,
        dirty,
        handleChange,
        setFieldValue,
        handleBlur,
        handleReset,
        isSubmitting,
    } = props;

    const addressValue = {
        id: values.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        content: values.content,
        isPrimary: values.is_primary,
        city_id: values.city_id,
    };

    const classes = useStyles();

    const [city, setCity] = useState(null)
    const dispatch = useAppDispatch();

    const { t } = useTranslation();
    const { data: cities } = useCities()
    const handleSubmit = async () => {
        if (isValid) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true })
                if (addressValue.id) {
                    await api.update(addressValue.id, addressValue);
                } else {
                    await api.create(addressValue);
                }
                closeModal();
            } catch (e) {

            }
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    };

    useEffect(() => {
        if (values.id) {
            setCity(cities.filter(e => e.id == values.city_id)[0] ?? null)
        }
    }, [cities])

    return (
        <Form>
            <Typography variant='h5' style={{marginBottom: 16}}>
                {item && item.id ? 'Edit Address' : 'Add New Address'}
            </Typography>

            <Box display='flex'>
                <FormControl fullWidth variant="outlined" className={classes.margin}>
                    <TextField
                        label={t('countryPlaceholder')}
                        variant="outlined"
                        fullWidth
                        disabled={true}
                        value={t('countryJordan')}
                    />
                </FormControl>
                <Box marginX={1} />
                <FormControl fullWidth variant="outlined" className={classes.margin} >
                    <Autocomplete
                        value={city}
                        options={cities.map(e => ({ id: e.id, name: e.name }))}
                        getOptionLabel={(e) => e.name}
                        onChange={(event, newValue) => {
                            setFieldValue('city_id', newValue?.id)
                            setCity(newValue)
                        }}
                        renderInput={
                            params => <TextField
                                id={'city_id'}
                                label={t('cityPlaceholder')}
                                required
                                variant='outlined'
                                {...params}
                                autoComplete={'off'}
                                inputProps={{
                                    ...params.inputProps,
                                    autocomplete: 'off',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                            />
                        }
                        disablePortal
                    />
                </FormControl>
            </Box>
            <FormControl fullWidth variant="outlined" className={classes.margin}>
                <TextField
                    id={'name'}
                    label={t('namePlaceholder')}
                    variant="outlined"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                />
            </FormControl>

            <FormControl fullWidth variant="outlined" className={classes.margin}>
                <TextField
                    id={'email'}
                    label={t('emailAddressPlaceholder')}
                    variant="outlined"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined" className={classes.margin}>
                <TextField
                    id={'phone'}
                    label={t('phonePlaceholder')}
                    variant="outlined"
                    fullWidth
                    value={values.phone}
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined" className={classes.margin}>
                <TextField
                    id={'content'}
                    label={t('addressPlaceholder')}
                    variant="outlined"
                    fullWidth
                    value={values.content}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    onBlur={handleBlur}
                />
            </FormControl>
            <Button
                onClick={handleSubmit}
                type="submit"
                color='secondary'
                variant='contained'
                fullWidth
            >
                <FormattedMessage id="savedAddressId" defaultMessage="Save Address"/>
            </Button>
        </Form>
    );

};

export default FormEnhancer(UpdateAddress);
