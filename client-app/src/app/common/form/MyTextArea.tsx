import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
}

 const MyTextArea = (props: Props) => {
    const [field, meta] = useField(props.name); 
    return (
        <FormControl isInvalid={meta.touched && !!meta.error}>
            <FormLabel >{props.label}</FormLabel>
            <Textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <FormErrorMessage>{meta.error}</FormErrorMessage>
            ) : null}
        </FormControl>
    );
};

export default MyTextArea;