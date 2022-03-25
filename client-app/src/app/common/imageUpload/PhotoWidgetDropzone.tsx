import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Heading, Icon } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';

interface Props {
    setFiles: (files: any) => void;
}

const PhotoWidgetDropzone = ({ setFiles }: Props) => {
    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '50px',
        textAlign: 'center' as 'center',
        height: 200
    };

    const dzActive = {
        borderColor: 'green'
    };

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Box {...getRootProps()} style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles} p={5} >
            <input {...getInputProps()} />
            <Icon as={FaUpload} boxSize='60px' />
            <Heading fontSize={'xl'} fontFamily={'body'}>Drop image here</Heading>
        </Box>
    );
};

export default PhotoWidgetDropzone; 