import { Item } from "./Item"

export class Pedido {
    
    cliente:number;
    dataEntrega:Date;
    formaPagamento:string;
    itens:Item[];
    status: string;
    precoTotal: number;
    // frete:number;

    constructor(dataEntrega:Date,formaPagamento:string,itens:Item[],precoTotal:number){
        this.cliente=1;
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

