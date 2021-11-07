import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  // Carregando cliente logado
  cliente!: Cliente;
  // Primeiro nome do cliente
  clientePrimeiroNome!:string;
  // Número do Pedido
  pedidoCodigo!:string;
  
  constructor() { }

  ngOnInit(): void {
    // Carregar cliente logado
    this.CarregarCliente();
    this.SepararNomeCliente();
    this.CarregarCodigoPedido();
  }

  CarregarCliente(): void {
    // Verificando se Cliente existe no LocalStorage
    if(localStorage.getItem("cliente")) {
      // Carregar dados do cliente
      this.cliente = JSON.parse(localStorage.getItem("cliente"));
    } else {
      // Carrinho não existe no LocalStorage. Inicializar array.
      this.cliente = new Cliente("","","","");
    }     
  }

  SepararNomeCliente(): void {
      // Recuperando nome completo do cliente
      let nomeCliente=this.cliente.nome;
      // Separando o primeiro nome
      this.clientePrimeiroNome=nomeCliente.slice(0,nomeCliente.indexOf(" "));
  }

  CarregarCodigoPedido(): void {
       // Verificando se Cliente existe no LocalStorage
    if(localStorage.getItem("pedido")) {
      // Carregar dados do cliente
      this.pedidoCodigo = String(localStorage.getItem("pedido"));
    } else {
      // Carrinho não existe no LocalStorage. Inicializar array.
      this.pedidoCodigo = "";
    }   
  }

}
