import { getIn, useField } from 'formik';
import { useEffect } from 'react';
import { useFormContext } from '@/providers/FormProvider';
import { useTranslation } from 'react-i18next';
import { useErrorGroup } from '@/providers/ErrorGroupProvider';
import { useAppSelector } from '@/store/hooks';
import { IRootState } from '@/store';

const formFieldHook = (name: string) => {
    const [field, _, helpers] = useField(name);
    const { formikProps, appendValidationToShape } = useFormContext();

    const { t } = useTranslation();

    const error = getIn(formikProps.errors, name);

    const errorGroup = useErrorGroup();

    const isRtl = useAppSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    useEffect(() => {
        if (errorGroup && formikProps.submitCount > 0) {
            errorGroup.setFieldErrorState(name, !!error);
        }
    }, [error]);

    return {
        field,
        helpers,
        formikProps,
        appendValidationToShape,
        t,
        error,
        isRtl
    };
};

export default formFieldHook;
