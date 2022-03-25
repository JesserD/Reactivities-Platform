import { Alert, AlertTitle, AlertIcon, Button, FormControl, FormErrorMessage, ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

const LoginForm = () => {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(error =>
                setErrors({ error: 'Invalid email or password' }))}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <ModalBody pb={6}>
                    <ModalHeader as='h2' fontSize='lg' color='red.300'>Login to Reactivites</ModalHeader>
                        <FormControl mt={4} isInvalid={errors.error ? true : false}>
                            <FormErrorMessage ><Alert status='error' >
                                <AlertIcon />
                                <AlertTitle mr={2}>{errors.error}</AlertTitle>
                            </Alert></FormErrorMessage>
                            <MyTextInput name='email' placeholder='Email' />
                            <MyTextInput name='password' placeholder='Password' type='password' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button isLoading={isSubmitting} bg='red.400' type='submit' >Login</Button>
                    </ModalFooter>
                </Form>
            )}
        </Formik>
    );
};

export default observer(LoginForm);