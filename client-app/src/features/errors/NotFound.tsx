import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading, Icon, VStack } from '@chakra-ui/react';

const NotFound = () => {
    return (
        <VStack marginTop='3em' border='2px solid pink' boxShadow='2xl' p={4}>
            <Heading fontSize='2xl' color='red.300' >
                <Icon name='search' />
               <strong> Oops - we've looked everywhere and could not find this.</strong>
            </Heading>
                <Button bg='red.300' color='black' as={Link} to='/activities'>
                    Return to activities page
                </Button>
        </VStack>
    );
};

export default NotFound;