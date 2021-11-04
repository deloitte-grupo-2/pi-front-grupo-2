import { Itens } from "./Itens"

export interface Pedido {
    cliente:number;
    dataEntrega:Date;
    formaPagamento:string;
    itens:Itens[];
    status: string;
    precoTotal: number;
}