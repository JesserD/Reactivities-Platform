import { Box, Center, Heading, Text, Stack, Image, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import React, { useEffect } from 'react';
import { format } from 'date-fns';

const IMAGE = 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';


const ActivityDetailsCard = () => {

    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <LoadingComponent message='Loading activity' />;
    return (
        <Center py={12}>
            <Box style={{ position: 'sticky', top: '100px', zIndex: '1' }} alignSelf={'flex-start'} role={'group'} p={6} maxW={'330px'} w={'full'} bg={'white'} boxShadow={'2xl'} rounded={'lg'} pos={'relative'} zIndex={1}>
                <Box rounded={'lg'} mt={-12} pos={'relative'} height={'230px'} _after={{ transition: 'all .3s ease', content: '""', w: 'full', h: 'full', pos: 'absolute', top: 5, left: 0, backgroundImage: `url(${IMAGE})`, filter: 'blur(15px)', zIndex: -1, }} _groupHover={{ _after: { filter: 'blur(20px)', }, }}>
                    <Image src={`/assets/categoryImages/${activity.category}.jpg`} rounded={'lg'} height={230} width={282} objectFit={'cover'} />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}> {activity.title}</Heading>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>{format(activity.date!, 'dd MMM yyyy h:mm aa')}</Text>
                    <Text fontSize={'xl'}>{activity.description}</Text>
                    <Stack mt={8} direction={'row'} spacing={2} alignContent='stretch' width='100%'>
                        <Button as={Link} to={`/manage/${activity.id}`} colorScheme='blue' variant='outline' width='100%' fontSize={'sm'}
                        >Edit</Button>
                        <Button as={Link} to='/activities' colorScheme='red' variant='outline' width='100%' fontSize={'sm'}
                        >Cancel</Button>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
};

export default observer(ActivityDetailsCard);