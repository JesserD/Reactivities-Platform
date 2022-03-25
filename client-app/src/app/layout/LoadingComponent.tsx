import React from 'react';
import { Box, CircularProgress, VStack,Text } from '@chakra-ui/react';

interface Props {
    message : string
}

const LoadingComponent = ({message}: Props) => {
    return (
        <Box padding='25% 0' textAlign='center'>
            <VStack>
            <CircularProgress isIndeterminate size='70px' thickness='4px' color='pink'/>
            <Text>{message !== '' ? message.concat('...'): ''}</Text>
            </VStack>
        </Box>
        );
};

export default LoadingComponent;