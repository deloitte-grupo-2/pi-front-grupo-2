import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderComponent } from '../components/order/order.component';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  // Configurando URL para acessar End Points
  private readonly url = "https://api-salom-doces.herokuapp.com";

  constructor(private http:HttpClient) { }

  // Criando um pedido no Back End
  CriarPedido(pedido:OrderComponent) {
    // Recuperando o token da sessão ativa
    let token = window.sessionStorage.getItem('token');
    //return this.http.put<Cliente>(`${this.url}/usuario/atualizar`, cliente,{headers:{Authorization:`Bearer ${token}`}} ).pipe(take(1));
    return this.http.post(`${this.url}/pedido/criar`,pedido,{headers:{Authorization:`Bearer &{token}`}});
  }

}
