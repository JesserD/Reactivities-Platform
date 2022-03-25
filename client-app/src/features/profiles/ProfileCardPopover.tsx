import { Image, HStack, VStack, Icon, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, Portal, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Profile } from '../../app/models/profile';
import FollowButton from './FollowButton';


interface Props {
    profile: Profile;
}

const ProfileCardPopover = ({ profile }: Props) => {
    const truncate = (str: string | undefined) => {
        if (str) return str.length > 40 ? str.substring(0, 37) + '...' : str;
    };

    return (
        <Portal>
            <Link to={`/profiles/${profile.username}`}>
                <PopoverContent>
                    <PopoverHeader>
                        <Image src={profile.image || '/assets/user.png'} />
                    </PopoverHeader>
                    <PopoverBody >
                        <VStack gap={2} alignItems='left'>
                            <Text fontWeight='bold'>{profile.displayName}</Text>
                            <Text>{truncate(profile.bio)}</Text>
                        </VStack>
                    </PopoverBody>
                    <PopoverFooter>
                        <HStack >
                            <Icon as={AiOutlineUser} />
                            <Text>{profile.followersCount} followers</Text>
                        </HStack>
                        <FollowButton profile={profile} />
                    </PopoverFooter>
                </PopoverContent>
            </Link>
        </Portal >
    );
};

export default observer(ProfileCardPopover);