import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProdutoService } from "src/app/services/produto.service"
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Produto } from 'src/app/models/Produto';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.css']
})
export class ModalProdutoComponent implements OnInit {
  
  //quantidade inicial do input "quantidade"
  quantidade: number = 1;
  // Dados do produto sendo exibidos no Modal
  produto!:Produto;
  // Criando o array de Produtos
  carrinho!: Produto[];
  // Criando itens de pedido
  itensPedido!:Item[];
  // Formulários com os dados do produto selecionado
  // Dados para adicionar no carrinho
  formulario!:FormGroup;
  // Dados para adicionar em Itens de Pedido
  formItens!:FormGroup;
  
  constructor(private produtoService:ProdutoService) { }

  ngOnInit(): void { 
    // Recuperar o carrinho atualizado no LocalStorage
    this.RecuperarCarrinho();
    // Recuperar o Itens de Pedido atualizado no LocalStorage
    this.CarregarItensPedido();
    // Carregar dados do produto atual
    this.CarregarProduto();
    // Instanciando o formulário para Carrinho
    this.formulario = new FormGroup({
      // Incluindo os campos do Produto
      // Estes campos virão do model Produto
      id: new FormControl(),
      nome: new FormControl(),
      quantidade: new FormControl(),
      descricao: new FormControl(),
      preco: new FormControl()
    });
    // Inicializando formulário do carrinho
    // com os dados do produto selecionado
    this.formulario.value.id = this.produto.id;
    this.formulario.value.nome = this.produto.nome;
    this.formulario.value.descricao = this.produto.descricao;
    this.formulario.value.preco = this.produto.preco;
    // Instanciando o formulário para Itens de Pedido
    this.formItens = new FormGroup({
      // Incluindo os campos de Itens de Pedido
      // Estes campos virão do model Item
      produto: new FormBuilder().group({
        id: new FormControl()
      }),
      quantidade: new FormControl()
    });
    
  }

  cancelar() {
    // Disparando o evento para fechar o Modal Produto
    // Atributo mostrandoProduto do componente HOME setado para FALSE
    this.produtoService.sendClick();
  }

  //incremento da quantidade
  mais(){
    this.quantidade++;
  }

  //decremento da quantidade
  menos(){
    if(this.quantidade>1) {
      this.quantidade--;
    }
  }

  AdicionarAoCarrinho():void {
    // Atualizando a quantidade de itens do produto
    this.formulario.value.quantidade = this.quantidade;
    // Constante para recuperar todos os quantidades do formulário
    const PRODUTO: Produto = this.formulario.value;
    // Adicionar o produto do formulário ao carrinho
    this.carrinho.push(PRODUTO);
    // Armazenando dados no Local Storage
    localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
    // Atualizando Itens de Pedido
    // Estes dados comporão o JSON do pedido
    this.formItens.value.produto.id=this.formulario.value.id;
    this.formItens.value.quantidade=this.quantidade;
    // Constante para recuperar todos os valores do formulário de Itens de Pedido
    const ITEM_PEDIDO: Item = this.formItens.value;
    // Adicionar item de pedido
    this.itensPedido.push(ITEM_PEDIDO);
    // Armazenando dados no Local Storage
    localStorage.setItem("itensPedido", JSON.stringify(this.itensPedido));
    // Fechando o modal
    this.cancelar();
  }

  CarregarProduto(): void {
     // Verificando se Produto existe no LocalStorage
     // Se existir, carregar dados do produto selecionado pelo usuário
     // Estes dados foram gravados pelo componente Product
     if(localStorage.getItem("produtoModal")) {
      // Adicionar produtos do carrinho no array de produtos (atributo "carrinho")
      this.produto = JSON.parse(localStorage.getItem("produtoModal"));
    } else {
      // Produto não existe no LocalStorage. Inicializar com vazio.
      this.produto = JSON.parse("");;
    }
  }

  RecuperarCarrinho(): void {
     // Verificando se Carrinho existe no LocalStorage
     // Carrinho será atualizado com a inserção do produto
     // e gravado novamente no LocalStorage
     if(localStorage.getItem("carrinho")) {
        // Adicionar produtos do carrinho no array de produtos (atributo "carrinho")
        this.carrinho = JSON.parse(localStorage.getItem("carrinho"));
      } else {
        // Carrinho não existe no LocalStorage. Inicializar array vazio.
        this.carrinho = [];
      }
  }

  CarregarItensPedido(): void {
    // Verificando se Itens de Pedido existe no LocalStorage
    // Estes dados comporão o JSON do pedido
    if(localStorage.getItem("itensPedido")) {
      // Adicionar Itens de Pedido no array de itens de pedido
      this.itensPedido = JSON.parse(localStorage.getItem("itensPedido"));
    } else {
      // Carrinho não existe no LocalStorage. Inicializar array.
      this.itensPedido = [];
    } 
  }

  total(){
    // Calcular total do item
    return `Total R$ ${this.quantidade*this.produto.preco}`;
  }
}
