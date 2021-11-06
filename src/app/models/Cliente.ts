import { Endereco } from "./Endereco";
import { Telefone } from "./Telefone";


export class Cliente{
    nome!: string;
    email!:string;
    senha!:string;
    cpf?:string;
    endereco?:Endereco[];
    telefone?:Telefone[]

    constructor(nome:string, email:string, senha:string,cpf:string, endereco:Endereco[], telefone:Telefone[]){
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.cpf = cpf;
    this.endereco = endereco;
    this.telefone = telefone;
    }
}
    