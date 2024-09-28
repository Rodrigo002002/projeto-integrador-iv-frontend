export interface IPagamento {
    id: number,
    dataPagamento: string,
    dataPrazo: string,
    valor: string,
    planoId?: number,
    servicoId?: number,
    pago: boolean
}

export interface IPagamentoForm {
    id: number | null,
    dataPagamento: string | null,
    dataPrazo: string | null,
    valor: string | null,
    planoId?: number | null,
    servicoId?: number | null,
    pago: boolean | null,
}
