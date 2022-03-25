import React from 'react';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import { Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import MyTextArea from '../../app/common/form/MyTextArea';
import MyTextInput from '../../app/common/form/MyTextInput';

interface Props {
    setEditMode: (editMode: boolean) => void;
}

const ProfileEditForm = ({ setEditMode }: Props) => {
    const { profileStore: { profile, updateProfile } } = useStore();
    return (
        <Formik initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
            onSubmit={values => { updateProfile(values).then(() => setEditMode(false)); }}
            validationSchema={Yup.object({ displayName: Yup.string().required() })}
        >
            {({ isSubmitting, isValid, dirty }) =>
                <Form className='ui form' autoComplete='off'>
                    <MyTextInput placeholder='Display Name' name='displayName' />
                    <MyTextArea rows={10} placeholder='Add your bio' name='bio' />
                    <Button _hover={{ bg: 'gray.300' }} mt={3} variant='soild' bg='red.400'
                        type='submit' isLoading={isSubmitting} float='right' disabled={!isValid || !dirty}>
                        Update profile
                    </Button>
                </Form>
            }
        </Formik>
    );
};

export default observer(ProfileEditForm);