import { HStack, Icon, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaInfo } from 'react-icons/fa';
import { BsCalendarFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { Activity } from '../../../app/models/Activity';
import { format } from 'date-fns';

interface Props {
    activity: Activity;
}



const ActivityDetailedInfo = ({ activity }: Props) => {


    return (
        <VStack gap={'3em'} rounded={'lg'} mx={'auto'} boxShadow={'2xl'}
            display='block' width={'100%'} border='1px solid pink'
        >
            <HStack borderBottom='1px solid pink' gap={3} p={3}>
                <Icon color='pink' as={FaInfo} />
                <Text>{activity.description}</Text>
            </HStack>

            <HStack borderBottom='1px solid pink' gap={3} p={3}>
                <Icon color='pink' as={BsCalendarFill} />
                <Text>{format(activity.date!, 'dd MMM yyyy h:mm aa')}</Text>
            </HStack >

            <HStack gap={3} p={3}>
                <Icon color='pink' as={MdLocationOn} />
                <Text>{activity.venue}, {activity.city}</Text>
            </HStack>

        </VStack>
    );
};

export default ActivityDetailedInfo;