import { IBreadcrumbItem } from '@/components/BreadCrumbs/interfaces';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import professoresData from '@/Datas/professores.json';
import React, { useEffect, useState } from 'react';
import { IServicoForm } from '@/types/IServico';
import { IProfessorForm } from '@/types/IProfessor';
import { FormikProps } from 'formik';
import CoreLoader from '@/components/Loader';
import { FormProvider } from '@/providers/FormProvider';
import FormInput from '@/components/Form/FormInput';
import FormInputRg from '@/components/Form/FormInputRg';
import FormInputCpf from '@/components/Form/FormInputCpf';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';

const ServicoManter = () => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation();

    const breadCrumbsItems: IBreadcrumbItem[] = [
        {
            label: t('service'),
            uri: '/servico/consultar'
        },
        {
            label: id ? t('edit') : t('create')
        }
    ];

    // Form
    const formInitialValues: IServicoForm = {
        tipo: null,
        pagamento: null,
        professor: null,
        aluno: null
    }

    const [genericError, setGenericError] = useState<string | null>(null);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState(formInitialValues);


    useEffect(() => {
        if (id) {
            setInitialValues(professoresData[0].servicos[0]);
        }
    }, []);

    const onSubmit = (values: IProfessorForm) => {

    };
    return (
        <div>
            <BreadCrumbs
                items={breadCrumbsItems}
            />

            <div className="panel mt-5">
                <CoreLoader id={'professores'}>
                    <FormProvider initialValues={initialValues} onSubmit={onSubmit}>
                        {(formikProps: FormikProps<any>) => (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormInput
                                        name="tipo"
                                        label={t('type')}
                                        required={true}
                                        placeholder={t('type')}
                                    />

                                    <FormInput
                                        name="professor.nome"
                                        label={t('teacher')}
                                        required={true}
                                        placeholder={t('teacher')}
                                    />

                                    <FormInput
                                        name="aluno.nome"
                                        label={t('student')}
                                        required={true}
                                        placeholder={t('student')}
                                    />
                                </div>

                                {genericError && (
                                    <div
                                        className="flex items-center p-3.5 rounded text-warning bg-warning-light dark:bg-warning-dark-light">
                                        <span className="ltr:pr-2 rtl:pl-2">
                                            <strong className="ltr:mr-1 rtl:ml-1">{t('errorProcessing')}!</strong>
                                            {genericError}
                                        </span>
                                    </div>
                                )}

                                <div className="flex w-full justify-end">
                                    <button type="submit" className="btn btn-primary !mt-6" disabled={loadingBtn}>
                                        <DynamicIcons name="IoSave" className="mr-2 w-4 h-5" />
                                        {t('button.save')}
                                    </button>
                                </div>
                            </>
                        )}
                    </FormProvider>
                </CoreLoader>
            </div>
        </div>
    );
}

export default ServicoManter;
