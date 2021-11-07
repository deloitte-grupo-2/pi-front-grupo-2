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

  constructor() { }

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
  }

  CarregarCliente(): void {
    let nomeCliente:string;
    nomeCliente="Mariana Magalhães Ximenes";
    //nomeCliente=this.cliente.nome;
    this.clientePrimeiroNome=nomeCliente.slice(0,nomeCliente.indexOf(" "));
    console.log(this.clientePrimeiroNome);
  }

}