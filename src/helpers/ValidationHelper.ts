export const validateCPFReal = (cpf: string | null | undefined, onlyCompleted = false) => {
    if (cpf === null ||  cpf === undefined) {
        return true;
    }

    const cleaned = cpf.replace(/\D/g, '');

    if (cleaned.length < 11) {
        return onlyCompleted;
    }

    if (/^(\d)\1+$/.test(cleaned)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleaned.charAt(i)) * (10 - i);
    }

    let firstVerifier = (sum * 10) % 11;
    if (firstVerifier === 10 || firstVerifier === 11) firstVerifier = 0;
    if (firstVerifier !== parseInt(cleaned.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleaned.charAt(i)) * (11 - i);
    }

    let secondVerifier = (sum * 10) % 11;
    if (secondVerifier === 10 || secondVerifier === 11) secondVerifier = 0;

    return secondVerifier === parseInt(cleaned.charAt(10));
};

export const formatCPF = (cpf: string) => {
    const cleaned = cpf.replace(/\D/g, '');

    let masked = cleaned;

    if (cleaned.length > 3 && cleaned.length <= 6) {
        masked = cleaned.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (cleaned.length > 6 && cleaned.length <= 9) {
        masked = cleaned.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (cleaned.length > 9) {
        masked = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }

    return masked.slice(0, 14);
};

export const formatRG = (rg: string) => {
    const cleaned = rg.replace(/\D/g, '');
    const masked = cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    return masked.slice(0, 12);
};

export const formatCEP = (cep: string): string => {
    const cleaned = cep.replace(/\D/g, '');

    let masked = cleaned;

    if (cleaned.length > 2 && cleaned.length <= 5) {
        masked = cleaned.replace(/(\d{2})(\d{1,3})/, '$1.$2');
    } else if (cleaned.length > 5) {
        masked = cleaned.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2-$3');
    }

    return masked.slice(0, 10);
};

export const extractNumbers = (value: string | null): number | null => {
    if(value == null){
        return null;
    }

    return Number(value.replace(/\D/g, ''));
};
