import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { Produto } from 'src/app/models/Produto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onAddContatoClick:EventEmitter<null> = new EventEmitter();

  // Criando o array de Produtos
  carrinho!: Produto[];
  // Carregando cliente logado
  cliente!: Cliente;
  // Primeiro nome do cliente
  clientePrimeiroNome!:string;

  constructor() { 
    this.clientePrimeiroNome="";
  }

  admin: boolean = false;

  ngOnInit(): void {
    this.CarregarCliente();
    let token = window.sessionStorage.getItem('token');
    if (token == 'Basic YWRtaW5Ac2Fsb20uY29tOmFkbWluc2Fsb20=') {
      this.admin = true;
    }
  }

  mostrarModalClick(){
    console.log("Cliquei para abrir o modal!");
    this.onAddContatoClick.emit();
  }

  ScrollIntoView(elem: string) {
    console.log(elem);
    document.querySelector(elem).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  isUsuarioLogado(): boolean {
    let token = sessionStorage.getItem("token");
    if(token != null) {
      if (token == 'Basic YWRtaW5Ac2Fsb20uY29tOmFkbWluc2Fsb20=') {
      this.admin = true;
    }
      return true;
    } else {
      return false;
    }
  }

  UsuarioSair(): void {
    // Encerrando a sessão do usuário atual
    sessionStorage.removeItem("token");
    localStorage.removeItem("cliente");
    this.admin = false;
  }

  CarregarCliente(): void {
    this.clientePrimeiroNome="";
    let nomeCliente:string;
    // Se o carrinho estiver vazio, não há itens de Pedido
    // Verificando se Carrinho existe no LocalStorage
    if(localStorage.getItem("cliente")) {
      // Adicionar Itens de Pedido no array de itens de pedido
      this.cliente = JSON.parse(localStorage.getItem("cliente"));
    } else {
      // Carrinho não existe no LocalStorage. Inicializar array.
      this.cliente = new Cliente("","","","");
    } 
    // Recuperando nome completo do cliente
    nomeCliente=this.cliente.nome;
    // Separando o primeiro nome
    this.clientePrimeiroNome=nomeCliente.slice(0,nomeCliente.indexOf(" "));    
  }

}