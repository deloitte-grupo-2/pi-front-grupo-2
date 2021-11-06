import { Endereco } from "./Endereco";
import { Telefone } from "./Telefone";


export class Cliente{
    nome!: string;
    email!:string;
    senha!:string;
    cpf?:string;
    endereco?:Endereco[];
    telefone?:Telefone[]

    constructor(map:Map<string, any>){
        Object.keys(this).forEach(atributo => Object.defineProperty(this, atributo, {value: map.get(atributo)}))
    }
}
    