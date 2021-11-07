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

  ngOnInit(): void {
    this.CarregarCliente();
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
    if(sessionStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  UsuarioSair(): void {
    // Encerrando a sessão do usuário atual
    sessionStorage.removeItem("token");
    localStorage.removeItem("cliente");
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