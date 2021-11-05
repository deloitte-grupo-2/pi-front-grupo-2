import { Cliente } from "./Cliente";
import { ClienteID } from "./ClienteId";
import { Item } from "./Item"

export class Pedido {
    
    cliente:ClienteID;
    dataEntrega:Date;
    formaPagamento:string;
    itens:Item[];
    status: string;
    precoTotal: number;
    // frete:number;

    constructor(cliente:ClienteID,dataEntrega:Date,formaPagamento:string,itens:Item[],precoTotal:number){
        this.cliente=cliente;
        this.dataEntrega=dataEntrega;
        this.formaPagamento=formaPagamento;
        this.itens=itens;
        this.status="em processamento";
        // this.frete=frete;
        this.precoTotal=precoTotal;
        // this.precoTotal=this.itens
        // .map(item => item.quantidade*item.produto.preco)
        // .reduce((total,atual)=>total+atual)+this.frete;

        console.log(this);
    }



    
}

