import { Component, Input, OnInit } from '@angular/core';
import { ProdutoService } from "src/app/services/produto.service";
import { Produto } from 'src/app/models/Produto';
import { FormControl, FormGroup } from '@angular/forms';

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
    // Armazenando dados do produto selecionado no Local Storage
    // Estes dados serão recuperados no Modal Produto
    localStorage.setItem("produtoModal", JSON.stringify(this.produto));
  }
}
