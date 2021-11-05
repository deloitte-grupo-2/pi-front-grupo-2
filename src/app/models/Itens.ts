import { Produto } from "./Produto";

export class Itens {
    produto:Produto;
    quantidade:number;

    constructor(produto:Produto) {
        this.produto=produto;
        this.quantidade=0;
    }

    incrementarQuantidade() {
        this.quantidade++;
    }

    decrementarQuantidade() {
        this.quantidade--;
    }
}