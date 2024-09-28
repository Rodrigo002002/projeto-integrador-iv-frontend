import React from 'react';
import { useTranslation } from 'react-i18next';
import { ISubmitProps } from './interfaces';
import { DynamicIcons } from '@/components//DynamicIcons/DynamicIcons';

const SubmitButton: React.FC<ISubmitProps> = ({
                                                  loading,
                                                  className,
                                                  hideOutnerDiv = false,
                                                  disabled,
                                                  text,
                                                  icon = 'IoSaveOutline'
                                              }) => {

    const { t } = useTranslation();

    const btn = (
        <button
            type="submit"
            className={`btn btn-primary ${className}`}
            disabled={loading || disabled}
        >
            {loading ? (
                <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle" />
            ) : ''}

            <DynamicIcons name={icon} className="mr-2 w-4 h-5" />
            {text ? text : t('button.save')}
        </button>
    );

    if (hideOutnerDiv) {
        return (
            <>
                {btn}
            </>
        );
    }

    return (
        <div className="flex justify-end">
            {btn}
        </div>
    );
};

export default SubmitButton;
