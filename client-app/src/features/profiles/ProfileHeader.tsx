import { Avatar, Divider, Flex, Heading, Spacer, Stat, StatGroup, StatLabel, StatNumber, VStack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Profile } from '../../app/models/profile';
import FollowButton from './FollowButton';


interface Props {
    profile: Profile;
}


const ProfileHeader = ({ profile }: Props) => {

    if (!profile) return <></>;
    return (
        <Flex direction={{ base: 'column', md: 'row' }} alignItems='center' gap={4}
            p={6} boxShadow={'2xl'} width={'100%'} border='1px solid pink'
        >
            {
                profile.image ? <Avatar size='2xl' bg='red.400' src={profile.image} />
                    : <Avatar size='2xl' bg='red.400' icon={<AiOutlineUser fontSize='2rem' />} />
            }
            <Heading as='h1'>{profile.displayName}</Heading>

            <Spacer />
            <VStack gap={3} maxW='200px'  >
                <StatGroup gap={4} textAlign='center'>
                    <Stat>
                        <StatNumber fontSize='4xl'>{profile.followersCount}</StatNumber>
                        <StatLabel>Followers</StatLabel>
                    </Stat>
                    <Stat>
                        <StatNumber fontSize='4xl'>{profile.followingCount}</StatNumber>
                        <StatLabel>Following</StatLabel>
                    </Stat>
                </StatGroup>
                <Divider />
                <FollowButton profile={profile}/>
            </VStack>
        </Flex>
    );
};

export default observer(ProfileHeader);