export interface Produto {
    produtoId?: string;
    nome: string;
    descricao: string;
    preco: number;
    imagemUrl: string;
    quantidade?: number;
}