import moment from 'moment';

export function validationDate(date: string | null | unknown, format: string = 'DD/MM/YYYY'): boolean {
    return date ? moment(date, format).isValid() : true;
}

export function validationDateElucidation(option: boolean | null | unknown, date: string | null | unknown): boolean {
    if (option == true) {
        return !!date;
    }
    return true;
}

export function validationHour(hour: string | null | unknown, format: string = 'hh:ss'): boolean {
    return hour ? moment(hour, format).isValid() : true;
}

export function validationInitialDate(date: string | null | unknown, secondDate: string | null | unknown, format: string = 'DD/MM/YYYY'): boolean {
    if (secondDate) {
        if (date) {
            return moment(date, format) <= moment(secondDate, format);
        }
        return true;
    }
    return true;
}

export function checkDate(date: string, format: string = 'DD/MM/YYYY'): boolean {
    return moment(date, format).isValid();
}

export function formatDateDbToBr(date: string | null): string | null {
    return date ? moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY').toString() : null;
}

export function formatDateBrToDb(date: string | null): string | null {
    return date ? moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD').toString() : null;
}
