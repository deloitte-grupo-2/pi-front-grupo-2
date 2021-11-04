import { Endereco } from "./Endereco";
import { Telefone } from "./Telefone";


export interface Cliente{
    nome: string;
    email:string;
    senha:string;
    cpf?:string;
    endereco?:Endereco[];
    telefone?:Telefone[]
    }
    