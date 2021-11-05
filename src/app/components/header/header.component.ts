import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onAddContatoClick:EventEmitter<null> = new EventEmitter();

  mostrarModalClick(){
    console.log("Cliquei para abrir o modal!");
    this.onAddContatoClick.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

  ScrollIntoView(elem: string) {
    console.log(elem);
    document.querySelector(elem).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}
