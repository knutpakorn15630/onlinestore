import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apis/api.service';
// tslint:disable-next-line:max-line-length
import { ReqCreateShop, ReqGetUserShop, ReqUpdateShop, ResCreateShop, ResGetUserShop } from 'src/app/services/interface/adminShop.interface';
import { ReqCreateBanks, ReqGetUserBanks, ReqUpdateBanks, ResCreateBanks, ResGetUserBanks } from 'src/app/services/interface/banks.interface';
import { DataIsLogin, ReqCreateAddress, ReqGetAddress, ReqUpdateAddress, ReqUpdateCustomer, ResCreateAddress, ResGetAddress } from 'src/app/services/interface/customer.interface';
import { ReqGetReport, ReqUpdateReport2, ReqUserReport, ResUserReport } from 'src/app/services/interface/report.interface';
import { ReqCreateStock, ReqUpdateStock, ReqUserStock, ResCreateStock, ResStock, ResUserStock } from 'src/app/services/interface/stock.interface';
import { ReqGetTypeStoke, ResGetTypeStoke } from 'src/app/services/interface/typestoke.interface';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { MembersComponent } from '../members/members.component';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  DataAddress: ResGetAddress = null;

  DataUserShop: ResGetUserShop = null;

  DataTypeStoke: ResGetTypeStoke = null;

  DataIsLogin: DataIsLogin = null;

  resCreateAddress: ResCreateAddress = null;

  resCreateStock: ResCreateStock = null;

  resCreateShop: ResCreateShop = null;

  DataResStock: ResUserStock = null;

  DataUserReport: ResUserReport = null;

  SelectedFile: File = null;

  resCreateBanks: ResCreateBanks = null;

  DataBanks: ResGetUserBanks = null;

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

  constructor(private callApi: ApiService, private IsLogin: LoginService, private router: Router) {
    this.DataIsLogin = this.IsLogin.getLogin();
  }


  ngCreateAddress = {
    name: '',
    customerId: null,
  };

  ngUpdateAddress = {
    id: '',
    addressName: '',
  };

  CreateShop = {
    shopName: '',
    customerId: ''
  };

  ngUpdateShop = {
    id: '',
    shopName: '',
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

  ngData = {
    perPages: 10,
    page: 1,
  };

  updateReport = {
    id: '',
    orderStatus: '',
    parcelNumber: ''
  };

  ngStockId = {
    id: '',
  };

  ngUpdateStock = {
    id: '',
    productName: '',
    volume: '',
    price: '',
    details: '',
    shopId: ''
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
  ngUpdateProfile = {
    // id: this.DataIsLogin.id,
    // userName: this.DataIsLogin.userName,
    // passWord: this.DataIsLogin.passWord,
    // firstName: this.DataIsLogin.firstName,
    // lastName: this.DataIsLogin.lastName,
    // gmail: this.DataIsLogin.gmail,
    // phoneNumber: this.DataIsLogin.phoneNumber
    id: '',
    userName: '',
    passWord: '',
    firstName: '',
    lastName: '',
    gmail: '',
    phoneNumber: ''
  };

  ngOnInit(): void {
    this.ShowAddress();
    this.ShowUserShop();
    this.ShowTypeStoke();
    this.ShowUserBanks();
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

  ShowUserBanks() {
    const body: ReqGetUserBanks = {
      id: this.DataIsLogin.id,
    };
    this.callApi.getUserBanks(body).subscribe(
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
        this.ShowUserBanks();
        this.hideModalCreateBanks();
        this.ngBanks = {
          bankName: '',
          firstName: '',
          lastName: '',
          typeBk: '',
          accountNumber: '',
          branch: ''
        };
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

  openModelSureDeletedBanks(id: number) {
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
            this.ShowUserBanks();
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
        this.ShowUserBanks();
        this.hideModalUpdateBanks();
      }
    );
  }

  ShowUserReport(id: any) {
    const body: ReqUserReport = {
      id: Number(id),
      orderStatus: 1
    };
    this.callApi.getUserReport(body).subscribe(
      (res) => {
        this.DataUserReport = res;
        console.log(this.DataUserReport);
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

  ShowUpdateStock(id: number) {
    const DataUpdateStock = this.DataResStock.data.find((a) => a.id === id);
    if (!DataUpdateStock) {
      console.log('1');
      return;
    }
    this.ngUpdateStock = {
      id: DataUpdateStock.id.toString(),
      productName: DataUpdateStock.productName,
      volume: DataUpdateStock.volume,
      price: DataUpdateStock.price,
      details: DataUpdateStock.details,
      shopId: DataUpdateStock.shopId.toString()
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
        this.ShowUserStock(this.ngUpdateStock.shopId);
        this.uploadStock(body.id);
        this.hideModalUpdate();
      }
    );
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
        this.uploadStock(this.resCreateStock.id);
        this.hideModal();
      },
      (err) => {
        Swal.fire({
          icon: 'warning',
          title: 'ERROR',
          showConfirmButton: false,
          timer: 2000
        });
        console.log(err);
      }
    );
  }

  hideModal() {
    $('#contentCreatStock').modal('hide');
    this.EmptyCreateStock();
  }

  onFileSelectedStock(event) {
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
        this.callApi.DeleteShop(id).subscribe(
          (res) => {
            this.ShowUserShop();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  openModelUpdateReport(id: any, orderStatus: string) {
    this.updateReport = {
      id: id.toString(),
      orderStatus: orderStatus.toString(),
      parcelNumber: ''
    };
    $('#contentupdateReport').modal('show');
    console.log('1');
  }

  UpdateReport2() {
    const DataUpdateReport = this.DataUserReport.data.find((a) => a.id === Number(this.updateReport.id));
    if (!DataUpdateReport) {
      console.log('1');
      return;
    }
    const body: ReqUpdateReport2 = {
      id: Number(this.updateReport.id),
      orderStatus: this.updateReport.orderStatus,
      parcelNumber: this.updateReport.parcelNumber
    };
    if (!body.parcelNumber) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.getUpdateReport2(body).subscribe(
      (res) => {
        this.hideModalUpdateReport();
      }
    );
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
        this.ShowUserShop();
        this.uploadImg();
        this.hideModalUpdateShop();
      }
    );
  }

  ShowUpdateShop(id: number) {
    const DataUpdateShop = this.DataUserShop.data.find((a) => a.id === id);
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

  ShowUserShop() {
    const body: ReqGetUserShop = {
      id: this.DataIsLogin.id,
    };
    this.callApi.getUserShop(body).subscribe(
      (res) => {
        this.DataUserShop = res;
      }
    );
  }

  openModelSureDeletedStock(id: number, shopId: number) {
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
            this.ShowUserStock(shopId);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  openModelSureDeletedAddress(id: number) {
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
        this.callApi.deleteAddress(id).subscribe(
          (res) => {
            this.ShowAddress();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }


  ShowUserStock(id: any) {
    const body: ReqUserStock = {
      id: Number(id),
    };
    this.callApi.getUserStock(body).subscribe(
      (res) => {
        this.DataResStock = res;
      }
    );
  }

  ShowUpdateAddress(id: number) {
    const DataUpdateAddress = this.DataAddress.data.find((a) => a.id === id);
    if (!DataUpdateAddress) {
      console.log('1');
      return;
    }
    this.ngUpdateAddress = {
      id: DataUpdateAddress.id.toString(),
      addressName: DataUpdateAddress.addressName
    };
    console.log('show update', this.ngUpdateAddress);
    $('#contentUpdateAddress').modal('show');
  }

  createDataShop() {
    const body: ReqCreateShop = {
      shopName: this.CreateShop.shopName,
      customerId: this.DataIsLogin.id
    };
    // tslint:disable-next-line:max-line-length
    if (!this.CreateShop.shopName || !body.customerId) {
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
          title: 'สร้างร้านค้าเรียบร้อยแล้ว'
        });
        this.resCreateShop = res;
        this.ShowUserShop();
        this.hideModalCreateShop();
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


  updateAddress() {
    const body: ReqUpdateAddress = {
      id: Number(this.ngUpdateAddress.id),
      addressName: this.ngUpdateAddress.addressName,
    };
    if (!this.ngUpdateAddress.addressName || !this.ngUpdateAddress.id) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.updateAddress(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว'
        });
        this.ShowAddress();
        this.hideModalUpdateAddress();
      }
    );
  }

  CreateAddress() {
    const body: ReqCreateAddress = {
      addressName: this.ngCreateAddress.name,
      customerId: this.ngCreateAddress.customerId,
    };

    if (!this.ngCreateAddress.name || !this.ngCreateAddress.customerId) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.createAddress(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'เพิ่มที่อยู่เรียบร้อยแล้ว'
        });
        this.resCreateAddress = res;
        this.ShowAddress();
        this.hideModalUpdate();
      },
      (err) => {
        Swal.fire({
          icon: 'warning',
          title: 'ไม่สามารถเพิ่มข้อมูลได้',
          showConfirmButton: false,
          timer: 2000
        });
        console.log(err);
      }
    );
  }

  openModelCreatAddress() {
    this.ngCreateAddress = {
      name: '',
      customerId: this.DataIsLogin.id
    };
    $('#contentCreateAddress').modal('show');
    console.log('1');
  }

  updateUserProfile() {
    const body: ReqUpdateCustomer = {
      id: Number(this.DataIsLogin.id),
      userName: this.DataIsLogin.userName,
      passWord: this.DataIsLogin.passWord,
      firstName: this.DataIsLogin.firstName,
      lastName: this.DataIsLogin.lastName,
      gmail: this.DataIsLogin.gmail,
      phoneNumber: this.DataIsLogin.phoneNumber
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
        console.log('this. res update customer' + res.firstName);
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว'
        });
        this.hideModalUpdateProfile();
        // this.IsLogin.clearLogin();
        // this.router.navigateByUrl('login');
      }
    );
  }

  openModelCreatProfile() {
    this.ngUpdateProfile = {
      id: this.DataIsLogin.id.toString(),
      userName: this.DataIsLogin.userName,
      passWord: this.DataIsLogin.passWord,
      firstName: this.DataIsLogin.firstName,
      lastName: this.DataIsLogin.lastName,
      gmail: this.DataIsLogin.gmail,
      phoneNumber: this.DataIsLogin.phoneNumber
    };
    $('#contentUpdateProfile').modal('show');
    console.log('1');
  }

  openModelCreateShop() {
    $('#contentCreatShop').modal('show');
  }

  openModelCreateStock(id: any) {
    this.ngStock.shopId = id;
    $('#contentCreatStock').modal('show');
  }

  hideModalCreateShop() {
    $('#contentCreatShop').modal('hide');
    this.EmptyDataCreateShop();
  }

  hideModalUpdate() {
    $('#contentCreateAddress').modal('hide');
    this.EmptyData();
  }

  hideModalUpdateShop() {
    $('#contentUpdateShop').modal('hide');
    this.EmptyData();
  }

  hideModalUpdateProfile() {
    $('#contentUpdateProfile').modal('hide');
  }

  hideModalUpdateAddress() {
    $('#contentUpdateAddress').modal('hide');
    this.EmptyDataAddress();
  }

  hideModalUpdateStock() {
    $('#contentUpdateStock').modal('hide');
    this.EmptyUpdateStock();
  }

  hideModalCreate() {
    $('#contentCreatStock').modal('hide');
    this.EmptyData();
  }

  hideModalUpdateReport() {
    $('#contentupdateReport').modal('hide');
    this.EmptyData();
  }

  openModelCreatBanks() {
    $('#contentCreatBanks').modal('show');
    console.log('1');
  }

  hideModalCreateBanks() {
    $('#contentCreatBanks').modal('hide');
  }

  hideModalUpdateBanks() {
    $('#contentUpdateBanks').modal('hide');
  }

  EmptyUpdateStock() {
    this.ngUpdateStock = {
      id: '',
      productName: '',
      volume: '',
      price: '',
      details: '',
      shopId: ''
    };
  }

  EmptyCreateStock() {
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

  EmptyDataAddress() {
    this.ngUpdateAddress = {
      id: '',
      addressName: '',
    };
  }

  EmptyDataCreateShop() {
    this.CreateShop = {
      shopName: '',
      customerId: ''
    };
  }

  EmptyDataUpdateShop() {
    this.ngUpdateShop = {
      id: '',
      shopName: '',
    };
  }

  EmptyData() {
    this.ngCreateAddress = {
      name: '',
      customerId: null,
    };
  }

}
