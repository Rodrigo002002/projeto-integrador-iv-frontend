import React from 'react';
import { Box, LoadingOverlay } from '@mantine/core';
import { useCoreLoader } from '@/providers/LoaderProvider';
import { CoreLoaderProps } from '@/components/Loader/interfaces';

const CoreLoader: React.FC<CoreLoaderProps> = ({ id, children }) => {
    const { isLoading } = useCoreLoader();

    return (
        <Box pos="relative">
            <LoadingOverlay visible={isLoading(id)} />
            {children}
        </Box>
    );
};

export default CoreLoader;
