import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  images = [
    {
      path: 'assets/Imagens/Carrossel2.jpeg'
    },
    {
      path: 'assets/Imagens/Carrossel3.jpeg'
    },
    {
      path: 'assets/Imagens/Carrossel4.jpeg'
    },
    {
      path: 'assets/Imagens/Carrossel5.jpeg'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
