import { Flex, Image, Divider, Text, Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { UserActivity } from '../../app/models/profile';

interface Props {
    activity: UserActivity;
}

const MiniActivityCard = ({ activity }: Props) => {


    return (
        <Flex as={Link} to={`/activities/${activity.id}`} direction='column' border='2px solid pink' maxW='12em' >
            <Image maxW='12em' h='8em' src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Divider />
            <Box p={3}>
                <Text fontWeight='bold' mb={1}>{activity.title}</Text>
                <Text fontSize='sm'>{format(new Date(activity.date), 'do LLL')}</Text>
            </Box>
        </Flex>
    );
};

export default observer(MiniActivityCard);