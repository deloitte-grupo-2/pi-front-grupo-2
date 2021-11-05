import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderComponent } from '../components/order/order.component';
import { Pedido } from '../models/Pedido';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  // Configurando URL para acessar End Points
  private readonly url = "https://api-salom-doces.herokuapp.com";

  constructor(private http:HttpClient) { }

  // Criando um pedido no Back End
  CriarPedido(pedido:Pedido):Observable<Pedido> {
    // Recuperando o token da sessão ativa
    let token = window.sessionStorage.getItem('token');
    console.log("Token: " + token);
    //return this.http.put<Cliente>(`${this.url}/usuario/atualizar`, cliente,{headers:{Authorization:`Bearer ${token}`}} ).pipe(take(1));
    return this.http.post<Pedido>(`${this.url}/pedido/criar`,pedido,{headers:{Authorization:`${token}`}});
  }

}
