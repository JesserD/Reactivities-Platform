import { Heading, Avatar, Flex, Text, HStack, VStack, Icon, Button, Spacer, Badge, Box, Link as ChakraLink } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Activity } from '../../../app/models/Activity';
import { HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ActivityCardAtendee from './ActivityCardAtendee';
import { AiOutlineUser } from 'react-icons/ai';

interface Props {
    activity: Activity;
}

const ActivityCard = ({ activity }: Props) => {

    return (
            <VStack borderBottom='1px solid pink' rounded='lg' display='block' p={3}
            >
                {activity.isCancelled &&
                    <Box p={1} color='white' bg='red.600' textAlign='center' fontSize='xs'>
                        Cancelled
                    </Box>
                }
                <HStack>
                    <Avatar size='lg' bg='red.400' src={activity.host?.image} icon={<AiOutlineUser fontSize='2rem' />} />
                    
                    <VStack align='left'>
                        <Heading as='h3' fontSize={'1xl'} fontFamily={'body'}>{activity.title}</Heading>
                        <Text>Hosted by <ChakraLink color='blue' as={Link} to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</ChakraLink></Text>
                        {activity.isHost && (
                            <Badge variant='outline' colorScheme='messenger'>
                                You are hosting this activity
                            </Badge>
                        )}
                        {activity.isGoing && !activity.isHost && (
                            <Badge variant='outline' colorScheme='green'>
                                You are going to this activity
                            </Badge>
                        )}
                    </VStack>
                </HStack>

                <HStack gap={1} mt={1}>
                    <CalendarIcon />
                    <Text>{format(activity.date!, 'dd MMM yyyy h:mm aa')}</Text>
                    <Icon as={HiLocationMarker} />
                    <Text >{activity.city}, {activity.venue}</Text>
                </HStack>

                <Flex p={2} bg='pink' >
                    <ActivityCardAtendee attendees={activity.attendees!} />
                </Flex>

                <Flex mt='2'>
                    <Text>{activity.description}</Text>
                    <Spacer />
                    <Button width={'40%'} float='right' fontSize={'sm'} bg='red.400' rounded={'full'} _focus={{ bg: 'gray', }}
                        as={Link} to={`/activities/${activity.id}`} border='2px solid black'
                    >View
                    </Button>
                </Flex>
            </VStack>
    );
};

export default observer(ActivityCard);