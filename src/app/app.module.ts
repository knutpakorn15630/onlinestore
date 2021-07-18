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

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    DashboardComponent,
    MembersComponent,
    OrderlistComponent,
    TypestokComponent,
    BanksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
