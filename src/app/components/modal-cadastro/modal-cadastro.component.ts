import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import Validation from 'src/app/utils/Validation';

@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.css']
})
export class ModalCadastroComponent implements OnInit {
  @Output() onCancelarClick:EventEmitter<null> = new EventEmitter();
  @Output() onLogarClick:EventEmitter<null> = new EventEmitter();

  form!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private service:ClienteService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      confirmarSenha: ['', Validators.required]
    },
    {
    validators: [Validation.match('senha', 'confirmarSenha')]
    });
  }

  logar(){
    this.onCancelarClick.emit();
    this.onLogarClick.emit();
  }

  get campoForm(): {[key: string]: AbstractControl} {
    return this.form.controls;
  }

  onSubmit(cliente:Cliente){
    console.log(cliente);

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2))
    
    this.service.criarCliente(cliente).subscribe(
      {
      next: data =>{
        this.logar();
        console.log(data);
        },
      error: err => console.log(err),
      complete: () => console.log("Observável finalizado")
      });
  }

  cancelar(){
    this.onCancelarClick.emit();
  }

}
