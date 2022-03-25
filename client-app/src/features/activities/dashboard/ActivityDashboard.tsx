import React, { useEffect, useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import PlaceholderList from './PlaceholderList';



const ActivityDashboard = () => {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;
    const { setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    };

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities]);

    return (
        <SimpleGrid columns={[1, null, 2]} gap={20} maxW={'80em'} mt={10} mx='auto'>
            {activityStore.loadingInitial && !loadingNext ? (
                <PlaceholderList/>
            ) : (
                <InfiniteScroll pageStart={0} loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <ActivityList />
                    {loadingNext && <LoadingComponent message='' />}
                </InfiniteScroll>
            )}
            <ActivityFilters />
        </SimpleGrid>
    );
};

export default observer(ActivityDashboard);