import { Itens } from "./Itens"
import { Produto } from "./Produto";

export class Pedido {
    
    cliente:number;
    dataEntrega:Date;
    formaPagamento:string;
    itens:Produto[];
    status: string;
    frete:number;

    constructor(dataEntrega:Date,formaPagamento:string,itens:Produto[],frete:number){
        this.cliente=1;
        this.dataEntrega=dataEntrega;
        this.formaPagamento=formaPagamento;
        this.itens=itens;
        this.status="em processamento";
        this.frete=frete;
        console.log(this);
    }



    
}

