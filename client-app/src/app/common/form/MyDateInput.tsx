import { useField } from 'formik';
import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';

const MyDateInput = (props: Partial<ReactDatePickerProps>) => {
    const [field, meta, helpers] = useField(props.name!);

    return (
        <FormControl width='full' isInvalid={meta.touched && !!meta.error}>
            <DatePicker {...field} {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <FormErrorMessage>{meta.error}</FormErrorMessage>
            ) : null}

        </FormControl>
    );
};


export default MyDateInput;