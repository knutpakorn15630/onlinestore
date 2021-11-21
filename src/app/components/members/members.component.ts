import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';
import { ReqCreateCustomer, ReqCustomer, ResCreateCustomer, ResCustomer } from 'src/app/services/interface/customer.interface';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  DataCustomer: ResCustomer = null;

  resCreateCustomer: ResCreateCustomer = null;

  ngData = {
    perPages: 10,
    page: 1,
  };

  ngCustomer = {
    userName: '',
    passWord: '',
    firstName: '',
    lastName: '',
    gmail: '',
    phoneNumber: ''
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

  constructor(private callApi: ApiService) { }

  ngOnInit(): void {
    this.ShowCustomer();
  }

  openModelCreatCustomer() {
    $('#contentCreatCustomer').modal('show');
    console.log('1');
  }

  hideModal() {
    $('#contentCreatCustomer').modal('hide');
    this.EmptyData();
  }

  EmptyData() {
    this.ngCustomer = {
      userName: '',
      passWord: '',
      firstName: '',
      lastName: '',
      gmail: '',
      phoneNumber: ''
    };
  }

  ShowCustomer() {
    const body: ReqCustomer = {
      perPage: this.ngData.perPages,
      page: this.ngData.page
    };
    this.callApi.getCustomer(body).subscribe(
      (res) => {
        this.DataCustomer = res;
      }
    );
  }

  createDeliver() {
    const body: ReqCreateCustomer = {
      userName: this.ngCustomer.userName,
      passWord: this.ngCustomer.passWord,
      firstName: this.ngCustomer.firstName,
      lastName: this.ngCustomer.lastName,
      gmail: this.ngCustomer.gmail,
      phoneNumber: this.ngCustomer.phoneNumber
    };

    // tslint:disable-next-line:max-line-length
    if (!this.ngCustomer.userName || !this.ngCustomer.passWord || !this.ngCustomer.firstName || !this.ngCustomer.lastName || !this.ngCustomer.gmail || !this.ngCustomer.phoneNumber) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.createReport(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'ลงชื่อเข้าใช้เรียบร้อยแล้ว'
        });
        this.resCreateCustomer = res;
        this.ShowCustomer();
        this.hideModal();
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

}
