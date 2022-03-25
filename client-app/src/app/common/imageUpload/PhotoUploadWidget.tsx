import { Text, Box, Button, SimpleGrid, VStack, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Cropper } from 'react-cropper';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import 'cropperjs/dist/cropper.css';

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

const PhotoUploadWidget = ({ loading, uploadPhoto }: Props) => {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    const onCrop = () => {
        if (cropper) cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
    };

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    if (true) return (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing='40px'>
            <VStack>
                <Text>Step 1 - Add Photo</Text>
                <PhotoWidgetDropzone setFiles={setFiles} />
            </VStack>
            <VStack>
                <Text>Step 2 - Resize image</Text>
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </VStack>
            <VStack>
                <Text>Step 3 - Preview & Upload</Text>
                {files && files.length > 0 &&
                    <>
                        <Box className='img-preview' style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }} />
                        <HStack>
                            <Button disabled={loading} rightIcon={<AiOutlineClose />} onClick={() => setFiles([])}

                            >Cancel</Button>
                            <Button isLoading={loading} rightIcon={<AiOutlineCheck />} bg='red.400' onClick={onCrop}

                            >Upload</Button>
                        </HStack>
                    </>
                }
            </VStack>
        </SimpleGrid>
    );
};
export default PhotoUploadWidget;