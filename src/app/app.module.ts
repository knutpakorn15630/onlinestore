import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockComponent } from './components/stock/stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MembersComponent } from './components/members/members.component';
import { OrderlistComponent } from './components/orderlist/orderlist.component';
import { TypestokComponent } from './components/typestok/typestok.component';
import { BanksComponent } from './components/banks/banks.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ShopsComponent } from './components/shops/shops.component';
import { HomeComponent } from './components/home/home.component';
import { ShopUserComponent } from './components/shop-user/shop-user.component';
import { ContactComponent } from './components/contact/contact.component';
import { BartPipe } from './services/bart.pipe';
import { AdminshopComponent } from './components/adminshop/adminshop.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShowreportshopComponent } from './components/showreportshop/showreportshop.component';
import { MoneyComponent } from './components/money/money.component';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    DashboardComponent,
    MembersComponent,
    OrderlistComponent,
    TypestokComponent,
    BanksComponent,
    LoginComponent,
    ShopsComponent,
    HomeComponent,
    ShopUserComponent,
    ContactComponent,
    BartPipe,
    AdminshopComponent,
    BasketComponent,
    ProfileComponent,
    ShowreportshopComponent,
    MoneyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
