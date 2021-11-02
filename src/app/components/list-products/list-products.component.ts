import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  // @Output() onMostrarProdutoClick:EventEmitter<null> = new EventEmitter();
  
  constructor() { } 

  ngOnInit():void {}

}
