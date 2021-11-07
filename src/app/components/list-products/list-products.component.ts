import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/Produto'

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  public produtos!: Produto[];

  // @Output() onMostrarProdutoClick:EventEmitter<null> = new EventEmitter();
  
  constructor(private produtoService:ProdutoService) { 
    this.produtoService.getProdutos().subscribe(
      {
        next: produtos => {
          this.produtos = produtos;
        },
        error: err => console.error(err)
      }
    )
  } 

  ngOnInit():void {}

}
