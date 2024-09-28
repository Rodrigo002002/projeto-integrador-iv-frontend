import { IAluno } from '@/types/IAluno';
import { getTurmasData } from '@/Datas/turmasData';
import { getDocumentoData } from '@/Datas/documentosData';
import { getPlanosData } from '@/Datas/planosData';
import { getPagamentosData } from '@/Datas/pagamentosData';

export const getAlunosData = (): IAluno[] => {
    return [
        {
            id: "fndhgjndfjgnjk01",
            nome: "Felipe",
            role: "ALUNO",
            telefone: "41 928736452",
            email: "felipe@gmail.com",
            password: "123456",
            turma: getTurmasData()[0],
            rg: "192.837.482-9",
            cpf: "234.543.482-93",
            documentos: getDocumentoData(),
            plano: getPlanosData()[0],
            pagamentos: getPagamentosData()
        }
    ]
}

export const getAlunoNoClass = (): IAluno[] => {
    return [
        {
            id: "fndhgjndfjgnjk01",
            nome: "Felipe",
            role: "ALUNO",
            telefone: "41 928736452",
            email: "felipe@gmail.com",
            password: "123456",
            rg: "192.837.482-9",
            cpf: "234.543.482-93",
            documentos: getDocumentoData(),
            plano: getPlanosData()[0],
            pagamentos: getPagamentosData()
        }
    ]
}
