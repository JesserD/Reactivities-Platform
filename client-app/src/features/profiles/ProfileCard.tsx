import { Flex, Image, Divider, Text, Box, HStack, Icon, Spacer } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Profile } from '../../app/models/profile';
import FollowButton from './FollowButton';

interface Props {
    profile: Profile;
}

const ProfileCard = ({ profile }: Props) => {

    const truncate = (str: string | undefined) => {
        if (str) return str.length > 40 ? str.substring(0, 37) + '...' : str;
    };

    return (
        <Flex as={Link} to={`/profiles/${profile.username}`} direction='column' border='2px solid pink' maxW='12em' >
            <Image src={profile.image || '/assets/user.png'} />
            <Divider />
            <Box p={3}>
                <Text fontWeight='bold' mb={1}>{profile.displayName}</Text>
                <Text fontSize='sm'>{truncate(profile.bio)}</Text>
            </Box>
            <Spacer/>
            <Divider />
            <HStack p={2} >
                <Icon as={AiOutlineUser} />
                <Text>{profile.followersCount} followers</Text>
            </HStack>
            <Divider />
            <FollowButton profile={profile} />
        </Flex>
    );
};

export default observer(ProfileCard);