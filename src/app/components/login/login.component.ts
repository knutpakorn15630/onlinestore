import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apis/api.service';
import { ReqCreateCustomer, ReqLogin, ResLogin } from 'src/app/services/interface/customer.interface';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: ResLogin;


  ngLogeIn = {
    username: '',
    password: ''
  };

  ngCustomer = {
    userName: '',
    passWord: '',
    firstName: '',
    lastName: '',
    gmail: '',
    phoneNumber: '',
    status: 1
  };

  constructor(private callApi: ApiService, private router: Router, private IsLogin: LoginService) { }

  ngOnInit(): void {
  }

  login() {
    const body: ReqLogin = {
      userName: this.ngLogeIn.username,
      password: this.ngLogeIn.password
    };
    this.callApi.getIsLogin(body).subscribe(
      (res) => {
        this.data = res;
        if (!res) {
          console.log('loin fail');
        } else {
          if (this.data.status === 0) {
            this.router.navigateByUrl('dashboard/orderList');
            this.data = res;
            this.IsLogin.setLogin(res);
          }
          if (this.data.status === 1) {
            this.router.navigateByUrl('shops/home');
            this.data = res;
            this.IsLogin.setLogin(res);
          }

        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'username password ไม่ถูกต้อง!',
        });
        console.log(err);
      }
    );
  }


  createCustomer() {
    const body: ReqCreateCustomer = {
      userName: this.ngCustomer.userName,
      passWord: this.ngCustomer.passWord,
      firstName: this.ngCustomer.firstName,
      lastName: this.ngCustomer.lastName,
      gmail: this.ngCustomer.gmail,
      phoneNumber: this.ngCustomer.phoneNumber,
      status: Number(this.ngCustomer.status)
    };

    // tslint:disable-next-line:max-line-length
    if (!this.ngCustomer.userName || !this.ngCustomer.passWord || !this.ngCustomer.firstName || !this.ngCustomer.lastName || !this.ngCustomer.gmail || !this.ngCustomer.phoneNumber || !this.ngCustomer.status) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.createCustomer(body).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'ทำการสมัครเรียบร้อยแล้ว',
          showConfirmButton: false,
          timer: 2000
        });
        this.EmptyData();
      },
      (err) => {
        Swal.fire({
          icon: 'warning',
          title: 'Username นี้ถูกใช้งานไปแล้ว กรุณณาตั้ง username!',
          showConfirmButton: false,
          timer: 2000
        });
        console.log(err);
      }
    );
  }

  EmptyData() {
    this.ngCustomer = {
      userName: '',
      passWord: '',
      firstName: '',
      lastName: '',
      gmail: '',
      phoneNumber: '',
      status: 1
    };
  }

}
