import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';
import { ReqBanks, ResBanks } from 'src/app/services/interface/banks.interface';
import { ReqBasket, ReqUpdateBasket, ReqUserBasket, ResUserBasket } from 'src/app/services/interface/basket.interface';
import { DataIsLogin, ReqGetAddress, ResGetAddress } from 'src/app/services/interface/customer.interface';
import { ReqCreateReport, ResCreateReport } from 'src/app/services/interface/report.interface';
import { ReqReportStock, ResReportStock } from 'src/app/services/interface/stock.interface';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { ProfileComponent } from '../profile/profile.component';
declare var $: any;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  DataUserBasket: ResUserBasket = null;

  DataIsLogin: DataIsLogin = null;

  DataCreateReport: ResCreateReport = null;

  DataResReportStock: ResReportStock = null;

  DataAddress: ResGetAddress = null;

  DataBanks: ResBanks = null;

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

  ngCreateReport = {
    id: '',
    orderCode: '',
    volume: '',
    price: '',
    orderStatus: '0',
    location: '',
    basketId: '',
    customerId: '',
    stocksId: ''
  };

  ngShowBasket = {
    productName: '',
    price: '',
    volume: '',
    total: '',
    customerId: '',
    stockId: ''
  };

  ngShowShop = {
    id: ''
  };

  ngData = {
    perPages: 10,
    page: 1,
  };

  SelectedFile: File = null;
  url: any;

  constructor(private callApi: ApiService, private IsLogin: LoginService) {
    this.DataIsLogin = this.IsLogin.getLogin();
  }

  ngOnInit(): void {
    this.ShowBasket();
    this.ShowAddress();
    this.ShowBanks();
  }

  ShowAddress() {
    const body: ReqGetAddress = {
      id: this.DataIsLogin.id,
    };
    this.callApi.getAddress(body).subscribe(
      (res) => {
        this.DataAddress = res;
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
    this.callApi.uploadImgPre(this.SelectedFile, this.DataCreateReport.id).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

  openModelSureUploadImg() {
    Swal.fire({
      title: 'ยืนยันการสั่งซื้อ?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช้, ต้องการลบ!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.callApi.uploadImgReport(this.SelectedFile, this.DataCreateReport.id).subscribe(
      (res) => {
        console.log(res);
      }
        );
      }
    });
  }


  ShowBanks() {
    const body: ReqBanks = {
      perPage: this.ngData.perPages,
      page: this.ngData.page
    };
    this.callApi.getBanks(body).subscribe(
      (res) => {
        this.DataBanks = res;
        console.log('wwwwwwww', this.DataBanks.data);
      }
    );
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

  ShowReportShop(id: any, BasketId: any) {
    const body: ReqReportStock = {
      id: Number(id)
    };
    this.callApi.getReportStock(body).subscribe(
      (res) => {
        this.ShowDataReportBasket(BasketId);
        this.DataResReportStock = res;
      }
    );
  }

  CreateReport() {

    const body: ReqCreateReport = {
      orderCode: this.ngCreateReport.orderCode,
      volume: Number(this.ngCreateReport.volume),
      price: this.ngCreateReport.price,
      orderStatus: 0,
      location: this.ngCreateReport.location,
      basketId: this.ngCreateReport.basketId,
      customerId: this.ngCreateReport.customerId,
      stocksId: this.ngCreateReport.stocksId,
    };

    // tslint:disable-next-line:max-line-length
    if (!this.ngCreateReport.orderCode || !this.ngCreateReport.volume || !this.ngCreateReport.price || !this.ngCreateReport.orderCode || !this.ngCreateReport.location || !this.ngCreateReport.basketId || !this.ngCreateReport.customerId || !this.ngCreateReport.stocksId) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    this.callApi.CreateReport(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'สั่งซื่้อของเรียบร้อยแล้ว',
        });
        this.DataCreateReport = res;
        this.hideModalCreate();
        this.openModelSureUploadImg();
        // setTimeout(() => {
        //       this.hideModalCreateDelete(this.ngCreateReport.id);
        // }, 3000);
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

  deleteBasket(id: any) {
    this.callApi.DeleteBasket(id).subscribe(
      (res) => {
        this.ShowBasket();
      },
      (err) => {
        console.log(err);
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
      total: Number(DataUpdateBasket.volume),
      price: Number(DataUpdateBasket.price)
    };
    console.log('show update', this.ngUpdateBasket);
    $('#contentUpdateBasket').modal('show');
  }


  ShowDataReportBasket(id: number) {
    const DataUpdateBasket = this.DataUserBasket.data.find((a) => a.id === id);
    if (!DataUpdateBasket) {
      console.log('1');
      return;
    }
    this.ngShowBasket = {
      productName: DataUpdateBasket.productName,
      price: DataUpdateBasket.price,
      volume: DataUpdateBasket.volume,
      total: DataUpdateBasket.total,
      customerId: DataUpdateBasket.customerId.toString(),
      stockId: DataUpdateBasket.stockId.toString()
    };
    const rndInt = 'TH' + Math.floor(Math.random() * 1000000000);

    this.ngCreateReport.orderCode = rndInt,
      this.ngCreateReport.id = id.toString(),
      this.ngCreateReport.volume = this.ngShowBasket.volume,
      this.ngCreateReport.price = this.ngShowBasket.total,
      this.ngCreateReport.basketId = id.toString(),
      this.ngCreateReport.customerId = this.ngShowBasket.customerId,
      this.ngCreateReport.stocksId = this.ngShowBasket.stockId.toString();
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

  ShowModalCreate(id: any) {
    $('#contentCreateReport').modal('show');
  }

  hideModalCreate() {
    $('#contentCreateReport').modal('hide');
    this.EmptyDataCreate();
  }

  hideModalCreateDelete(id: any) {
    this.deleteBasket(id);
    $('#contentCreateReport').modal('hide');
    this.EmptyDataCreate();
  }


  EmptyData() {
    this.ngUpdateBasket = {
      id: '',
      volume: '',
      price: 0,
      total: 0,
    };
  }

  EmptyDataCreate() {
    this.ngCreateReport = {
      id: '',
      orderCode: '',
      volume: '',
      price: '',
      orderStatus: '0',
      location: '',
      basketId: '',
      customerId: '',
      stocksId: ''
    };
  }

}
