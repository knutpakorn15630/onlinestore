import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BanksComponent } from './components/banks/banks.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';
import { OrderlistComponent } from './components/orderlist/orderlist.component';
import { ShopUserComponent } from './components/shop-user/shop-user.component';
import { ShopsComponent } from './components/shops/shops.component';
import { StockComponent } from './components/stock/stock.component';
import { TypestokComponent } from './components/typestok/typestok.component';



const routes: Routes = [
  {
  path: 'shops',
    component: ShopsComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'userShop',
        component: ShopUserComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      }
    ]
  },
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
        path: 'orderList',
        component: OrderlistComponent
      },
      {
        path: 'banks',
        component: BanksComponent
      },
      {
        path: 'typeStock',
        component: TypestokComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
