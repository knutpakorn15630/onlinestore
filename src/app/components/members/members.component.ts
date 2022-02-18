import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';
import { ReqCreateCustomer, ReqCustomer, ReqUpdateCustomer, ResCreateCustomer, ResCustomer } from 'src/app/services/interface/customer.interface';
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
    phoneNumber: '',
    status: ''
  };

  ngUpdateCustomer = {
    id: '',
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
        this.callApi.DeleteCustomer(id).subscribe(
          (res) => {
            this.ShowCustomer();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  hideModal() {
    $('#contentCreatCustomer').modal('hide');
    this.EmptyData();
  }

  hideModalUpdate() {
    $('#contentUpdateCustomer').modal('hide');
    this.EmptyData();
  }

  EmptyData() {
    this.ngCustomer = {
      userName: '',
      passWord: '',
      firstName: '',
      lastName: '',
      gmail: '',
      phoneNumber: '',
      status: ''
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
      phoneNumber: this.ngCustomer.phoneNumber,
      status: Number(this.ngCustomer.status)
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
    this.callApi.createCustomer(body).subscribe(
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

  ShowUpdateShop(id: number) {
    const DataUpdateCustomer = this.DataCustomer.data.find((a) => a.id === id);
    if (!DataUpdateCustomer) {
      console.log('1');
      return;
    }
    this.ngUpdateCustomer = {
      id: DataUpdateCustomer.id.toString(),
      userName: DataUpdateCustomer.userName,
      passWord: DataUpdateCustomer.passWord,
      firstName: DataUpdateCustomer.firstName,
      lastName: DataUpdateCustomer.lastName,
      gmail: DataUpdateCustomer.gmail,
      phoneNumber: DataUpdateCustomer.phoneNumber
    };
    console.log('show update', this.ngUpdateCustomer);
    $('#contentUpdateCustomer').modal('show');
  }

  updateShop() {
    const body: ReqUpdateCustomer = {
      id: Number(this.ngUpdateCustomer.id),
      userName: this.ngUpdateCustomer.userName,
      passWord: this.ngUpdateCustomer.passWord,
      firstName: this.ngUpdateCustomer.firstName,
      lastName: this.ngUpdateCustomer.lastName,
      gmail: this.ngUpdateCustomer.gmail,
      phoneNumber: this.ngUpdateCustomer.phoneNumber
    };
    if (!body.userName || !body.passWord || !body.firstName || !body.lastName || !body.gmail || !body.phoneNumber) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.updateCustomer(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว'
        });
        this.ShowCustomer();
        this.hideModalUpdate();
      }
    );
  }
}
