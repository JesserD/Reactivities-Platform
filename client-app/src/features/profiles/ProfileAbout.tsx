import React from 'react';
import ProfileEditForm from './ProfileEditForm';
import { Text } from '@chakra-ui/react';
import { Profile } from '../../app/models/profile';

interface Props {
    profile: Profile;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
}

const ProfileAbout = ({ profile, editMode, setEditMode }: Props) => {
    if (editMode) return (<ProfileEditForm setEditMode={setEditMode} />);
    else return (<Text whiteSpace='pre-wrap'>{profile.bio}</Text>);
};

export default ProfileAbout;