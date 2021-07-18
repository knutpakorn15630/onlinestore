import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BanksComponent } from './components/banks/banks.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MembersComponent } from './components/members/members.component';
import { OrderlistComponent } from './components/orderlist/orderlist.component';
import { StockComponent } from './components/stock/stock.component';
import { TypestokComponent } from './components/typestok/typestok.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'stock',
        component: StockComponent
      },
      {
        path: 'member',
        component: MembersComponent
      },
      {
        path: 'orderlist',
        component: OrderlistComponent
      },
      {
        path: 'banks',
        component: BanksComponent
      },
      {
        path: 'typestok',
        component: TypestokComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
