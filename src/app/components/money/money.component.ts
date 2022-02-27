import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';
import { ReqGetMoney, ReqUpdateMoney, ResCreateMoney, ResGetMoney } from 'src/app/services/interface/money.interface';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent implements OnInit {

  DataMoney: ResGetMoney = null;

  ngData = {
    perPages: 100,
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
    this.ShowMoney();
  }

  ShowMoney() {
    const body: ReqGetMoney = {
      perPage: this.ngData.perPages,
      page: this.ngData.page
    };
    this.callApi.getMoney(body).subscribe(
      (res) => {
        this.DataMoney = res;
        console.log(this.DataMoney.data);
      }
    );
  }

  updateMoney(id: any) {
    const body: ReqUpdateMoney = {
      id: Number(id),
      StatusMoney: 1
    };
    this.callApi.updateMoney(body).subscribe(
      (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จเรียบร้อยแล้ว'
        });
        this.ShowMoney();
      }
    );
  }
}
