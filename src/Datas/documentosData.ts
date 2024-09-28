import { IDocumento } from '@/types/IDocumento';

export const getDocumentoData = (): IDocumento[] => {
    return [
        {
            id: 1,
            tipo: "RG",
            imagem: "rg.pdf"
        }
    ]
}
