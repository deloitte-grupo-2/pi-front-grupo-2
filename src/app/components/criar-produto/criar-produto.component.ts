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

  novoProduto:Produto = {
    nome: "",
    descricao: "",
    preco: 0,
    imagemUrl: ""
  }

  constructor(private produtoService:ProdutoService) { 
    this.produtoService.addProduto(this.novoProduto).subscribe({
      next: produto => {
        this.novoProduto = produto;
        console.log(this.novoProduto);
      },
      error: err => console.error(err) 
    })
  }

  ngOnInit(): void {
  }

  sair(){
    console.log("Pedindo para sair");
    this.onCloseModalClick.emit()
  }

  salvar(){
    this.produtoService.addProduto(this.novoProduto)
    this.novoProduto ={
      nome: "",
      descricao: "",
      preco: 0,
      imagemUrl: ""
  }
}

}
