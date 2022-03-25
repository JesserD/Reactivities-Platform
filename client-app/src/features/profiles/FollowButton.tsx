import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';

interface Props {
    profile: Profile;
}

const FollowButton = ({ profile }: Props) => {
    const { profileStore, userStore } = useStore();
    const { updateFollowing, loading } = profileStore;
    const [target, setTarget] = useState('');


    if (userStore.user?.username === profile.username) return null;

    const handleFollow = (e: SyntheticEvent, username: string) => {
        e.preventDefault();
        setTarget(e.currentTarget.getAttribute('name')!);
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    };

    return (
        <>
            {
                !profile.following && <Button
                    w='full' border={'2px solid black'} bg='red.300' color={'black'}
                    isLoading={target === profile.username && loading} name={profile.username}
                    onClick={(e) => handleFollow(e, profile.username)}
                >Follow</Button>
            }

            {
                profile.following && <Button w='full' variant='outline' colorScheme='red'
                    isLoading={target === profile.username && loading}
                    name={profile.username}
                    onClick={(e) => handleFollow(e, profile.username)}
                >Unfollow</Button>
            }
        </>
    );
};

export default observer(FollowButton);