import Swal, { SweetAlertOptions } from 'sweetalert2';
import i18n from '@/i18n';
import { ISweetAlertQuestion } from './interface';

const setupSwalMixin = () => {
    return Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        padding: '2em',
        // @ts-ignore
        customClass: 'sweet-alerts'
    });
};

export const showSuccessToast = (options?: SweetAlertOptions) => {
    const swalMixin = setupSwalMixin();

    const { t } = i18n;

    const message = t('message.process.success');

    // @ts-ignore
    return swalMixin.fire({
        icon: 'success',
        title: message,
        padding: '2em',
        customClass: 'sweet-alerts',
        ...options
    });
};

export const showErrorToast = (options?: SweetAlertOptions | null, message?: string | null) => {
    const swalMixin = setupSwalMixin();

    const { t } = i18n;

    // @ts-ignore
    return swalMixin.fire({
        icon: 'error',
        title: message ? message : t('message.process.error'),
        padding: '2em',
        customClass: 'sweet-alerts',
        ...options
    });
};

export const showWarningToast = (options?: SweetAlertOptions) => {
    const swalMixin = setupSwalMixin();

    const { t } = i18n;

    // @ts-ignore
    const message = t('message.process.notFound');

    // @ts-ignore
    return swalMixin.fire({
        icon: 'warning',
        title: message,
        padding: '2em',
        customClass: 'sweet-alerts',
        ...options
    });
};

export const disableStatus = (callback: () => void) => {
    const { t } = i18n;

    question({
        title: t('button.disable'),
        text: t('message.toDisable'),
        callbackYes: callback
    });
};

export const enableStatus = (callback: () => void) => {
    const { t } = i18n;

    question({
        title: t('button.enable'),
        text: t('message.toEnable'),
        callbackYes: callback
    });
};

export const question = ({title, text, callbackYes, callbackNo}: ISweetAlertQuestion) => {
    Swal.fire({
        icon: 'question',
        title: title,
        text: text,
        showCancelButton: true,
        showConfirmButton: true,
        customClass: {
            icon: 'sweet-alerts',
            popup: 'sweet-alerts',
            confirmButton: 'sweet-alerts',
            cancelButton: 'sweet-alerts',
        },
    }).then(async (result) => {
        if (result.value) {
            callbackYes();
        }else{
            if(callbackNo) {
                callbackNo();
            }
        }
    });
};
