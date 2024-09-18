import { Field } from 'formik';
import React, { useEffect } from 'react';
import { Box, Text, Tooltip } from '@mantine/core';
import { LuInfo } from 'react-icons/lu';
import { IFormInputCpfProps } from './interfaces';
import * as Yup from 'yup';
import { extractNumbers, formatCPF, validateCPFReal } from '@/helpers/ValidationHelper';
import formFieldHook from '@/hooks/Form/FormFieldHook';

const FormInputCpf: React.FC<IFormInputCpfProps> = ({
                                                        name,
                                                        label,
                                                        placeholder,
                                                        disabled = false,
                                                        info,
                                                        required = false,
                                                        onKeyUp
                                                    }) => {

    const {
        field,
        helpers,
        formikProps,
        appendValidationToShape,
        t,
        error
    } = formFieldHook(name);

    useEffect(() => {
        if(required){
            appendValidationToShape({
                [name]: Yup.string()
                    .required(t('validation.required'))
                    .test(
                        'test-invalid-cpf',
                        t('validation.invalidCpf'),
                        (cpf) => validateCPFReal(cpf, true)
                    )
            });
        }else{
            appendValidationToShape({
                [name]: Yup.string()
                    .test(
                        'test-invalid-cpf',
                        t('validation.invalidCpf'),
                        (cpf) => validateCPFReal(cpf, true)
                    )
            });
        }
    }, [required]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(formatCPF(e.target.value));
    };

    const handleOnKeyUp = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(onKeyUp){
            onKeyUp(extractNumbers(e.target.value), e.target.value);
        }
    }

    return (
        <div>
            <div className={(formikProps.submitCount > 0 && error ? 'has-error' : '')}>

                <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Text className="text-sm font-semibold  h-7 leading-6" component="label" htmlFor={name}>
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

                <Field
                    label={label}
                    type="text"
                    id={name}
                    disabled={disabled}
                    {...field}
                    placeholder={placeholder}
                    className={`form-input placeholder:text-white-dark ${disabled ? ' disabled:bg-[#eee]' : ''}`}
                    onChange={handleInputChange}
                    onKeyUp={handleOnKeyUp}
                />
            </div>

            {formikProps.submitCount > 0 && error ? (
                <div className="text-danger mt-1">{`${error}`}</div>
            ) : null}
        </div>
    );
};

export default FormInputCpf;
