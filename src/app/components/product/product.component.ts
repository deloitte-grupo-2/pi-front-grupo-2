import { Component, Input, OnInit } from '@angular/core';
import { ProdutoService } from "src/app/services/produto.service";
import { Produto } from 'src/app/models/Produto'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() produto!:Produto;
  
  constructor(private produtoService:ProdutoService) { }

  ngOnInit(): void {
  }

  mostrarProduto() {
    this.produtoService.sendClick();
    console.log("Mostrando modal Produto por Componente Produto");
  }
}
