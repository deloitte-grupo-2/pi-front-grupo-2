import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  // Controlando o subtotal da compra
  subTotalCompra: number;
  // Calculando o frete
  frete: number;
  // Data de entrega agendada
  agendamento!: Date;
  // Criando o array de Produtos
  carrinho!: Produto[];
  // Criando itens de pedido
  itensPedido!: Item[];
  // Formulário com dados do cliente (atualmente, ID hard coded)
  formCliente!: FormGroup;
  // Carregando cliente logado
  cliente!: Cliente;

  mostrandoLogin = false;
  mostrandoCadastro = false;
  mostrandoProduto = false;

  //Injetando construtor do formulário e o serviço para Pedido
  constructor(private formBuilder: FormBuilder, private pedidoService: PedidoService) {
    // Objeto dos Correios
    // const { calcularPrecoPrazo } = require('correios-brasil');
    // Incializar subTotalCompra
    this.subTotalCompra = 0;
    // Inicializar frete
    this.frete = 40;
  }

  ngOnInit(): void {
    // Verficando se o usuário está logado
    if(!sessionStorage.getItem("token")) {
      this.mostrandoLogin=true;
      return;
    } else {
      // Carregar dados do Cliente logado
      this.CarregarCliente();
    }
    
    // Carregando dados do Carrinho e agendamento
    this.CarregarCarinho();
    this.CarregarAgendamento();
    this.CarregarItensPedido();
    // Instanciando o formulário para Itens de Pedido
    this.formCliente = new FormGroup({
      // Configurando ID do Cliente
      id: new FormControl()
    });
    // Configurar cliente padrão
    this.formCliente.value.id = 1;
  }

  CarregarCarinho(): void {
    // Verificando se Carrinho existe no LocalStorage
    if (localStorage.getItem("carrinho")) {
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
    if (localStorage.getItem("itensPedido")) {
      // Adicionar Itens de Pedido no array de itens de pedido
      this.itensPedido = JSON.parse(localStorage.getItem("itensPedido"));
    } else {
      // Carrinho não existe no LocalStorage. Inicializar array.
      this.itensPedido = [];
    }
  }

  AtualizarTotalCompra(): void {
    // Reinicializar totalCompra
    this.subTotalCompra = 0; //120 //200
    this.carrinho.forEach(produto => {
      // Atualizando o valor da compra
      this.subTotalCompra = this.subTotalCompra + (produto.quantidade * produto.preco);
    });
  }

  CarregarAgendamento(): void {
    // Verificando se Agendamento existe no LocalStorage
    if (localStorage.getItem("entrega")) {
      // Verificando a data de agendamento está definida
      if (localStorage.getItem("entrega") == "undefined") {
        const DATAATUAL = new Date();
        // Inicializar com regra de negócio: Data Atual + 3 dias corridos
        this.agendamento = new Date(DATAATUAL.getFullYear(), DATAATUAL.getMonth(), DATAATUAL.getDay() + 3);
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
      this.agendamento = new Date(DATAATUAL.getFullYear(), DATAATUAL.getMonth(), DATAATUAL.getDay() + 3);
      // Armazenando agendamento de entrega no Local Storage
      localStorage.setItem("entrega", JSON.stringify(this.agendamento));
    }
  }

  FecharPedido(): void {
    // Gravando ID do Cliente
    const CLIENTE: ClienteID = this.formCliente.value;
    // Gerando o pedido através do Service
    this.pedidoService.CriarPedido(new Pedido(CLIENTE, this.agendamento, "dinheiro", this.itensPedido, this.subTotalCompra + this.frete)).subscribe(
      {
        next: data => {
          console.log(data);
        },
        error: err => console.log(err),
        complete: () => console.log("Observável finalizado")
      });
    console.log("Requisição enviada. Verifique o BD");
    // Limpando o carrinho
    this.carrinho = [];
    // Limpando Itens de Pedido
    this.itensPedido = [];
    // Excluindo chaves do LocalStorage
    localStorage.removeItem("carrinho");
    localStorage.removeItem("itensPedido");
    localStorage.removeItem("entrega");
    localStorage.removeItem("produtoModal");
    this.subTotalCompra = 0;
    this.frete = 0;
  }

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

}