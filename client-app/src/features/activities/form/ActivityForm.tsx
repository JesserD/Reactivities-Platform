import { Box, Center, Stack, Button, Input, Heading, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useHistory, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { ActivityFormValues } from '../../../app/models/Activity';

const ActivityForm = () => {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)));
    }, [id, loadActivity]);

    const handleFormSubmit = (activity: ActivityFormValues) => {
        if (!activity.id) {
            let newActivity = { ...activity, id: uuid() };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    };

    const handleCancel = () => {
        if (id) history.push(`/activities/${id}`);
        else history.push('/activities');
    };

    if (loadingInitial) return (<LoadingComponent message='Loading form' />);

    return (
        <Center maxW={'50em'} w={'full'} py={12} mx='auto'>
            <Box p={6} w={'full'} boxShadow={'2xl'} rounded={'lg'}>
                <Stack pt={10} align={'left'}>
                    <Heading as='h2' fontSize={'1xl'} color='red.300'>Activity Details</Heading>
                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize initialValues={activity}
                        onSubmit={(values) => handleFormSubmit(values)}>
                        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                            <Form style={{ width: '100%' }} onSubmit={handleSubmit} autoComplete='off'>
                                <VStack align={'left'}>
                                    <MyTextInput name='title' placeholder='Title' />
                                    <MyTextArea rows={3} placeholder='Description' name='description' />
                                    <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                                    <Input placeholderText='Date' as={MyDateInput} name='date' showTimeSelect timeCaption='time'
                                        isRequired dateFormat='MMMM d, yyyy h:mm aa' />
                                    <Heading as='h2' color='red.300' fontSize={'1xl'}>Location Details</Heading>
                                    <MyTextInput placeholder='City' name='city' />
                                    <MyTextInput placeholder='Venue' name='venue' />
                                </VStack>
                                <Stack mt={8} direction={'row'} spacing={2} alignContent='stretch' width='100%'>
                                    <Button colorScheme='blue' variant='outline' width='100%' fontSize={'sm'}
                                        onClick={handleCancel}
                                    >Cancel</Button>
                                    <Button colorScheme='red' variant='outline' width='100%' fontSize={'sm'}
                                        type='submit' isLoading={isSubmitting}
                                        //disabled={isSubmitting || !dirty || !isValid}
                                    >Submit</Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Stack>
            </Box>
        </Center >
    );
};

export default observer(ActivityForm);