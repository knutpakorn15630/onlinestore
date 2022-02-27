import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';
import { ReqShop, ResShop } from 'src/app/services/interface/adminShop.interface';
import { ReqCreateStock, ReqStock, ReqUpdateStock, ResCreateStock, ResStock } from 'src/app/services/interface/stock.interface';
import { ReqGetTypeStoke, ResGetTypeStoke } from 'src/app/services/interface/typestoke.interface';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  ngData = {
    perPages: 100,
    page: 1,
  };

  ngStock = {
    id: '',
    productName: '',
    volume: '',
    price: '',
    details: '',
    shopId: '',
    typeStockId: ''
  };

  ngUpdateStock = {
    id: '',
    productName: '',
    volume: '',
    price: '',
    details: ''
  };

  SelectedFile: File = null;
  url: any;

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

  DataStock: ResStock = null;

  DataShop: ResShop = null;

  DataTypeStoke: ResGetTypeStoke = null;

  resCreateStock: ResCreateStock = null;

  constructor(private callApi: ApiService) { }

  ngOnInit(): void {
    this.ShowStock();
    this.ShowShop();
    this.ShowTypeStoke();
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

  ShowTypeStoke() {
    const body: ReqGetTypeStoke = {
      perPage: this.ngData.perPages,
      page: this.ngData.page
    };
    this.callApi.getTypeStoke(body).subscribe(
      (res) => {
        this.DataTypeStoke = res;
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

  uploadStock(id: any) {
    this.callApi.uploadImgStock(this.SelectedFile, id).subscribe(
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
        this.callApi.DeleteStock(id).subscribe(
          (res) => {
            this.ShowStock();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  createStock() {
    const body: ReqCreateStock = {
      productName: this.ngStock.productName,
      volume: this.ngStock.volume,
      price: this.ngStock.price,
      details: this.ngStock.details,
      shopId: this.ngStock.shopId,
      typeStockId: this.ngStock.typeStockId
    };

    // tslint:disable-next-line:max-line-length
    if (!this.ngStock.productName || !this.ngStock.volume || !this.ngStock.price || !this.ngStock.details || !this.ngStock.shopId || !this.ngStock.typeStockId) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.createStock(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'เพิ่มข้อมูลเรียบร้อยแล้ว'
        });
        this.resCreateStock = res;
        this.ShowStock();
        this.uploadStock(this.resCreateStock.id);
        this.hideModal();
      },
      (err) => {
        Swal.fire({
          icon: 'warning',
          title: 'ERROR!',
          showConfirmButton: false,
          timer: 2000
        });
        console.log(err);
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

  ShowUpdateStock(id: number) {
    const DataUpdateStock = this.DataStock.data.find((a) => a.id === id);
    if (!DataUpdateStock) {
      console.log('1');
      return;
    }
    this.ngUpdateStock = {
      id: DataUpdateStock.id.toString(),
      productName: DataUpdateStock.productName,
      volume: DataUpdateStock.volume,
      price: DataUpdateStock.price,
      details: DataUpdateStock.details
    };
    $('#contentUpdateStock').modal('show');
  }

  updateStock() {
    const body: ReqUpdateStock = {
      id: Number(this.ngUpdateStock.id),
      productName: this.ngUpdateStock.productName,
      volume: this.ngUpdateStock.volume,
      price: this.ngUpdateStock.price,
      details: this.ngUpdateStock.details
    };
    if (!body.productName || !body.volume || !body.price || !body.details) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.updateStock(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว'
        });
        this.ShowStock();
        this.uploadStock(body.id);
        this.hideModalUpdate();
      }
    );
  }
  openModelCreateShop() {
    $('#contentCreatStock').modal('show');
    console.log('1');
  }
  hideModalUpdate() {
    $('#contentUpdateStock').modal('hide');
    this.EmptyUpdateData();
  }
  hideModal() {
    $('#contentCreatStock').modal('hide');
    this.EmptyData();
  }
  hideModalCreate() {
    $('#contentCreatStock').modal('hide');
    this.EmptyData();
  }
  EmptyData() {
    this.ngStock = {
      id: '',
      productName: '',
      volume: '',
      price: '',
      details: '',
      shopId: '',
      typeStockId: ''
    };
  }
  EmptyUpdateData() {
    this.ngUpdateStock = {
      id: '',
      productName: '',
      volume: '',
      price: '',
      details: ''
    };
  }
  random() {
    const random1 = Math.floor(Math.random() * 900000) + 100000;
    console.log('this. is a number', random1);
  }

}
