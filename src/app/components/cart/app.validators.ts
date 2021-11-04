import { FormControl, Validators } from "@angular/forms";

export class AppCustomDirective extends Validators{

    static fromDateValidator(fdValue: FormControl) {
        // Recuperando valor do campo Data de Agendamento
        let agendamento = fdValue.value;
        console.log('Entrou no app.validator');
        if (agendamento ==null || agendamento=='' || agendamento=='undefined') {
            // Verificando se Agendamento existe no LocalStorage
            // Se estiver editando o carrinho, carregar o agendamento definido anteriormente
            if(!(localStorage.getItem("entrega")=="undefined" || localStorage.getItem("entrega")=="")) {
                fdValue.setValue(JSON.parse(localStorage.getItem("entrega")));
                console.log("Recuperada data do LocalStorage");
                return false;
            }            
            console.log("Data inválida!");
            console.log("");
            return { requiredFromDate: true };
        } else {
            console.log(agendamento);
            localStorage.setItem("entrega", JSON.stringify(agendamento));
            console.log("Ir para fechamento do pedido");
            console.log("");
            return { requiredFromDate: false };
        }      
      }
}