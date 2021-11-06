import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtualizarCadastroComponent } from './components/atualizar-cadastro/atualizar-cadastro.component';
import { CartComponent } from './components/cart/cart.component';
import { CriarProdutoComponent } from './components/criar-produto/criar-produto.component';
import { HomeComponent } from './components/home/home.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {
    path:"", component: HomeComponent
  },
  {
    path: "atualizar-cadastro", component: AtualizarCadastroComponent
  },
  {
    path: "carrinho", component: CartComponent    
  },
  {
    path: "cadastrar-produto",  component: CriarProdutoComponent
  },
  {
    path: "pedido", component: OrderComponent
  },
  {
    path: "pedido-status", component: OrderStatusComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
