import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';
import { ReqCreateTypeStoke, ReqGetTypeStoke, ReqUpdateTypeStoke, ResCreateTypeStoke, ResGetTypeStoke } from 'src/app/services/interface/typestoke.interface';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-typestok',
  templateUrl: './typestok.component.html',
  styleUrls: ['./typestok.component.scss']
})
export class TypestokComponent implements OnInit {

  DataTypeStoke: ResGetTypeStoke = null;

  resCreateTypeStoke: ResCreateTypeStoke = null;

  ngCreateTypeStoke = {
    typeName: '',
  };

  ngUpdateTypeStoke = {
    id: '',
    typeName: '',
  };

  ngData = {
    perPages: 10,
    page: 1,
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
    this.ShowTypeStoke();
  }

  openModelCreateTypeStoke() {
    $('#contentCreatTypeStoke').modal('show');
    console.log('1');
  }

  hideModal() {
    $('#contentCreatTypeStoke').modal('hide');
    this.EmptyData();
  }

  hideModalUpdate() {
    $('#contentUpdateTypeStoke').modal('hide');
    this.EmptyDataUpdate();
  }

  EmptyData() {
    this.ngCreateTypeStoke = {
      typeName: '',
    };
  }

  EmptyDataUpdate() {
    this.ngUpdateTypeStoke = {
      id: '',
      typeName: '',
    };
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


  createTypeStoke() {
    const body: ReqCreateTypeStoke = {
      typeName: this.ngCreateTypeStoke.typeName,
    };

    // tslint:disable-next-line:max-line-length
    if (!this.ngCreateTypeStoke.typeName ) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.createTypeStoke(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'ลงชื่อเข้าใช้เรียบร้อยแล้ว'
        });
        this.resCreateTypeStoke = res;
        this.ShowTypeStoke();
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


  ShowUpdateTypeStoke(id: number) {
    const DataUpdateCustomer = this.DataTypeStoke.data.find((a) => a.id === id);
    if (!DataUpdateCustomer) {
      console.log('1');
      return;
    }
    this.ngUpdateTypeStoke = {
      id: DataUpdateCustomer.id.toString(),
      typeName: DataUpdateCustomer.typeName,
    };
    console.log('show update', this.ngUpdateTypeStoke);
    $('#contentUpdateTypeStoke').modal('show');
  }

  updateTypeStoke() {
    const body: ReqUpdateTypeStoke = {
      id: Number(this.ngUpdateTypeStoke.id),
      typeName: this.ngUpdateTypeStoke.typeName,
    };
    if (!body.typeName) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.updateTypeStoke(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว'
        });
        this.ShowTypeStoke();
        this.hideModalUpdate();
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
        this.callApi.DeleteTypeStoke(id).subscribe(
          (res) => {
            this.ShowTypeStoke();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

}
