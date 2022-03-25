import React from 'react';
import { observer } from 'mobx-react-lite';
import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';
import { Alert, AlertIcon, AlertTitle, Button, Flex, HStack, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';



const activityImageStyle = {
    filter: 'brightness(30%)'
};

interface Props {
    activity: Activity
}


const ActivityDetailedHeader = ({ activity }: Props) => {
    const { activityStore: { updateAttendance, loading, cancelActivityToggle } } = useStore();
    return (
        <VStack rounded={'lg'} boxShadow={'2xl'} display='block' >
            {activity.isCancelled &&
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle mr={2}>Cancelled</AlertTitle>
                </Alert>
            }
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} style={activityImageStyle} />
                <Flex borderBottom='1px solid pink' color='black' justifyContent='center'>
                    <Text p={2} fontWeight='bold' >{activity.title}</Text>
                    <Text p={2} fontWeight='bold'>{format(activity.date!, 'dd MMM yyyy')}</Text>
                    <Text p={2} fontWeight='bold'>
                        Hosted by <strong><Link style={{color:'ThreeDDarkShadow'}} to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                    </Text>
                </Flex>

            <HStack p={2}>
                {activity.isHost ? (
                    <>
                        <Button
                            color={activity.isCancelled ? 'green' : 'red'}
                            float='left'
                            onClick={cancelActivityToggle}
                            variant='outline'
                            isLoading={loading}
                        >{activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}</Button>
                        <Spacer/>
                        <Button as={Link}
                            disabled={activity.isCancelled}
                            to={`/manage/${activity.id}`}
                            variant='outline'
                            colorScheme='messenger'
                            alignSelf='right'>
                            Manage Event
                        </Button>
                    </>
                ) : activity.isGoing ? (
                    <Button variant='outline' color='red'
                     isLoading={loading} onClick={updateAttendance}>Cancel attendance</Button>
                ) : (
                    <Button disabled={activity.isCancelled}
                        isLoading={loading} onClick={updateAttendance} bg='red.400' color='black' variant='solid'>
                        Join Activity
                    </Button>
                )}
            </HStack>
        </VStack>
    );
};

export default observer(ActivityDetailedHeader);