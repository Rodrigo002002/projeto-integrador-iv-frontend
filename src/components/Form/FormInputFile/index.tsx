import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Text, Tooltip } from '@mantine/core';
import { LuFile, LuInfo } from 'react-icons/lu';
import { IFormInputFileProps } from './interfaces';
import * as Yup from 'yup';
import formFieldHook from '@/hooks/Form/FormFieldHook';
import { acceptedMimeTypes } from '@/components/Form/FormInputFile/helpers';

const FormInputFile: React.FC<IFormInputFileProps> = ({
                                                          name,
                                                          label,
                                                          disabled = false,
                                                          info,
                                                          required = false,
                                                          accept = [],
                                                          multiple = false,
                                                          onDrop,
                                                      }) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        field,
        helpers,
        formikProps,
        appendValidationToShape,
        t,
        error,
    } = formFieldHook(name);

    useEffect(() => {
        if (required) {
            appendValidationToShape({
                [name]: Yup.mixed()
                    .required(t('validation.required'))
                    .test('fileType', t('validation.fileType'), (value: any) => {
                        if (!value) return true;

                        const validExtensions = accept.map(ext => ext.toLowerCase());

                        if (multiple) {
                            return value.every((file: File) => validExtensions.includes(file.name.split('.').pop()?.toLowerCase() as string));
                        }

                        return validExtensions.includes(value?.name.split('.').pop()?.toLowerCase());
                    }),
            });
        }
    }, [required]);

    const onDropAccepted = useCallback((acceptedFiles: File[]) => {
        helpers.setValue(multiple ? acceptedFiles : acceptedFiles[0]);
        setErrorMessage(null);

        if (onDrop) {
            onDrop(acceptedFiles);
        }
    }, [helpers, multiple, onDrop]);

    const onDropRejected = useCallback(() => {
        setErrorMessage(t('validation.invalidFileType', {ext: accept.join(", ").toUpperCase()}));
    }, [t]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop: onDropAccepted,
        onDropRejected,
        accept: acceptedMimeTypes(accept),
        multiple,
        disabled,
    });

    const renderFilePreview = (file: File) => {
        const fileType = file.name.split('.').pop()?.toLowerCase();
        let icon;

        switch (fileType) {
            case 'pdf':
                icon = <LuFile className="text-red-500" />;
                break;
            case 'jpg':
            case 'png':
                icon = <LuFile className="text-blue-500" />;
                break;
            case 'docx':
                icon = <LuFile className="text-green-500" />;
                break;
            default:
                icon = <LuFile />;
        }

        return (
            <div key={file.name} className="flex items-center gap-2">
                {icon}
                <Text>{file.name}</Text>
            </div>
        );
    };

    const files = multiple ? (field.value || []) : (field.value ? [field.value] : []);

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: formikProps.submitCount > 0 && error ? '#ff1744' : '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const focusedStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#3967f6'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };

    const style: any = {
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    };

    return (
        <div>
            <div className={(formikProps.submitCount > 0 && error ? 'has-error' : '')}>
                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Text className="text-sm font-semibold h-7 leading-6" component="label" htmlFor={name}>
                        {label}
                    </Text>

                    {required && (
                        <Text c="red" style={{ cursor: 'default' }}>
                            *
                        </Text>
                    )}

                    {info && (
                        <Tooltip label={info} withArrow className="mb-1">
                            <Text style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                <LuInfo className="text-primary" />
                            </Text>
                        </Tooltip>
                    )}
                </Box>

                <div
                    {...getRootProps({ className: `dropzone ${isDragActive ? 'active' : ''} ${disabled ? 'disabled' : ''}` })}
                    style={style}
                >
                    <input {...getInputProps()} />
                    <p>{multiple ? t('loadFiles') : t('loadFile')}</p>
                </div>

                <div className="mt-2">
                    {files.length > 0 && (
                        <div>
                            {files.map((file: File) => renderFilePreview(file))}
                        </div>
                    )}
                </div>

                {errorMessage && <div className="text-danger mt-1">{errorMessage}</div>}
            </div>

            {formikProps.submitCount > 0 && error ? (
                <div className="text-danger mt-1">{`${error}`}</div>
            ) : null}
        </div>
    );
};

export default FormInputFile;
