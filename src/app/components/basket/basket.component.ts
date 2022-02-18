import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';
import { ReqBasket, ReqUpdateBasket, ReqUserBasket, ResUserBasket } from 'src/app/services/interface/basket.interface';
import { DataIsLogin } from 'src/app/services/interface/customer.interface';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  DataUserBasket: ResUserBasket = null;
  DataIsLogin: DataIsLogin = null;

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

  ngUpdateBasket = {
    id: '',
    volume: '',
    price: 0,
    total: 0,
  };

  constructor(private callApi: ApiService, private IsLogin: LoginService) {
    this.DataIsLogin = this.IsLogin.getLogin();
  }

  ngOnInit(): void {
    this.ShowBasket();
  }

  ShowBasket() {
    const body: ReqUserBasket = {
      id: this.DataIsLogin.id
    };
    this.callApi.getUserBasket(body).subscribe(
      (res) => {
        this.DataUserBasket = res;
      }
    );
  }

  ShowUpdateBasket(id: number) {
    const DataUpdateBasket = this.DataUserBasket.data.find((a) => a.id === id);
    if (!DataUpdateBasket) {
      console.log('1');
      return;
    }
    this.ngUpdateBasket = {
      id: DataUpdateBasket.id.toString(),
      volume: DataUpdateBasket.volume,
      total: Number(DataUpdateBasket.volume) ,
      price: Number(DataUpdateBasket.price)
    };
    console.log('show update', this.ngUpdateBasket);
    $('#contentUpdateBasket').modal('show');
  }

  updateBasket() {
    const body: ReqUpdateBasket = {
      id: Number(this.ngUpdateBasket.id),
      volume: this.ngUpdateBasket.volume,
      total: Number(this.ngUpdateBasket.volume) * this.ngUpdateBasket.price,
    };
    if (!body.volume || !body.total) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.UpdateBasket(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว'
        });
        this.ShowBasket();
        this.hideModalUpdate();
      }
    );
  }

  openModelSureDeleted(id: number) {
    Swal.fire({
      title: 'ยืนยันการลบ?',
      text: 'คุณต้องการลบข้อมูลสินค้านี้หรือไหม!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช้, ต้องการลบ!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ลบข้อมูลแล้ว!',
          'สินค้าของคุณถูกลบไปแล้ว.',
          'success'
        );
        this.callApi.DeleteBasket(id).subscribe(
          (res) => {
            this.ShowBasket();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  hideModalUpdate() {
    $('#contentUpdateBasket').modal('hide');
    this.EmptyData();
  }

  EmptyData() {
    this.ngUpdateBasket = {
      id: '',
      volume: '',
      price: 0,
      total: 0,
    };
  }

}
