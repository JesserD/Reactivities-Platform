import React from 'react';
import { Button, Heading, Image, Text, HStack, VStack, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

const HomePage = () => {
    const { userStore, modalStore } = useStore();
    return (
        <Flex p='auto' textAlign='center' className='masthead'>
            <VStack  >
                <HStack as='h1' alignItems={'center'}>
                    <Image boxSize='80px' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    <Text fontSize={'xxx-large'}>Reactivities</Text>
                </HStack>
                <VStack width='full'>

                    {userStore.isLoggedIn ? (
                        <>
                            <Heading as='h2' >Welcome to Reactivities</Heading>
                            <Button as={Link} to='/activities' size='md'>Go to the Activities!</Button>
                        </>
                    ) : (
                        <Flex direction='row' columnGap={2} w='full' p='auto' alignContent='stretch'>
                            <Button onClick={() => modalStore.openModal(<LoginForm />)}
                             w='full' size='lg' _hover={{ bg: 'gray.400' }}>
                                Login
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm/>)}
                             w='full' size='lg' _hover={{ bg: 'gray.400' }}>
                                Register
                            </Button>
                        </Flex>
                    )})


                </VStack>
            </VStack>
        </Flex>
    );
};

export default observer(HomePage);