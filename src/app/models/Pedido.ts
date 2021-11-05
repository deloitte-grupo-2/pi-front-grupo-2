import { ClienteID } from "./ClienteId";
import { Item } from "./Item"

export class Pedido {
    
    cliente:ClienteID;
    dataEntrega:Date;
    formaPagamento:string;
    itens:Item[];
    status: string;
    precoTotal: number;

    constructor(cliente:ClienteID,dataEntrega:Date,formaPagamento:string,itens:Item[],precoTotal:number){
        this.cliente=cliente;
        this.dataEntrega=dataEntrega;
        this.formaPagamento=formaPagamento;
        this.itens=itens;
        this.status="em processamento";
        this.precoTotal=precoTotal;

        console.log(this);
    }
}

