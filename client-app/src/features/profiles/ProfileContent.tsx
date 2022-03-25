import { useMediaQuery, Tabs, TabList, Tab, Button, Flex, VStack, Image, TabPanel, TabPanels, Icon, Heading, Spacer, HStack, Box, Center } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState, useEffect, useMemo } from 'react';
import { BsCardImage } from 'react-icons/bs';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';
import { Photo, Profile, UserActivity } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillCalendar } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import ProfileAbout from './ProfileAbout';
import ProfileCard from './ProfileCard';
import LoadingComponent from '../../app/layout/LoadingComponent';
import MiniActivityCard from './MiniActivityCard';


interface Props {
    profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
    const tabs = ['About', 'Photos', 'Events', 'Followers', 'Following'];
    const VStackOrTabs = isLargerThan768 ? undefined : VStack;
    const orientation = isLargerThan768 ? 'horizontal' : 'vertical';
    const buttonBorder = isLargerThan768 ? '' : '1px solid gray';
    const buttonBg = isLargerThan768 ? '' : 'white';
    const { profileStore } = useStore();


    return (
        <Tabs as={VStackOrTabs} w='full' orientation={orientation} isFitted border='1px solid pink' boxShadow='2xl'
            onChange={(index) => profileStore.setActiveTab(index)}
        >
            <TabList bg='white' w='full'>
                {tabs.map(e => <Tab border={buttonBorder} bg={buttonBg} _hover={{ bg: 'pink' }} _selected={{ bg: 'pink' }} key={e}>{e}</Tab>)}
            </TabList>
            <CustomisedTabPanels profile={profile} />
        </Tabs>
    );
};

