import { Avatar, Flex, Heading, HStack, VStack, Text, Button, Badge, Box, Spacer } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { Activity } from '../../../app/models/Activity';

interface Props {
    activity: Activity;
}

const ActivityDetailedSidebar = ({ activity: { attendees, host } }: Props) => {

    if (!attendees) return null;
    return (
        <VStack maxW='20em' gap={'3em'} rounded={'lg'} boxShadow={'2xl'}
            display='block' 
            h='fit-content'
        >
            <Flex bg='pink' p={3} justifyContent='center' rounded={'lg'}>
                <Heading as='h2' color='black' fontSize={'md'} fontFamily={'body'}>
                    {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
                </Heading>
            </Flex>

            {attendees.map((attendee, i) => (
                <Box key={attendee.username} p={2}>
                    <HStack pl={2} paddingBottom={2} mt={i > 0 ? '-2' : ''}
                        borderBottom={attendees.length - 1 === i ? '' : '1px solid pink'}
                    > 
                        <Avatar size='lg'
                            src={attendee.image} bg={'red.400'}
                            icon={<AiOutlineUser fontSize='2rem' />}
                            as={Link} to={`/profiles/${attendee.username}`} />

                        <VStack alignItems={'left'}>
                            <Heading as='h3' fontSize={'1xl'} fontFamily={'body'}>
                                <Button borderWidth='2px'
                                    borderColor='black'
                                    color='black' bg='red.300'
                                    as={Link} to={`/profiles/${attendee.username}`}>
                                    {attendee.displayName}
                                </Button>
                            </Heading>
                            {attendee.following && <Text color='green'>Following</Text>}
                        </VStack>
                        {attendee.username === host?.username && <>
                            <Spacer />
                            <Badge variant='outline' colorScheme='messenger'>Host</Badge>
                        </>}
                    </HStack>

                </Box>
            ))}

        </VStack >
    );
};

export default observer(ActivityDetailedSidebar);

