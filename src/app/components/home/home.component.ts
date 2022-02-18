import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';
import { ReqCreateBasket } from 'src/app/services/interface/basket.interface';
import { DataIsLogin } from 'src/app/services/interface/customer.interface';
import { ReqStock, ResStock } from 'src/app/services/interface/stock.interface';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ngPang = '15';

  ngData = {
    perPages: 10,
    page: 1,
  };

  ngCreateBasket = {
    productName: '',
    price: '',
    volume: '1',
    total: '',
    customerId: '',
    stockId: ''
  };

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  DataStock: ResStock;

  DataIsLogin: DataIsLogin = null;

  constructor(private callApi: ApiService, private IsLogin: LoginService) {
    this.DataIsLogin = this.IsLogin.getLogin();
  }

  ngOnInit(): void {
    this.ShowStock();

  }

  ShowStock() {
    const body: ReqStock = {
      perPage: this.ngData.perPages,
      page: this.ngData.page
    };
    this.callApi.getStock(body).subscribe(
      (res) => {
        this.DataStock = res;
      }
    );
  }

  ShowUpdateStock(id: number) {
    const DataUpdateStock = this.DataStock.data.find((a) => a.id === id);
    if (!DataUpdateStock) {
      console.log('ERROR PANG STOCK');
      return;
    }
    const body: ReqCreateBasket = {
      productName: DataUpdateStock.productName,
      price: Number(DataUpdateStock.price),
      volume: this.ngCreateBasket.volume,
      total: Number(DataUpdateStock.price),
      customerId: this.DataIsLogin.id.toString(),
      stockId: DataUpdateStock.id.toString()
    };
    this.callApi.CreateBasket(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'เพิ่มสินค้าลงในตระกล้าเรียยร้อยแล้ว'
        });
      },
      (err) => {
        console.log(err);
      }
    );

  }

}
