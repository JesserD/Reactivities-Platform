import { observer } from 'mobx-react-lite';
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useStore } from '../../app/stores/store';

const ServerError = () => {
    const { commonStore } = useStore();
    return (
        <Box>
            <Heading as='h1'>Server Error</Heading>
            <Heading as='h5' color='red'>{commonStore.error?.message}</Heading>
            {commonStore.error?.details &&
                <Box>
                    <Heading as='h4' color='pink'>Stack trace</Heading>
                    <code style={{ marginTop: '10px' }}>{commonStore.error.details}</code>
                </Box>
            }
        </Box>
    );
};

export default observer(ServerError);