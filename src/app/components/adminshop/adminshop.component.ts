import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';
import { ReqCreateShop, ReqShop, ReqUpdateShop, ResCreateShop, ResShop } from 'src/app/services/interface/adminShop.interface';
import { ReqCustomer, ResCustomer } from 'src/app/services/interface/customer.interface';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-adminshop',
  templateUrl: './adminshop.component.html',
  styleUrls: ['./adminshop.component.scss']
})
export class AdminshopComponent implements OnInit {

  ngData = {
    perPages: 100,
    page: 1,
  };

  CreateShop = {
    shopName: '',
    customerId: ''
  };

  ngUpdateShop = {
    id: '',
    shopName: '',
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

  DataShop: ResShop = null;

  resCreateShop: ResCreateShop = null;

  DataCustomer: ResCustomer = null;

  SelectedFile: File = null;
  url: any;
  constructor(private callApi: ApiService) { }

  ngOnInit(): void {
    this.ShowShop();
    this.ShowCustomer();
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

  ShowShop() {
    const body: ReqShop = {
      perPage: this.ngData.perPages,
      page: this.ngData.page
    };
    this.callApi.getShop(body).subscribe(
      (res) => {
        this.DataShop = res;
      }
    );
  }

  onFileSelected(event) {
    this.SelectedFile = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.url = reader.result;

      reader.readAsDataURL(file);
      console.log('this URL ', this.url);
  }
  }

  uploadImg() {
    this.callApi.uploadImgPre(this.SelectedFile, this.ngUpdateShop.id).subscribe(
      (res) => {
        console.log(res);
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
        this.callApi.DeleteShop(id).subscribe(
          (res) => {
            this.ShowShop();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  createDataShop() {
    const body: ReqCreateShop = {
      shopName: this.CreateShop.shopName,
      customerId: Number(this.CreateShop.customerId)
    };

    // tslint:disable-next-line:max-line-length
    if (!this.CreateShop.shopName || !this.CreateShop.customerId) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.createShop(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'ลงชื่อเข้าใช้เรียบร้อยแล้ว'
        });
        this.resCreateShop = res;
        this.ShowShop();
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
    const DataUpdateShop = this.DataShop.data.find((a) => a.id === id);
    if (!DataUpdateShop) {
      console.log('1');
      return;
    }
    this.ngUpdateShop = {
      id: DataUpdateShop.id.toString(),
      shopName: DataUpdateShop.shopName,
    };

    $('#contentUpdateShop').modal('show');
  }

  updateShop() {
    const body: ReqUpdateShop = {
      id: Number(this.ngUpdateShop.id),
      shopName: this.ngUpdateShop.shopName
    };
    if (!body.shopName) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.updateShop(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว'
        });
        this.uploadImg();
        this.ShowShop();
        this.hideModalUpdate();
      }
    );
  }

  openModelCreateShop() {
    $('#contentCreatShop').modal('show');
    console.log('1');
  }
  hideModalUpdate() {
    $('#contentUpdateShop').modal('hide');
    this.EmptyUpdateData();
  }
  EmptyUpdateData() {
    this.ngUpdateShop = {
      id: '',
      shopName: '',
    };
    this.SelectedFile = null;
  }
  hideModal() {
    $('#contentCreatShop').modal('hide');
    this.EmptyData();
  }
  EmptyData() {
    this.CreateShop = {
      shopName: '',
      customerId: ''
    };
  }

}
