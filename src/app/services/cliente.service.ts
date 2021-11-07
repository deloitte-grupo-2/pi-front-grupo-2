import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/Cliente';
import {take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  public static usuario:Usuario ={
    email: ""
  }
  
  private readonly url = "https://api-salom-doces.herokuapp.com";

  constructor(private http:HttpClient) { }

  criarCliente(cliente:Cliente){
    return this.http.post(`${this.url}/usuario/cadastrar`, cliente).pipe(take(1));
  }

  logarCliente(cliente:any){
    return this.http.post(`${this.url}/usuario/logar`, cliente).pipe(take(1))
  }

  atualizarCliente(cliente:Cliente){
    let token = window.sessionStorage.getItem('token');
    return this.http.put<Cliente>(`${this.url}/usuario/atualizar`, cliente,{headers:{Authorization:`${token}`}} ).pipe(take(1));
  }

  consultarClientePorEmail(clienteEmail:string):Observable<Cliente> {
    let token = window.sessionStorage.getItem('token');
    return this.http.get<Cliente>(`${this.url}/usuario/consultar/${clienteEmail}`, {headers:{Authorization:`${token}`}}); 
     
  }
}
