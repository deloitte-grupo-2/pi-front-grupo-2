export interface Produto {
    id?: string;
    nome: string;
    descricao: string;
    preco: number;
    imagemUrl: string;
    quantidade?: number;
}