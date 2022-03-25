import React, { useState } from 'react';
import { Button, Heading, VStack, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import ValidationErrors from './ValidationErrors';

const TestErrors = () => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const [errors, setErrors] = useState(null);

    const handleNotFound = () => {axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));};
    const handleBadRequest = () => {axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err));};
    const handleServerError = () => {axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));};
    const handleUnauthorised = () => {axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));};
    const handleBadGuid = () => {axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err));};
    const handleValidationError = () => {axios.post(baseUrl + 'activities', {}).catch(err => setErrors(err));};
    
    return (
        <VStack alignItems={'center'}>
            <Heading as='h1' color={'red.400'} fontSize={'2xl'}>Test Error component</Heading>
            <SimpleGrid columns={[1, null, 6]} columnGap={3} bg={'pink'} boxShadow='dark-lg' p={2}>
                <Button onClick={handleNotFound} colorScheme='black' variant='outline'>Not Found</Button>
                <Button onClick={handleBadRequest} colorScheme='black' variant='outline'>Bad Request</Button>
                <Button onClick={handleValidationError} colorScheme='black' variant='outline'>Validation Error</Button>
                <Button onClick={handleServerError} colorScheme='black' variant='outline'>Server Error</Button>
                <Button onClick={handleUnauthorised} colorScheme='black' variant='outline'>Unauthorised</Button>
                <Button onClick={handleBadGuid} colorScheme='black' variant='outline'>Bad Guid</Button>
            </SimpleGrid>
            {errors && <ValidationErrors errors={errors} />}
        </VStack>
    );
};

export default TestErrors;