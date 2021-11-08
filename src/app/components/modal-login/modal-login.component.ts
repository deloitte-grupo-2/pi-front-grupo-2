import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';

import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente';

import { ClienteService } from 'src/app/services/cliente.service';

interface response{
  msg:string,
  token: string,
  email:string
}

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  @Output() onCancelarClick:EventEmitter<null> = new EventEmitter();
  @Output() onCadastrarClick:EventEmitter<null> = new EventEmitter();

  form!: FormGroup;
  submitted: boolean = false;

  falhou: boolean = false;

  constructor(
    private service:ClienteService,
    private router:Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
    });
  }

  cancelar(){
    this.onCancelarClick.emit();
  }

  cadastrar(){
    this.onCancelarClick.emit();
    this.onCadastrarClick.emit();
  }

  get campoForm(): {[key: string]: AbstractControl} {
    return this.form.controls;
  }
  
  onSubmit(cliente:any){
    this.submitted = true;
   
    if (this.form.invalid) {
      return;
    }
          
    this.service.logarCliente(cliente).subscribe(
      {
      next: data =>{
        window.sessionStorage.setItem("token", (<response>data).token);
        ClienteService.usuario.email = (<response>data).email;
        this.cancelar();
        },
      error: err => {
        console.log(err),
        this.falhou = true
      }
      });
     
  }

  salvandoCliente() {
    console.log("cheguei");
    return new Promise(resolve => {
      setTimeout(() => {
        resolve( 
          this.service.consultarClientePorEmail(ClienteService.usuario.email).subscribe(
            {
              next: cliente => {
                localStorage.setItem("cliente", JSON.stringify(cliente));
                window.location.reload();
             },
              error: err => {
              console.error(err)
              }
            }
          )
         );
      }, 1000);
    });
  }    

}


