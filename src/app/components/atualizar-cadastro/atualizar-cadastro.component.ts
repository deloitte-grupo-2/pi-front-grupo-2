import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { Endereco } from 'src/app/models/Endereco';
import { Telefone } from 'src/app/models/Telefone';

import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';

import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atualizar-cadastro',
  templateUrl: './atualizar-cadastro.component.html',
  styleUrls: ['./atualizar-cadastro.component.css']
})
export class AtualizarCadastroComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  teste:string = "teste";
  
  mostrandoLogin = false;
  mostrandoCadastro = false;
  mostrandoProduto = false;

  constructor(private formBuilder: FormBuilder, private service:ClienteService, private router:Router) {

  }

  ngOnInit(): void {
    
    let auxDois:any =localStorage.getItem("cliente");
    let aux = JSON.parse(auxDois);  

    let telefone:Telefone = {
        ddd: "",
        numero: "",
        tipo: ""
    } 

    let endereco:Endereco = {
      logradouro: "",
      numero: "",
      complemento: "",
      cep: "",
      apelido: ""
    }

    if (aux.cpf == null) {
      aux.cpf = "";
    }

    if (aux.telefone == null) {
      aux.telefone = telefone; 
    }

    if (aux.endereco == null) {
      aux.endereco = endereco;
    }


    this.form = this.formBuilder.group({
      nome:[`${aux.nome}`],
      cpf: [`${aux.cpf}`, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      email:[`${aux.email}`],
      telefone: this.formBuilder.group({ 
        ddd: [`${aux.telefone.ddd}`, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        numero: [`${aux.telefone.numero}`, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
        tipo: [`${aux.telefone.tipo}`, [Validators.required, Validators.minLength(9), Validators.maxLength(11)]],
      }),
      endereco: this.formBuilder.group({
        cep: [`${aux.endereco.cep}`, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
        logradouro: [`${aux.endereco.logradouro}`, [Validators.required]],
        numero: [`${aux.endereco.numero}`, [Validators.required]],
        complemento: [`${aux.endereco.complemento}`],
        apelido: [`${aux.endereco.apelido}`, [Validators.required, Validators.minLength(9), Validators.maxLength(11)]]
      })
    });
    
 
  }
 
  // Métodos da classe
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
    
  this.service.atualizarCliente(cliente).subscribe(
    {
    next: data =>{
      console.log(data);
      localStorage.setItem("cliente", JSON.stringify(cliente));
      this.router.navigateByUrl("");
      },
    error: err => {
    console.log(err)
    console.log(JSON.stringify(cliente));}
    });
}  
}