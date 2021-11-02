import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clickSubscription!:Subscription;

  constructor(private produtoService:ProdutoService ) { 
    this.clickSubscription = this.produtoService.getClick().subscribe(() => {
      this.toggleProduto();
    })
  }

  ngOnInit(): void {
  }

  // Atributos da classe  
  mostrandoLogin = false;
  mostrandoCadastro = false;
  mostrandoProduto = false;
  
  // Métodos da classe
  mostrarLogin(){
    this.mostrandoLogin = true;
  }

  esconderLogin(){
    this.mostrandoLogin = false;
  }
  
  mostrarCadastro(){
    this.mostrandoLogin = false;
    this.mostrandoCadastro = true;
  }

  esconderCadastro(){
    this.mostrandoCadastro = false;
  }

  mostrarProduto(){
    // Alterando atributo para mostrar o modal
    this.mostrandoProduto = true;
    console.log("Mostrando Produto pela Home");
  }

  esconderProduto(){
    // Alterando atributo para mostrar o modal
    this.mostrandoProduto = false;
    console.log("Fechando Produto pela Home");
  }

  toggleProduto(){
    this.mostrandoProduto = !this.mostrandoProduto;
  }

}
