import { Component, NgModule, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
// Formulário com os Produtos
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Item } from 'src/app/models/Item';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  // Criando o array de Produtos
  carrinho!: Produto[];
  // Criando itens de pedido
  itensPedido!:Item[];
  // Criando o formulário que armazenará os Produtos
  formulario!:FormGroup;
  // Criando o formulário que armazenará os Itens de Pedido
  formItens!:FormGroup;
  // Definindo datas mínima e máxima para agendamento
  // Controlará o comportamento do calendário
  minDate:Date;
  maxDate:Date;
  // Data de entrega agendada
  agendamento!:Date;
  // Controlando o subtotal da compra
  subTotalCompra:number;
  // Calculando o frete
  frete:number;
  // Gravando a data de agendamento

  constructor(private formBuilder:FormBuilder, private router:Router) {
    // Recuperando o ano atual
    const DATAATUAL = new Date();
    // Data mínima para pedido: 3 dias corridos da data atual
    this.minDate = new Date(DATAATUAL.getFullYear(),DATAATUAL.getMonth(),DATAATUAL.getDay()+3);
    // Data máxima para pedido: 30 dias corridos da data atual
    this.maxDate = new Date(DATAATUAL.getFullYear(),DATAATUAL.getMonth(),DATAATUAL.getDay()+30);
    // Inicializando o total da compra
    this.subTotalCompra=0;
    // Inicializando o frete
    this.frete=40;
   }

  ngOnInit(): void {
    // Exibir dados do carrinho armazenados no LocalStorage
    this.CarregarCarrinho();
    // Carregar Itens de Pedido armazenados no LocalStorage
    this.CarregarItensPedido();
    // Verificar se já havia sido definido agendamento
    this.CarregarAgendamento();
    // Instanciando o formulário
    this.formulario = new FormGroup({
      // Incluindo os campos do Produto
      // Estes campos virão do modal Produto
      id: new FormControl(),
      nome: new FormControl(),
      quantidade: new FormControl(),
      // descricao: new FormControl(),
      preco: new FormControl()
    });
    // Instanciando o formulário para Itens de Pedido
    // Estes dados comporão o JSON do pedido
    this.formItens = new FormGroup({
      // Incluindo os campos de Itens de Pedido
      // Estes campos virão do model Item
      produto: new FormBuilder().group({
        id: new FormControl()
      }),
      quantidade: new FormControl()
    });

  }

  CarregarCarrinho(): void {
    // Verificando se Carrinho existe no LocalStorage
    if(localStorage.getItem("carrinho")) {
      // Adicionar produtos do carrinho no array de produtos (atributo "carrinho")
      this.carrinho = JSON.parse(localStorage.getItem("carrinho"));
      // Atualizar total da compra
      this.AtualizarTotalCompra();
    } else {
      // Carrinho não existe no LocalStorage. Inicializar array.
      this.carrinho = [];
    }
  }

  RemoverProduto(produtoId: string): void {
    // Localizar produto no array (carrinho)
    const INDICE: number = this.carrinho.findIndex(
      (p) => p.id === produtoId
      );
    // Excluindo produto do carrinho
    this.carrinho.splice(INDICE,1);
    // Excluindo produto de item de pedido
    this.itensPedido.splice(INDICE,1);
    // Atualizar total da compra
    this.AtualizarTotalCompra();
    // Gravando alterações no LocalStorage
    localStorage.setItem("carrinho",JSON.stringify(this.carrinho));
    // Itens de Pedido
    localStorage.setItem("itensPedido", JSON.stringify(this.itensPedido));
  }

  //incremento da quantidade
  IncrementarQuantidade(produtoId: string): void{
    // Localizar produto no array (carrinho)
    const INDICE: number = this.carrinho.findIndex(
      (p) => p.id === produtoId
      );
    //Incrementar a quantidade no carrinho
    this.carrinho[INDICE].quantidade++;
    //Incrementar a quantidade em itens de pedido
    this.itensPedido[INDICE].quantidade++;
    // Atualizar total da compra
    this.AtualizarTotalCompra();
    // Gravando alterações no LocalStorage
    // Carrinho
    localStorage.setItem("carrinho",JSON.stringify(this.carrinho));
    // Itens de Pedido
    localStorage.setItem("itensPedido", JSON.stringify(this.itensPedido));
  }

  //decremento da quantidade
  DecrementarQuantidade(produtoId: string): void{
    // Localizar produto no array (carrinho)
    const INDICE: number = this.carrinho.findIndex(
      (p) => p.id === produtoId
      );
    //Decrementar a quantidade
    if(this.carrinho[INDICE].quantidade>1) {
      this.carrinho[INDICE].quantidade--;
      this.itensPedido[INDICE].quantidade--;
    }
    // Atualizar total da compra
    this.AtualizarTotalCompra();
    // Gravando alterações no LocalStorage
    // Carrinho
    localStorage.setItem("carrinho",JSON.stringify(this.carrinho));
    // Itens de Pedido
    localStorage.setItem("itensPedido", JSON.stringify(this.itensPedido));
  }

  AtualizarTotalCompra(): void {
    // Reinicializar totalCompra
    this.subTotalCompra=0; 
    this.carrinho.forEach(produto => {
      // Atualizando o valor da compra
      this.subTotalCompra=this.subTotalCompra+(produto.quantidade*produto.preco);  
    });
  }

  CarregarAgendamento(): void {
    // Verificando se Agendamento existe no LocalStorage
    // Se estiver editando o carrinho, carregar o agendamento definido anteriormente
    if(localStorage.getItem("entrega")) {
      // Adicionar produtos do carrinho no array de produtos (atributo "carrinho")
      if(!(localStorage.getItem("entrega")=="undefined")) {
        this.agendamento = JSON.parse(localStorage.getItem("entrega"));
      } 
    }    
  }

  GravarAgendamento(): void {
    // Armazenando agendamento de entrega no Local Storage
    localStorage.setItem("entrega", JSON.stringify(this.agendamento));
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

  LimparCarrinho(): void {
    // Excluindo chaves do LocalStorage
    localStorage.removeItem("carrinho");
    localStorage.removeItem("itensPedido");
    localStorage.removeItem("entrega");
    localStorage.removeItem("produtoModal");
    sessionStorage.removeItem("token");
    // Atualizando carrinho
    this.CarregarCarrinho();
    // Reccaregando a página para reinicializar o calendário
    this.router.navigateByUrl("/carrinho");
  }
}
