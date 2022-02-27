import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminshopComponent } from './components/adminshop/adminshop.component';
import { BanksComponent } from './components/banks/banks.component';
import { BasketComponent } from './components/basket/basket.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';
import { MoneyComponent } from './components/money/money.component';
import { OrderlistComponent } from './components/orderlist/orderlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShopUserComponent } from './components/shop-user/shop-user.component';
import { ShopsComponent } from './components/shops/shops.component';
import { ShowreportshopComponent } from './components/showreportshop/showreportshop.component';
import { StockComponent } from './components/stock/stock.component';
import { TypestokComponent } from './components/typestok/typestok.component';
import { LoginGuard } from './guards/login.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
  canActivate: [LoginGuard],
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
        path: 'userBasket',
        component: BasketComponent
      },
      {
        path: 'Profile',
        component: ProfileComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'shopreport',
        component: ShowreportshopComponent
      }


    ]
  },
  {
    canActivate: [LoginGuard],
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'adminshop',
        component: AdminshopComponent
      },
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
      },
      {
        path: 'money',
        component: MoneyComponent
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
