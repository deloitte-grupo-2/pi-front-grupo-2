import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';

import { Router } from '@angular/router';

import { ClienteService } from 'src/app/services/cliente.service';

interface response{
  msg:string,
  token: string
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
  submitted = false;

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
    
    console.log(JSON.stringify(this.form.value, null, 2));
    console.log(cliente);
    
    this.service.logarCliente(cliente).subscribe(
      {
      next: data =>{
        window.sessionStorage.setItem("token", (<response>data).token);
        this.router.navigateByUrl("/atualizar-cadastro");
        console.log(data);

        },
      error: err => console.log(err),
      complete: () => console.log("Observável finalizado")
      });

  }
 
  }


