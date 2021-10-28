import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  mostrandoLogin = false;
  mostrandoCadastro = false;

  mostrarLogin(){
    this.mostrandoLogin = true;
  }

  esconderLogin(){
    this.mostrandoLogin = false;
  }
  
  mostrarCadastro(){
    this.mostrandoLogin = false;
    this.mostrandoCadastro = true;
  }

  esconderCadastro(){
    this.mostrandoCadastro = false;
  }

}