const CustomisedTabPanels = observer(({ profile }: Props) => {
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
    const VStackOrFlex = isLargerThan768 ? Flex : VStack;
    const { profileStore: { isCurrentUser, uploadPhoto,
        uploading, loading, setMainPhoto, deletePhoto } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [editProfileMode, setEditProfileMode] = useState(false);
    const { profileStore } = useStore();
    const { followings, loadingFollowings,
        loadUserActivities, loadingActivities,
        userActivities } = profileStore;
    const [tabIndex, setTabIndex] = React.useState(0);
    const [target, setTarget] = useState('');
    const panes = useMemo(() => [
        { menuItem: 'Future Events', pane: { key: 'future' } },
        { menuItem: 'Past Events', pane: { key: 'past' } },
        { menuItem: 'Hosting', pane: { key: 'hosting' } }
    ], []);

    useEffect(() => {
        loadUserActivities(profile.username, panes[tabIndex as number].pane.key);
    }, [loadUserActivities, profile, tabIndex, panes]);

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    };

    const handleSetMainPhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    };

    const handleDeletePhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    };

    const handleTabChange = (index: number) => {
        setTabIndex(index);
        loadUserActivities(profile!.username, panes[tabIndex as number].pane.key);
    };

    return (
        <TabPanels p='2rem' bg='white'>
            <TabPanel as={VStack} align gap={4}>
                <HStack gap={2}>
                    <Icon as={FaUserCircle} boxSize='2.5em' />
                    <Heading color={'red.400'} fontSize={'2xl'} fontFamily={'body'}>About {profile.displayName}</Heading>
                    <Spacer />
                    {isCurrentUser && <Button _hover={{ bg: 'gray.300' }} variant='soild'
                        borderWidth='2px' borderColor='black' bg='red.400'
                        onClick={() => setEditProfileMode(!editProfileMode)}
                    >{editProfileMode ? 'Cancel' : 'Edit Profile'}</Button>}
                </HStack>
                <ProfileAbout profile={profile} editMode={editProfileMode} setEditMode={setEditProfileMode} />
            </TabPanel>

            <TabPanel as={VStack} align gap={4}>
                <HStack gap={2}>
                    <Icon as={BsCardImage} boxSize='2.5em' />
                    <Heading color={'red.400'} fontSize={'2xl'} fontFamily={'body'}>Photos</Heading>
                    <Spacer />
                    {isCurrentUser && (
                        <Button _hover={{ bg: 'gray.300' }} variant='soild'
                            borderWidth='2px' borderColor='black' bg='red.400'
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        >{addPhotoMode ? 'Cancel' : 'Add Photo'}</Button>
                    )}
                </HStack>
                {
                    addPhotoMode ? (
                        <PhotoUploadWidget loading={uploading} uploadPhoto={handlePhotoUpload} />
                    ) : (
                        <Box gap={4} as={VStackOrFlex}>
                            {profile.photos?.map((photo) => <VStack key={photo.id}>
                                <Image boxSize='10em' src={photo.url} />
                                {isCurrentUser && (<HStack >
                                    <Button
                                        variant='outline'
                                        colorScheme='red'
                                        color='red'
                                        leftIcon={<BsFillTrashFill />}
                                        isLoading={target === photo.id && loading}
                                        onClick={e => handleDeletePhoto(photo, e)}
                                        disabled={photo.isMain}
                                        name={photo.id}
                                    />
                                    <Button
                                        variant='outline'
                                        colorScheme='messenger'
                                        name={'main' + photo.id}
                                        disabled={photo.isMain}
                                        isLoading={target === 'main' + photo.id && loading}
                                        onClick={e => handleSetMainPhoto(photo, e)}
                                    >Set Main</Button>
                                </HStack>)}
                            </VStack>)}
                        </Box>
                    )
                }
            </TabPanel>

            <TabPanel as={Flex} direction='column' gap={6}>
                <HStack gap={2}>
                    <Icon as={AiFillCalendar} boxSize='2.5em' />
                    <Heading color={'red.400'} fontSize={'2xl'} fontFamily={'body'}>Activities</Heading>
                </HStack>
                <Tabs onChange={(index) => handleTabChange(index)}>
                    <TabList>
                        <Tab>Future Events</Tab>
                        <Tab>Past Events</Tab>
                        <Tab>Hosting</Tab>
                    </TabList>
                    <TabPanels>
                        {panes.map((e) =>
                            <TabPanel key={e.menuItem}>
                                {loadingActivities ? <LoadingComponent message='' /> :
                                    <Box as={VStackOrFlex} flexWrap='wrap' gap={6}>
                                        {userActivities.map((userActivity: UserActivity) => (
                                            <MiniActivityCard key={userActivity.id} activity={userActivity} />
                                        ))}
                                    </Box>
                                }
                            </TabPanel>
                        )}
                    </TabPanels>
                </Tabs>
            </TabPanel>

            <TabPanel as={Flex} direction='column' gap={6}>
                <HStack gap={2}>
                    <Icon as={FaUserCircle} boxSize='2.5em' />
                    <Heading color={'red.400'} fontSize={'2xl'} fontFamily={'body'}>People following {profile.displayName}</Heading>
                </HStack>
                <Box as={VStackOrFlex} flexWrap='wrap' gap={6}>
                    {loadingFollowings ? <Center w='full'><LoadingComponent message={'Loading profiles'} /></Center> :
                        followings.map(profile => (
                            <ProfileCard key={profile.username} profile={profile} />
                        ))
                    }
                </Box>
            </TabPanel>

            <TabPanel as={Flex} direction='column' gap={6}>
                <HStack gap={2}>
                    <Icon as={FaUserCircle} boxSize='2.5em' />
                    <Heading color={'red.400'} fontSize={'2xl'} fontFamily={'body'}>{'People ' + profile.displayName + ' is following'}</Heading>
                </HStack>
                <Box as={VStackOrFlex} flexWrap='wrap' gap={6}>
                    {loadingFollowings ? <Center w='full'><LoadingComponent message={'Loading profiles'} /></Center> :
                        followings.map(profile => (
                            <ProfileCard key={profile.username} profile={profile} />
                        ))
                    }
                </Box>
            </TabPanel>
        </TabPanels>
    );
});

export default observer(ProfileContent);