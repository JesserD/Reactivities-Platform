import { FormControl, FormLabel, Select, FormErrorMessage } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface Props {
    placeholder: string;
    name: string;
    options: categoryOption[];
    label?: string;
}

interface categoryOption {
    text: string
    value: string
}

const MySelectInput = (props: Props) => {
    const [field, meta, helpers] = useField(props.name);

    return (
        <FormControl isInvalid={meta.touched && !!meta.error}>
            <FormLabel >{props.label}</FormLabel>
            <Select value={field.value} onChange={(e) => helpers.setValue(e.currentTarget.value)}
                onBlur={() => helpers.setTouched(true)} placeholder={props.placeholder}
            >
                {props.options && props.options.map((opt) =>
                    <option value={opt.value} key={opt.value}>{opt.text}</option>)}
            </Select>
            {meta.touched && meta.error ? (
                <FormErrorMessage>{meta.error}</FormErrorMessage>
            ) : null}
        </FormControl>
    );
};

export default MySelectInput;