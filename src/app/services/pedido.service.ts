import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  CriarPedido(pedido:Pedido) {
    // Recuperando o token da sessão ativa
    let token = window.sessionStorage.getItem('token');
    //return this.http.put<Cliente>(`${this.url}/usuario/atualizar`, cliente,{headers:{Authorization:`Bearer ${token}`}} ).pipe(take(1));
    return this.http.post(`${this.url}/pedido/criar`,pedido,{headers:{Authorization:`{token}`}});
  }

  ParserCarrinho(carrinho:Produto[]):FormGroup {
    let auxiliar:any;
    var i:number;
    for(i=0;i<carrinho.length-1;i++) {
      auxiliar += `this.formBuilder.group({
        quantidade:${carrinho[i].quantidade},
        produto:this.formBuilder.group({
          id:1
        })
      }),`;
    }
    auxiliar += `this.formBuilder.group({
      quantidade:${carrinho[carrinho.length-1].quantidade},
      produto:this.formBuilder.group({
        id:1
      })
    })`
    return auxiliar;
  }

}
