import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteID } from 'src/app/models/ClienteId';
import { Item } from 'src/app/models/Item';
import { Pedido } from 'src/app/models/Pedido';
import { Produto } from 'src/app/models/Produto';
import { ClienteService } from 'src/app/services/cliente.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  //@Input() cliente!:Cliente;

  // Controlando o subtotal da compra
  subTotalCompra:number;
  // Calculando o frete
  frete:number;
  // Data de entrega agendada
  agendamento!:Date;
  // Criando o array de Produtos
  carrinho!:Produto[];
  // Criando itens de pedido
  itensPedido!:Item[];
  // Email para consultar Cliente
  email:string="brunosabia@gmail.com";

  formCliente!:FormGroup;
  

  // constructor(private clienteService:ClienteService) {
  //Injetando construtor do formulário e o serviço para Pedido
  constructor(private formBuilder:FormBuilder,private pedidoService:PedidoService) {
    // Incializar subTotalCompra
    this.subTotalCompra=0;
    // Inicializar frete
    this.frete=40;
   }

  ngOnInit(): void {
    this.CarregarCarinho();
    this.CarregarAgendamento();
    this.CarregarItensPedido();

    // Instanciando o formulário para Itens de Pedido
    this.formCliente = new FormGroup({
      // Incluindo os campos de Itens de Pedido
      // Estes campos virão do model Item
      //cliente: new FormBuilder().group({
        id: new FormControl()
      //})
    });

    // Configurar cliente padrão
    this.formCliente.value.id=1;
    console.log(this.formCliente.value);
  }

  CarregarCarinho(): void {
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

  AtualizarTotalCompra(): void {
    // Reinicializar totalCompra
    this.subTotalCompra=0; //120 //200
    this.carrinho.forEach(produto => {
      // Atualizando o valor da compra
      this.subTotalCompra=this.subTotalCompra+(produto.quantidade*produto.preco);  
    });
  }

  CarregarAgendamento(): void {
    // Verificando se Agendamento existe no LocalStorage
    if(localStorage.getItem("entrega")) {
      // Verificando a data de agendamento está definida
      if(localStorage.getItem("entrega")=="undefined") {
        const DATAATUAL = new Date();
        // Inicializar com regra de negócio: Data Atual + 3 dias corridos
        this.agendamento = new Date(DATAATUAL.getFullYear(),DATAATUAL.getMonth(),DATAATUAL.getDay()+3);
        // Armazenando agendamento de entrega no Local Storage
        localStorage.setItem("entrega", JSON.stringify(this.agendamento));
      } else {
        this.agendamento = JSON.parse(localStorage.getItem("entrega"));
      }
    } else {
      // Agendamento não existe no LocalStorage. 
      // Inicializar com regra de negócio: Data Atual + 3 dias corridos
      // Recuperando o ano atual
      const DATAATUAL = new Date();
      // Data mínima para pedido: 3 dias corridos da data atual
      this.agendamento = new Date(DATAATUAL.getFullYear(),DATAATUAL.getMonth(),DATAATUAL.getDay()+3);
      // Armazenando agendamento de entrega no Local Storage
      localStorage.setItem("entrega", JSON.stringify(this.agendamento));
    }    
  }

  FecharPedido(): void {
    // console.log(ItensJSON);
    // const itens:Item[]=new Array();
    // this.carrinho.forEach(produto => {
    //     console.log(produto);
    //     const constItem=itens.find(item => {
    //          item.produto=produto;
    //        })
    //        if(constItem) {
    //             console.log(constItem);
    //             constItem.quantidade=produto.quantidade;
    //          } else {
    //              itens.push(new Item(produto));
    //            }
    //         });   

    //this.pedidoService.CriarPedido(new Pedido(this.agendamento,"dinheiro",this.carrinho,this.frete));
    const CLIENTE:ClienteID=this.formCliente.value;
    this.pedidoService.CriarPedido(new Pedido(CLIENTE,this.agendamento,"dinheiro",this.itensPedido,this.subTotalCompra+this.frete));
    console.log("Requisição enviada. Verifique o BD");// var ItensJSON:string=this.pedidoService.ParserCarrinho(1,this.carrinho,this.agendamento,"em processamento",this.subTotalCompra+this.frete);
    
  }
        
}
