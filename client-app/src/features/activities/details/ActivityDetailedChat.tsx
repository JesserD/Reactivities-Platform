import { Formik, Form, Field, FieldProps } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { formatDistanceToNow } from 'date-fns';
import { Box, CircularProgress, Flex, FormControl, Heading, Image, Textarea, VStack, HStack, chakra } from '@chakra-ui/react';


interface Props {
    activityId: string;
}

const ActivityDetailedChat = ({ activityId }: Props) => {
    const { commentStore } = useStore();

    useEffect(() => {
        if (activityId) commentStore.createHubConnection(activityId);
        return () => commentStore.clearComments();
    }, [commentStore, activityId]);
    return (

        <VStack rounded='lg' boxShadow='2xl' width='full' mx='auto'>

            <Flex bg='pink' p={3} justifyContent='center' rounded={'lg'} w='full'>
                <Heading as='h2' color='black' fontSize={'md'} fontFamily={'body'} >
                    Chat about this event
                </Heading>
            </Flex>


            <Formik
                onSubmit={(values, { resetForm }) =>
                    commentStore.addComment(values).then(() => resetForm())}
                initialValues={{ body: '' }}
                validationSchema={Yup.object({
                    body: Yup.string().required()
                })}
            >
                {({ isSubmitting, isValid, handleSubmit }) => (
                    <FormControl>
                        <Form>
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <Box p={3}>
                                        <CircularProgress isIndeterminate color='pink' hidden={!isSubmitting} />
                                        <Textarea
                                            placeholder='Enter your comment (Enter to submit, SHIFT + enter for new line)'
                                            rows={2} {...props.field}
                                            onKeyPress={e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </Box>
                                )}
                            </Field>
                        </Form>
                    </FormControl>
                )}
            </Formik>
            <VStack>
            </VStack>

            <Flex direction='column' w='full' gap={3}>
                {commentStore.comments.map(comment =>
                    <HStack key={comment.id} alignItems='start' p={3} >
                        <Image boxSize='10' src={comment.image || '/assets/user.png'} />

                        <chakra.p as={Link} to={`/profiles/${comment.username}`} fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={15}>
                            {comment.displayName}
                        </chakra.p>

                        <chakra.p fontFamily={'Inter'} fontWeight={'medium'} color={'gray.500'}>
                            {formatDistanceToNow(comment.createdAt)} ago
                        </chakra.p>

                        <chakra.p fontWeight='medium' fontSize='15px' whiteSpace='pre-wrap'>
                            {comment.body}
                        </chakra.p>
                    </HStack>
                )
                }
            </Flex >
        </VStack >

    );
};

export default observer(ActivityDetailedChat);