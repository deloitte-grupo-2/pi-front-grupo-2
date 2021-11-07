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

  ParserCarrinho(clienteID:number,carrinho:Produto[],agendamento:Date,status:string,precoTotal:number):string {
    let auxiliar:string="";
    var i:number;
    auxiliar += `{
      "cliente": {
        "id": ${clienteID}
      },
      "dataEntrega":"${agendamento}",
      "formaPagamento": "dinheiro",
      "itens":[`
    for(i=0;i<carrinho.length-1;i++) {
      auxiliar += `{
        "quantidade":${carrinho[i].quantidade},
        "produto":{
          "id":1
        }},`;
    } // fechando o For
    // Último item do carrinho
    auxiliar += `{
      "quantidade":${carrinho[i].quantidade},
        "produto":{
          "id":1
        }}],`;
    // Últimos atributos do JSON
    auxiliar += `
    "status": ${status},
    "precoTotal": ${precoTotal}
    }`

    // Retornando o JSON completo
    return auxiliar;
  }

}
