import {
    HStack,
    Icon,
    Flex,
    Checkbox,
    Heading,
    VStack,
    CheckboxGroup,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Calendar from 'react-calendar';
import { FaFilter } from 'react-icons/fa';
import { useStore } from '../../../app/stores/store';


const ActivityFilters = () => {
    const { activityStore: { predicate, setPredicate } } = useStore();
    return (
        <VStack marginTop={5} gap={10} maxW='30em' p={3} mt={7}>
            <Flex width='100%' boxShadow={'2xl'} rounded={'lg'} p={3}>
                <VStack>
                    <HStack marginBottom={3} p={1} borderBottom={'1px ridge gray'}>
                        <Icon as={FaFilter} color='red.400' />
                        <Heading color={'red.400'} fontSize={'2xl'} fontFamily={'body'}>Filters</Heading>
                    </HStack>
                    <CheckboxGroup size='lg' colorScheme='red' >
                        <VStack alignItems={'left'} >
                            <Checkbox isChecked={predicate.has('all')}
                                onChange={() => setPredicate('all', 'true')}
                            >
                                All Activites
                            </Checkbox>
                            <Checkbox isChecked={predicate.has('isHost')}
                                onChange={() => setPredicate('isHost', 'true')}
                            >
                                I'm hosting
                            </Checkbox>
                            <Checkbox isChecked={predicate.has('isGoing')}
                                onChange={() => setPredicate('isGoing', 'true')}
                            >
                                I'm going
                            </Checkbox>
                        </VStack>
                    </CheckboxGroup>
                </VStack>
            </Flex>

            <Flex boxShadow={'2xl'}><Calendar
              onChange={(date: Date) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()} /></Flex>

        </VStack>
    );
};

export default observer(ActivityFilters);