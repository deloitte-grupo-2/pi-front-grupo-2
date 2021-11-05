import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.css']
})
export class CriarProdutoComponent implements OnInit {
  
  @Output() onCloseModalClick:EventEmitter<null> = new EventEmitter()

  cadastrou: boolean = false;

  falhou: boolean = false;

  novoProduto:Produto = {
    id: "",
    nome: "",
    descricao: "",
    preco: 0,
    imagemUrl: ""
  }

  constructor(private produtoService:ProdutoService) { }

  ngOnInit(): void {
  }

  sair(){
    console.log("Pedindo para sair");
    this.onCloseModalClick.emit()
  }

  salvar(){
    this.produtoService.criarProduto(this.novoProduto).subscribe({
      next: produto => {
        this.novoProduto = produto;
        console.log(this.novoProduto);
        this.novoProduto ={
          nome: "",
          descricao: "",
          preco: 0,
          imagemUrl: ""
      }
      this.cadastrou = true;
      this.falhou = false;
      },
      error: err => {
        console.error(err); 
        this.falhou = true;
        this.cadastrou = false;
      }
    })

}

}
