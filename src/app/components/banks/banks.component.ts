import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';
import { ReqBanks, ReqCreateBanks, ReqUpdateBanks, ResBanks, ResBanksData, ResCreateBanks } from 'src/app/services/interface/banks.interface';
import { DataIsLogin } from 'src/app/services/interface/customer.interface';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit {

  DataBanks: ResBanks = null;

  resCreateBanks: ResCreateBanks = null;

  DataIsLogin: DataIsLogin = null;

  ngData = {
    perPages: 100,
    page: 1,
  };

  ngBanks = {
    bankName: '',
    firstName: '',
    lastName: '',
    typeBk: '',
    accountNumber: '',
    branch: ''
  };

  ngUpdateBanks = {
    id: '',
    bankName: '',
    firstName: '',
    lastName: '',
    typeBk: '',
    accountNumber: '',
    branch: ''
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

  constructor(private callApi: ApiService, private IsLogin: LoginService) {
    this.DataIsLogin = this.IsLogin.getLogin();
  }

  ngOnInit(): void {
    this.ShowBanks();
  }

  ShowBanks() {
    const body: ReqBanks = {
      perPage: this.ngData.perPages,
      page: this.ngData.page
    };
    this.callApi.getBanks(body).subscribe(
      (res) => {
        this.DataBanks = res;
      }
    );
  }

  createDataBanks() {
    const body: ReqCreateBanks = {
      bankName: this.ngBanks.bankName,
      firstName: this.ngBanks.firstName,
      lastName: this.ngBanks.lastName,
      typeBk: this.ngBanks.typeBk,
      accountNumber: this.ngBanks.accountNumber,
      branch: this.ngBanks.branch,
      id: this.DataIsLogin.id.toString()
    };

    // tslint:disable-next-line:max-line-length
    if (!this.ngBanks.bankName || !this.ngBanks.firstName || !this.ngBanks.lastName || !this.ngBanks.typeBk || !this.ngBanks.accountNumber || !this.ngBanks.branch) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.createBanks(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'ลงชื่อเข้าใช้เรียบร้อยแล้ว'
        });
        this.resCreateBanks = res;
        this.ShowBanks();
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

  openModelSureDeleted(id: number) {
    Swal.fire({
      title: 'ยืนยันการลบ?',
      text: 'คุณต้องการลบข้อมูลนี้หรอไหม!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช้, ต้องการลบ!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ลบข้อมูลแล้ว!',
          'ไฟล์ของคุณถูกลบไปแล้ว.',
          'success'
        );
        this.callApi.DeleteBanks(id).subscribe(
          (res) => {
            this.ShowBanks();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  ShowUpdateBanks(id: number) {
    const DataUpdateBanks = this.DataBanks.data.find((a) => a.id === id);
    if (!DataUpdateBanks) {
      console.log('1');
      return;
    }
    this.ngUpdateBanks = {
      id: DataUpdateBanks.id.toString(),
      bankName: DataUpdateBanks.bankName,
      firstName: DataUpdateBanks.firstName,
      lastName: DataUpdateBanks.lastName,
      typeBk: DataUpdateBanks.typeBk,
      accountNumber: DataUpdateBanks.accountNumber,
      branch: DataUpdateBanks.branch
    };

    $('#contentUpdateBanks').modal('show');
  }

  updateBanks() {
    const body: ReqUpdateBanks = {
      id: Number(this.ngUpdateBanks.id),
      bankName: this.ngUpdateBanks.bankName,
      firstName: this.ngUpdateBanks.firstName,
      lastName: this.ngUpdateBanks.lastName,
      typeBk: this.ngUpdateBanks.typeBk,
      accountNumber: this.ngUpdateBanks.accountNumber,
      branch: this.ngUpdateBanks.branch
    };
    if (!body.bankName || !body.firstName || !body.lastName || !body.lastName || !body.typeBk || !body.accountNumber || !body.branch) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.updateBanks(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว'
        });
        this.ShowBanks();
        this.hideModalUpdate();
      }
    );
  }

  openModelCreatBanks() {
    $('#contentCreatBanks').modal('show');
    console.log('1');
  }

  hideModal() {
    $('#contentCreatBanks').modal('hide');
    this.EmptyData();
  }

  hideModalUpdate() {
    $('#contentUpdateBanks').modal('hide');
    this.EmptyUpdateData();
  }

  EmptyUpdateData(){
    this.ngUpdateBanks = {
      id: '',
      bankName: '',
      firstName: '',
      lastName: '',
      typeBk: '',
      accountNumber: '',
      branch: ''
    };
  }

  EmptyData() {
    this.ngBanks = {
      bankName: '',
      firstName: '',
      lastName: '',
      typeBk: '',
      accountNumber: '',
      branch: ''
    };
  }

}
