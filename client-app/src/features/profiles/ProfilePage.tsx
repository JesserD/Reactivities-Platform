import { VStack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';

const ProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const { profileStore } = useStore();
    const { loadingProfile, loadProfile, profile, setActiveTab } = profileStore;

    useEffect(() => {
        loadProfile(username);
        return () => { setActiveTab(0); };
    }, [loadProfile, username, setActiveTab]);

    if (loadingProfile) return <LoadingComponent message='Loading profile' />;

    return (
        <VStack gap={20} maxW={'80em'} my={10} mx='auto' >
            {profile && <>
                <ProfileHeader profile={profile} />
                <ProfileContent profile={profile} />
            </>
            }
        </VStack>
    );
};

export default observer(ProfilePage);