import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import ActivityCard from './ActivityCard';

const ActivityList = () => {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

    return (
        <Box maxW='35em' p={4}>
            {groupedActivities.map(([group, activities]) => (
                <List width='100%' boxShadow={'2xl'} key={group}>
                    <Heading marginTop={5} fontSize={'1xl'} color={'red.400'} fontFamily={'heading'}>{group}</Heading>
                    {activities.map(activity => (
                        <ListItem  key={activity.id}>
                            <ActivityCard activity={activity} />
                        </ListItem>
                    ))}
                </List>
            ))}
        </Box>
    );
};

export default observer(ActivityList);