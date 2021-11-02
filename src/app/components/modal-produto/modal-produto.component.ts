import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProdutoService } from "src/app/services/produto.service"
import { FormGroup, FormControl } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Produto } from 'src/app/models/Produto';

@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.css']
})
export class ModalProdutoComponent implements OnInit {
  
  //valor inicial do input "quantidade"
  valor: number = 0;

  // Criando o array de Produtos
  carrinho: Produto[];
  // Criando o formulário do Produto selecionado
  // Inicialmente não tem um tipo definido
  formulario:any;

  constructor(private produtoService:ProdutoService) { }

  ngOnInit(): void { 
    // Recuperar o carrinho atualizado no LocalStorage
    this.RecuperarCarrinho();
    // Instanciando o formulário
    this.formulario = new FormGroup({
      // Incluindo os campos do Produto
      // Estes campos virão do model Produto
      // imagem: new FormControl(),
      produtoId: new FormControl(),
      nome: new FormControl(),
      quantidade: new FormControl(),
      descricao: new FormControl(),
      preco: new FormControl(),
      isComprado: new FormControl(),
    });
  }

  cancelar() {
    // Disparando o evento para fechar o Modal Produto
    // Atributo mostrandoProduto do componente HOME setado para FALSE
    // this.onCancelarClick.emit();
    this.produtoService.sendClick();
    console.log("Mostrando modal Produto por Componente Produto");
  }

  //incremento da quantidade
  mais(){
    this.valor++;
  }

  //decremento da quantidade
  menos(){
    if(this.valor>0) {
      this.valor--;
    }
  }

  AdicionarAoCarrinho():void {
    // Preenchedo valores do formulário
    // Valores HARD CODED. Único dinâmico: quantidade
    this.formulario.value.produtoId = Guid.create().toString();
    this.formulario.value.nome = "Brownie de Chocolate com Pimenta";
    this.formulario.value.quantidade = this.valor;
    this.formulario.value.descricao = "Brownie recheado com brigadeiro de chocolate com pimenta.";
    this.formulario.value.preco = 60;
    this.formulario.value.isComprado = true;
    // Constante para recuperar todos os valores do formulário
    const PRODUTO: Produto = this.formulario.value;
    // Adicionar o produto do formulário ao carrinho
    this.carrinho.push(PRODUTO);
    // Armazenando dados no Local Storage
    localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
    // Resetando o formulário
    // this.formulario.reset();
  }

  RecuperarCarrinho(): void {
     // Verificando se Carrinho existe no LocalStorage
     if(localStorage.getItem("carrinho")) {
        // Adicionar produtos do carrinho no array de produtos (atributo "carrinho")
        this.carrinho = JSON.parse(localStorage.getItem("carrinho"));
      } else {
        // Carrinho não existe no LocalStorage. Inicializar array.
        this.carrinho = [];
      }
   
  }

  total(){
    return `Total R$ ${this.valor*60}`;
  }
}
