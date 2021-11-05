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
  quantidade: number = 0;

  produto:Produto = {
    nome: "Brigadeiro",
    descricao: "Melhor do mundo",
    imagemUrl:"saskasnkna",
    preco: 20
  }


  // Criando o array de Produtos
  carrinho!: Produto[];
  // Criando itens de pedido
  itensPedido!:Item[];
  // Criando o formulário do Produto selecionado
  // Formulários
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
    // Instanciando o formulário para Carrinho
    this.formulario = new FormGroup({
      // Incluindo os campos do Produto
      // Estes campos virão do model Produto
      // imagem: new FormControl(),
      produtoId: new FormControl(),
      nome: new FormControl(),
      quantidade: new FormControl(),
      descricao: new FormControl(),
      preco: new FormControl()
    });

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
    // this.onCancelarClick.emit();
    this.produtoService.sendClick();
    // console.log("Mostrando modal Produto por Componente Produto");
  }

  //incremento da quantidade
  mais(){
    this.quantidade++;
  }

  //decremento da quantidade
  menos(){
    if(this.quantidade>0) {
      this.quantidade--;
    }
  }

  AdicionarAoCarrinho():void {
    // Preenchedo quantidadees do formulário
    // quantidadees HARD CODED. Único dinâmico: quantidade
    // this.formulario.value.produtoId = Guid.create().toString();
    this.formulario.value.produtoId = 1;
    this.formulario.value.nome = "Brownie de Chocolate com Pimenta";
    this.formulario.value.quantidade = this.quantidade;
    this.formulario.value.descricao = "Brownie recheado com brigadeiro de chocolate com pimenta.";
    this.formulario.value.preco = 60;
    // Constante para recuperar todos os quantidadees do formulário
    const PRODUTO: Produto = this.formulario.value;
    // Adicionar o produto do formulário ao carrinho
    this.carrinho.push(PRODUTO);
    // Testando o formulário
    //console.log(this.formulario.value);
    // Armazenando dados no Local Storage
    localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
    // Resetando o formulário
    // this.formulario.reset();

    // Atualizando Itens de Pedido
    this.formItens.value.produto.id=this.formulario.value.produtoId;
    this.formItens.value.quantidade=this.quantidade;
    // Constante para recuperar todos os valores do formulário de Itens de Pedido
    const ITEM_PEDIDO: Item = this.formItens.value;
    // Adicionar item de pedido
    this.itensPedido.push(ITEM_PEDIDO);

    console.log(this.formItens.value);

    console.log(this.itensPedido);

    // Armazenando dados no Local Storage
    localStorage.setItem("itensPedido", JSON.stringify(this.itensPedido));
    // Fechando o modal
    this.cancelar();
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

  CarregarItensPedido(): void {
    // Se o carrinho estiver vazio, não há itens de Pedido
    // Verificando se Carrinho existe no LocalStorage
    if(localStorage.getItem("itensPedido")) {
      // Adicionar Itens de Pedido no array de itens de pedido
      this.itensPedido = JSON.parse(localStorage.getItem("itensPedido"));
    } else {
      // Carrinho não existe no LocalStorage. Inicializar array.
      this.itensPedido = [];
    } 
  }

  total(){
    return `Total R$ ${this.quantidade*60}`;
  }
}
