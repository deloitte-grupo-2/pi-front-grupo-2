import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { Telefone } from 'src/app/models/Telefone';

import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';

import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-atualizar-cadastro',
  templateUrl: './atualizar-cadastro.component.html',
  styleUrls: ['./atualizar-cadastro.component.css']
})
export class AtualizarCadastroComponent implements OnInit {

  novoTelefone:Telefone = {
    ddd: "",
    numero: "",
    tipo: ""
  }


  form!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private service:ClienteService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome:[''],
      cpf: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      email:[''],
      senha:[''],
      telefone: this.formBuilder.group({
        ddd: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        numero: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
        tipo: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]],
      }),
      endereco: this.formBuilder.group({
        cep: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        tipo: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]]
      })
    });
  }


  // Acessando informações no formulário
  get campoForm(): {[key: string]: AbstractControl} {
    return this.form.controls;
  }

  //Acessando informações no formulário nesteado
  get campoTelefone(): {[key: string]: AbstractControl} { 
   return (this.form.get('telefone') as FormGroup).controls; 
  }

  get campoEndereco(): {[key: string]: AbstractControl} { 
    return (this.form.get('endereco') as FormGroup).controls; 
   }

onSubmit(cliente:Cliente){
  this.submitted = true;
  if (this.form.invalid) {
      return;
    }
  console.log(cliente);
  
  console.log(JSON.stringify(this.form.value, null, 2));
    
  this.service.atualizarCliente(cliente).subscribe(
    {
    next: data =>{
      
      console.log(data);

      },
    error: err => console.log(err),
    complete: () => console.log("Observável finalizado")
    });
}



}
