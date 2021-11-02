import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
// Atribuir um ID apara o Produto
import { Guid } from 'guid-typescript';
// Ícone para marcar comprado/não comprado
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// Formulário com os Produtos
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


  // // Referente a data do pedido - 3 dias antes
    // minDate() = new Date();
    // maxDate() = new Date(2021, 11, 12);


export class CartComponent implements OnInit {

  // Controlando o ícone Comprado/Não comprado
  faCheckCircle = faCheckCircle;
  // Criando o array de Produtos
  carrinho: Produto[];
  // Criando o formulário que armazenará os Produtos
  // Inicialmente não tem um tipo definido
  formulario:any;

  constructor() { }

  ngOnInit(): void {
    // Exibir dados do carrinho no LocalStorage
    this.ExibirProdutos();
    // Instanciando o formulário
    this.formulario = new FormGroup({
      // Incluindo os campos do Produto
      // Estes campos virão do modal Produto
      // imagem: new FormControl(),
      produtoId: new FormControl(),
      nome: new FormControl(),
      quantidade: new FormControl(),
      // descricao: new FormControl(),
      // preco: new FormControl(),
      isComprado: new FormControl(),
    });

  }
  
  CadastrarProduto(): void {
    this.formulario.value.produtoId = Guid.create().toString();
    this.formulario.value.isComprado = false;
    // Constante para recuperar todos os valores do formulário
    const PRODUTO: Produto = this.formulario.value;
    // Adicionar o produto do formulário ao carrinho
    this.carrinho.push(PRODUTO);
    // Armazenando dados no Local Storage
    localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
    // Resetando o formulário
    this.formulario.reset();
  }

  ExibirProdutos(): void {
    // Verificando se Carrinho existe no LocalStorage
    if(localStorage.getItem("carrinho")) {
      // Adicionar produtos do carrinho no array de produtos (atributo "carrinho")
      this.carrinho = JSON.parse(localStorage.getItem("carrinho"));
    } else {
      // Carrinho não existe no LocalStorage. Inicializar array.
      this.carrinho = [];
    }
  }

  AtualizarProduto(produtoId: string): void {
    // Localizar produto no array (carrinho)
    const INDICE: number = this.carrinho.findIndex(
      (p) => p.produtoId === produtoId
      );
    // Verificar se o produto está marcado como comprado
    // this.carrinho[INDICE].isComprado = !(this.carrinho[INDICE].isComprado);
    
    if(this.carrinho[INDICE].isComprado) {
      this.carrinho[INDICE].isComprado = false;
    } else {
      this.carrinho[INDICE].isComprado = true;
    }

    // Gravando alterações no LocalStorage
    localStorage.setItem("carrinho",JSON.stringify(this.carrinho));
  }

}
