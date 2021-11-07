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

  admin: boolean = false;

  novoProduto:Produto = {
    nome: "",
    descricao: "",
    preco: 0,
    imagemUrl: ""
  }

  constructor(private produtoService:ProdutoService) { }

  ngOnInit(): void {
  }


  salvar(){
    let token = window.sessionStorage.getItem('token');
    if (token == 'Basic YWRtaW5Ac2Fsb20uY29tOmFkbWluc2Fsb20=') {
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
      this.admin = false;
      },
      error: err => {
        console.error(err); 
        this.falhou = true;
        this.cadastrou = false;
        this.admin = false;
      }
    })
    } else {
      this.admin = true;
    }
}
}
