import React, { useEffect } from 'react';
import { useStore } from '../../../app/stores/store';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';
import { observer } from 'mobx-react-lite';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import { SimpleGrid, VStack } from '@chakra-ui/react';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';


const ActivityDetails = () => {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity } = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadActivity(id);
        return () => clearSelectedActivity();
    }, [id, loadActivity, clearSelectedActivity]);

    if (loadingInitial || !activity) return <LoadingComponent message={'Loading activity'} />;
    return (
        <SimpleGrid maxW='70em' columns={{ base: 1, xl: 2 }} gap={5} my={10} mx='auto'>
            <VStack maxW='35em' gap={4}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat activityId={activity.id}/>
            </VStack>
            <ActivityDetailedSidebar activity={activity} />
        </SimpleGrid>
    );
};

export default observer(ActivityDetails);