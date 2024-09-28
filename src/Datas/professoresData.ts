import { getDocumentoData } from '@/Datas/documentosData';
import { IProfessorResponse } from '@/types/IProfessor';
import { getServicosData } from '@/Datas/servicosData';

export const getProfessoresData = (): IProfessorResponse[] => {
    return [
        {
            id: "oirenifg123123",
            nome: "Pedro",
            role: "PROFESSOR",
            rg: "928.736.472-8",
            cpf: "928.371.829-37",
            telefone: "(41) 988772632",
            email: "pedro@gmail.com",
            documentos: getDocumentoData(),
            servicos: getServicosData()
        }
    ]
}

export const getProfessorNoService = (): IProfessorResponse => {
    return {
        id: "oirenifg123123",
        nome: "Pedro",
        role: "PROFESSOR",
        rg: "928.736.472-8",
        cpf: "928.371.829-37",
        telefone: "(41) 988772632",
        email: "pedro@gmail.com",
        documentos: getDocumentoData()
    }
}
